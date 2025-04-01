'use server';

import { getServerSession } from '@/lib/auth';
import { createPaymentIntent } from '@/lib/stripe';
import { createLemonSqueezyOneTimePayment } from '@/lib/lemonsqueezy';
import { createOrRetrieveProviderCustomer } from '@/lib/payment-provider';
import { getPaymentProvider } from '@/lib/payment-provider';

export async function createPayment(formData) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return { error: 'Unauthorized', status: 401 };
    }

    // Parse form data or use structured data if directly called
    const data = formData instanceof FormData 
      ? {
          amount: parseInt(formData.get('amount'), 10),
          currency: formData.get('currency') || 'usd',
          metadata: JSON.parse(formData.get('metadata') || '{}'),
          variantId: formData.get('variantId'),
          successUrl: formData.get('successUrl'),
          cancelUrl: formData.get('cancelUrl')
        }
      : formData;

    const { 
      amount, 
      currency = 'usd', 
      metadata = {},
      variantId,
      successUrl,
      cancelUrl
    } = data;

    if (!amount) {
      return { error: 'Missing required fields', status: 400 };
    }

    // Check payment provider
    const provider = getPaymentProvider();

    // Get or create customer
    const customer = await createOrRetrieveProviderCustomer(
      session.user.id,
      session.user.email
    );

    if (provider === 'stripe') {
      // Add user information to metadata
      const enhancedMetadata = {
        userId: session.user.id,
        ...metadata
      };

      // Create Stripe payment intent
      const paymentIntent = await createPaymentIntent(
        amount,
        currency,
        customer.id,
        enhancedMetadata
      );

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } else if (provider === 'lemonsqueezy') {
      // LemonSqueezy requires a variantId for one-time payments
      if (!variantId || !successUrl || !cancelUrl) {
        return { error: 'Missing required fields for LemonSqueezy payment', status: 400 };
      }

      // Create LemonSqueezy checkout for one-time payment
      const checkout = await createLemonSqueezyOneTimePayment(
        session.user.id,
        session.user.email,
        variantId,
        successUrl,
        cancelUrl
      );

      return {
        redirectUrl: checkout.url,
        checkoutId: checkout.id
      };
    }

    return { error: 'Unsupported payment provider', status: 400 };
  } catch (error) {
    console.error('Payment error:', error);
    return { error: 'Internal server error', status: 500 };
  }
} 