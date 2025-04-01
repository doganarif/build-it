import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest API version
  typescript: false,
});

/**
 * Creates a Stripe checkout session for subscription or one-time payments
 */
export async function createCheckoutSession(userId, priceId, successUrl, cancelUrl, mode = 'subscription') {
  const checkout = await stripe.checkout.sessions.create({
    customer_email: userId?.email,
    customer: userId?.customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode, // 'subscription' or 'payment'
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: userId?.id,
    },
  });

  return checkout;
}

/**
 * Creates a Stripe customer portal session for managing subscriptions
 */
export async function createCustomerPortalSession(customerId, returnUrl) {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession;
}

/**
 * Manages subscription status changes (create, update, cancel)
 */
export async function manageSubscriptionStatusChange(subscriptionId, customerId, createAction = false) {
  const { db } = await import('@/lib/db');
  
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method', 'items.data.price.product'],
  });

  const subscriptionData = {
    stripeSubscriptionId: subscription.id,
    userId: customerId,
    stripeCustomerId: subscription.customer,
    stripePriceId: subscription.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };

  if (createAction) {
    // Create a new subscription
    await db.subscription.create({
      data: subscriptionData,
    });
  } else {
    // Update existing subscription
    await db.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: subscriptionData,
    });
  }

  return subscription;
}

/**
 * Creates or retrieves a Stripe customer
 */
export async function createOrRetrieveCustomer(userId, email) {
  const { db } = await import('@/lib/db');
  
  // Check if user already has a customer ID
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { customerId: true },
  });
  
  if (user?.customerId) {
    // Retrieve existing customer
    const customer = await stripe.customers.retrieve(user.customerId);
    return customer;
  }
  
  // Create new customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
  
  // Update user with customer ID
  await db.user.update({
    where: { id: userId },
    data: { customerId: customer.id },
  });
  
  return customer;
}

/**
 * Creates a one-time payment intent
 */
export async function createPaymentIntent(amount, currency = 'usd', customerId, metadata = {}) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: customerId,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  return paymentIntent;
}

/**
 * Creates or updates a product in Stripe
 */
export async function upsertProduct(productData) {
  const { name, description, images, metadata } = productData;
  
  try {
    // Check if product exists by name
    const products = await stripe.products.list({
      limit: 1,
      active: true,
    });
    
    const existingProduct = products.data.find(p => p.name === name);
    
    if (existingProduct) {
      // Update existing product
      const product = await stripe.products.update(existingProduct.id, {
        name,
        description,
        images,
        metadata,
      });
      return product;
    } else {
      // Create new product
      const product = await stripe.products.create({
        name,
        description,
        images,
        metadata,
      });
      return product;
    }
  } catch (error) {
    console.error('Error upserting product:', error);
    throw error;
  }
}

/**
 * Creates a price for a product
 */
export async function createPrice(productId, unitAmount, currency = 'usd', recurring = null) {
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: unitAmount,
    currency,
    recurring, // null for one-time, or { interval: 'month'|'year', interval_count: 1 }
  });
  
  return price;
}

/**
 * Retrieves subscription data for a customer
 */
export async function getCustomerSubscriptions(customerId) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method', 'data.items.data.price.product'],
  });
  
  return subscriptions.data;
}

/**
 * Cancels a subscription
 */
export async function cancelSubscription(subscriptionId) {
  return await stripe.subscriptions.cancel(subscriptionId);
} 