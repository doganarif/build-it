import Link from 'next/link';

export const metadata = {
  title: 'Payment Processing - BuildIt Documentation',
  description: 'Documentation for payment processing in BuildIt',
};

export default function PaymentsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Payment Processing</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt includes integrations with popular payment processors, allowing you to accept payments,
          manage subscriptions, and handle billing for your SaaS application.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The payment processing system in BuildIt provides:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Support for multiple payment processors (Stripe, LemonSqueezy)</li>
          <li>Subscription management</li>
          <li>One-time payments</li>
          <li>Webhook handling for payment events</li>
          <li>Customer billing portal</li>
          <li>Payment history and receipts</li>
          <li>Customizable pricing plans</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Supported Payment Processors</h2>
        
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Stripe</h3>
            <p className="mt-2 text-gray-600">
              A full-featured payment processor with support for subscriptions, one-time payments,
              and more. Stripe offers global payment coverage and robust developer tools.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">LemonSqueezy</h3>
            <p className="mt-2 text-gray-600">
              A simplified payment processor designed specifically for SaaS businesses. LemonSqueezy
              offers an easy-to-use interface with built-in tax compliance.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Environment Variables</h3>
          <p>
            Configure your payment processors by adding the necessary environment variables to your <code>.env</code> file:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Select payment provider (stripe or lemonsqueezy)
PAYMENT_PROVIDER=stripe

# Stripe configuration (if using Stripe)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# LemonSqueezy configuration (if using LemonSqueezy)
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...
LEMONSQUEEZY_STORE_ID=...
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=...`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Pricing Plans</h3>
          <p>
            Pricing plans are defined in <code>config/plans.js</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// config/plans.js
export const plans = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'For personal projects and testing',
    price: 0,
    features: [
      'Up to 3 projects',
      'Basic analytics',
      'Community support',
    ],
    limits: {
      projects: 3,
      apiCalls: 1000,
    },
    stripePriceId: '',
    lemonSqueezyProductId: '',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and small teams',
    price: 19,
    interval: 'month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'API access',
    ],
    limits: {
      projects: Infinity,
      apiCalls: 10000,
    },
    stripePriceId: 'price_123...',
    lemonSqueezyProductId: '123',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom integrations',
      'SSO authentication',
    ],
    limits: {
      projects: Infinity,
      apiCalls: Infinity,
    },
    stripePriceId: 'price_456...',
    lemonSqueezyProductId: '456',
  },
};`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Payment Components</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Checkout Component</h3>
          <p>
            BuildIt provides a ready-to-use checkout component for each payment processor:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { createCheckoutSession } from '@/actions/payments';

export function CheckoutButton({ planId, userId }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      // Create checkout session
      const { url, error } = await createCheckoutSession({
        planId,
        userId,
        successUrl: \`\${window.location.origin}/account?checkout=success\`,
        cancelUrl: \`\${window.location.origin}/pricing\`,
      });
      
      if (error) {
        throw new Error(error);
      }
      
      // Redirect to checkout page
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create checkout session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full"
    >
      {loading ? 'Processing...' : 'Subscribe'}
    </Button>
  );
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Pricing Page</h3>
          <p>
            BuildIt includes a pre-designed pricing page that displays your plans:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/pricing/page.js
import { plans } from '@/config/plans';
import { PricingCard } from '@/components/pricing-card';
import { getServerSession } from '@/lib/auth';

export default async function PricingPage() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that's right for you and get started building your SaaS today.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {Object.values(plans).map((plan) => (
          <PricingCard 
            key={plan.id} 
            plan={plan} 
            userId={userId} 
          />
        ))}
      </div>
    </div>
  );
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Server-Side Payment APIs</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Create Checkout Session</h3>
          <p>
            The <code>createCheckoutSession</code> function creates a checkout session with your payment processor:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// actions/payments.js
'use server';

import { plans } from '@/config/plans';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function createCheckoutSession({
  planId,
  userId,
  successUrl,
  cancelUrl,
}) {
  try {
    const plan = plans[planId];
    
    if (!plan) {
      return { error: 'Invalid plan selected' };
    }
    
    // Get or create customer
    let customer = await db.customer.findUnique({
      where: { userId },
    });
    
    if (!customer) {
      // Get user details
      const user = await db.user.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        return { error: 'User not found' };
      }
      
      // Create Stripe customer
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId,
        },
      });
      
      // Save customer record
      customer = await db.customer.create({
        data: {
          userId,
          stripeCustomerId: stripeCustomer.id,
        },
      });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planId,
      },
    });
    
    return { url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { error: 'Failed to create checkout session' };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Create Customer Portal</h3>
          <p>
            The <code>createCustomerPortal</code> function creates a billing portal for customers to manage subscriptions:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// actions/payments.js
'use server';

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function createCustomerPortal({
  userId,
  returnUrl,
}) {
  try {
    const customer = await db.customer.findUnique({
      where: { userId },
    });
    
    if (!customer?.stripeCustomerId) {
      return { error: 'No billing information found' };
    }
    
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: returnUrl,
    });
    
    return { url: session.url };
  } catch (error) {
    console.error('Error creating customer portal:', error);
    return { error: 'Failed to create customer portal' };
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Webhook Handling</h2>
        <p>
          Webhooks are essential for receiving payment events from your payment processor. BuildIt sets up webhook
          endpoints to handle events like subscription creations, updates, and cancellations.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Stripe Webhook Handler</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return new NextResponse(\`Webhook Error: \${error.message}\`, { status: 400 });
  }

  // Handle specific events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update subscription in database
        await db.subscription.create({
          data: {
            userId: session.metadata.userId,
            planId: session.metadata.planId,
            stripeSubscriptionId: session.subscription,
            stripeCustomerId: session.customer,
            status: 'active',
            currentPeriodEnd: new Date(session.subscription_data.trial_end * 1000),
          },
        });
        
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        
        // Update subscription period
        await db.subscription.update({
          where: {
            stripeSubscriptionId: invoice.subscription,
          },
          data: {
            status: 'active',
            currentPeriodEnd: new Date(invoice.lines.data[0].period.end * 1000),
          },
        });
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        await db.subscription.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        await db.subscription.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            status: 'canceled',
          },
        });
        
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse(\`Webhook Error: \${error.message}\`, { status: 500 });
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Subscription Management</h2>
        <p>
          BuildIt provides components and utilities for managing subscriptions, including checking
          subscription status and displaying subscription details.
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Checking Subscription Status</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// lib/subscription.js
import { db } from '@/lib/db';
import { plans } from '@/config/plans';
import { isFuture } from 'date-fns';

export async function getUserSubscription(userId) {
  // Return null if no userId
  if (!userId) {
    return null;
  }
  
  // Get the subscription from database
  const subscription = await db.subscription.findFirst({
    where: {
      userId,
      OR: [
        { status: 'active' },
        { status: 'trialing' },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  // If no subscription, assume free tier
  if (!subscription) {
    return {
      ...plans.free,
      isSubscribed: false,
      isPro: false,
      isEnterprise: false,
    };
  }
  
  // Check if subscription is still valid
  const isValid = subscription.status === 'active' &&
    subscription.currentPeriodEnd &&
    isFuture(new Date(subscription.currentPeriodEnd));
  
  // Get plan details from config
  const plan = plans[subscription.planId] || plans.free;
  
  return {
    ...plan,
    isSubscribed: isValid,
    isPro: isValid && subscription.planId === 'pro',
    isEnterprise: isValid && subscription.planId === 'enterprise',
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    stripeCustomerId: subscription.stripeCustomerId,
    currentPeriodEnd: subscription.currentPeriodEnd,
  };
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Subscription Details Component</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// components/subscription-details.js
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { createCustomerPortal } from '@/actions/payments';
import { format } from 'date-fns';

export function SubscriptionDetails({ subscription }) {
  const [loading, setLoading] = useState(false);
  
  if (!subscription) {
    return null;
  }

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      
      const { url, error } = await createCustomerPortal({
        userId: subscription.userId,
        returnUrl: window.location.href,
      });
      
      if (error) {
        throw new Error(error);
      }
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: 'Error',
        description: 'Failed to open billing portal. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Current Plan</h4>
          <p className="text-lg font-semibold">{subscription.name}</p>
        </div>
        
        {subscription.currentPeriodEnd && (
          <div>
            <h4 className="text-sm font-medium">Renewal Date</h4>
            <p>
              {format(new Date(subscription.currentPeriodEnd), 'MMMM d, yyyy')}
            </p>
          </div>
        )}
        
        {subscription.isSubscribed && (
          <div>
            <h4 className="text-sm font-medium">Status</h4>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span>Active</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {subscription.isSubscribed ? (
          <Button
            onClick={handleManageSubscription}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Loading...' : 'Manage Subscription'}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => window.location.href = '/pricing'}
            className="w-full"
          >
            Upgrade Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Routes</h3>
            <p className="mt-2 text-gray-600">
              Learn how to build API routes for your SaaS application.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/api-routes"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                API Routes →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Deployment</h3>
            <p className="mt-2 text-gray-600">
              Learn how to deploy your BuildIt application to production.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/deployment"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Deployment →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 