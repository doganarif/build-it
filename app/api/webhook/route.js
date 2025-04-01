import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { lemonSqueezy } from '@/lib/lemonsqueezy';
import { db } from '@/lib/db';
import { manageSubscriptionStatusChange } from '@/lib/stripe';
import { manageLemonSqueezySubscriptionStatusChange } from '@/lib/lemonsqueezy';
import { getPaymentProvider, isStripeProvider, isLemonSqueezyProvider } from '@/lib/payment-provider';
import crypto from 'crypto';

// This is your Stripe webhook secret for testing your endpoint locally.
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const lemonSqueezyWebhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

// Note: This needs to remain an API route since it receives external webhook events
// and cannot be converted to a server action for direct client use
export async function POST(req) {
  const buf = await req.text();
  const signatureHeader = req.headers.get('stripe-signature') || req.headers.get('x-signature');
  const provider = req.headers.get('x-provider') || getPaymentProvider();

  // Handle Stripe webhooks
  if (provider === 'stripe' || (!provider && req.headers.get('stripe-signature'))) {
    return handleStripeWebhook(buf, req.headers.get('stripe-signature'));
  }
  
  // Handle LemonSqueezy webhooks
  if (provider === 'lemonsqueezy' || (!provider && req.headers.get('x-signature'))) {
    return handleLemonSqueezyWebhook(buf, req.headers.get('x-signature'));
  }

  return NextResponse.json({ error: 'Unsupported payment provider' }, { status: 400 });
}

async function handleStripeWebhook(buf, signature) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, signature, stripeWebhookSecret);
  } catch (err) {
    console.log(`❌ Stripe Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    // Handle checkout session completed
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const customerId = session.customer;

      // Store the customerId in the user record
      if (userId && customerId) {
        await db.user.update({
          where: { id: userId },
          data: { customerId },
        });
      }
      
      // Handle subscription creation
      if (session.mode === 'subscription') {
        const subscriptionId = session.subscription;
        await manageSubscriptionStatusChange(subscriptionId, userId, true);
      }
      
      break;
    }
    
    // Handle subscription updated
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      await manageSubscriptionStatusChange(subscription.id, subscription.customer);
      break;
    }
      
    default:
      console.log(`Unhandled Stripe event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleLemonSqueezyWebhook(buf, signature) {
  try {
    // Verify webhook signature
    if (!signature || !lemonSqueezyWebhookSecret) {
      throw new Error('Missing signature or webhook secret');
    }
    
    // Parse payload
    const payload = JSON.parse(buf);
    
    // Verify the signature (LemonSqueezy uses HMAC SHA256)
    const hmac = crypto.createHmac('sha256', lemonSqueezyWebhookSecret);
    const digest = hmac.update(buf).digest('hex');
    
    if (signature !== digest) {
      throw new Error('Invalid signature');
    }
    
    // Extract event data
    const eventName = payload.meta?.event_name;
    
    if (!eventName) {
      throw new Error('Invalid webhook payload');
    }
    
    // Handle the event
    switch (eventName) {
      // Handle order created/completed
      case 'order_created': {
        const orderData = payload.data;
        const userId = orderData.meta?.custom_data?.userId;
        const customerId = orderData.attributes?.customer_id;

        // Store the customerId in the user record
        if (userId && customerId) {
          await db.user.update({
            where: { id: userId },
            data: { lemonSqueezyCustomerId: customerId },
          });
        }
        
        break;
      }
      
      // Handle subscription created
      case 'subscription_created': {
        const subscription = payload.data;
        const customerId = subscription.attributes?.customer_id;
        const userId = subscription.meta?.custom_data?.userId;
        
        await manageLemonSqueezySubscriptionStatusChange(
          subscription.id, 
          userId || customerId, 
          true
        );
        break;
      }
      
      // Handle subscription updated or cancelled
      case 'subscription_updated':
      case 'subscription_cancelled': {
        const subscription = payload.data;
        await manageLemonSqueezySubscriptionStatusChange(
          subscription.id, 
          subscription.attributes?.customer_id
        );
        break;
      }
        
      default:
        console.log(`Unhandled LemonSqueezy event type ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log(`❌ LemonSqueezy Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}

// Required for handling webhooks
export const dynamic = 'force-dynamic'; 