import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

// Initialize LemonSqueezy
export const lemonSqueezy = new LemonSqueezy({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
});

/**
 * Creates a LemonSqueezy checkout for subscription or one-time payments
 */
export async function createLemonSqueezyCheckout(userId, variantId, successUrl, cancelUrl) {
  const checkout = await lemonSqueezy.createCheckout({
    storeId: parseInt(process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID),
    variantId: parseInt(variantId),
    checkoutData: {
      custom: {
        userId: userId?.id,
      },
      successUrl,
      cancelUrl,
    },
  });

  return {
    url: checkout.data.attributes.url,
    id: checkout.data.id,
  };
}

/**
 * Creates a LemonSqueezy customer portal session for managing subscriptions
 */
export async function createLemonSqueezyCustomerPortalSession(customerId, returnUrl) {
  const customerPortal = await lemonSqueezy.createCustomerPortalSession({
    customerId: customerId,
    returnUrl,
  });

  return {
    url: customerPortal.data.attributes.url,
  };
}

/**
 * Manages subscription status changes (create, update, cancel)
 */
export async function manageLemonSqueezySubscriptionStatusChange(subscriptionId, customerId, createAction = false) {
  const { db } = await import('@/lib/db');
  
  const subscription = await lemonSqueezy.getSubscription(subscriptionId);

  const subscriptionData = {
    lemonSqueezySubscriptionId: subscription.data.id,
    userId: customerId,
    lemonSqueezyCustomerId: subscription.data.attributes.customer_id,
    lemonSqueezyVariantId: subscription.data.attributes.variant_id,
    lemonSqueezyCurrentPeriodEnd: new Date(subscription.data.attributes.renews_at),
  };

  if (createAction) {
    // Create a new subscription
    await db.subscription.update({
      where: { userId: customerId },
      data: subscriptionData,
      create: subscriptionData,
    });
  } else {
    // Update existing subscription
    await db.subscription.update({
      where: { lemonSqueezySubscriptionId: subscription.data.id },
      data: subscriptionData,
    });
  }

  return subscription;
}

/**
 * Creates or retrieves a LemonSqueezy customer
 */
export async function createOrRetrieveLemonSqueezyCustomer(userId, email) {
  const { db } = await import('@/lib/db');
  
  // Check if user already has a customer ID
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { lemonSqueezyCustomerId: true },
  });
  
  if (user?.lemonSqueezyCustomerId) {
    // Retrieve existing customer
    const customer = await lemonSqueezy.getCustomer(user.lemonSqueezyCustomerId);
    return customer.data;
  }
  
  // Create new customer
  const customer = await lemonSqueezy.createCustomer({
    storeId: parseInt(process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID),
    email,
    name: email,
    customData: {
      userId,
    },
  });
  
  // Update user with customer ID
  await db.user.update({
    where: { id: userId },
    data: { lemonSqueezyCustomerId: customer.data.id },
  });
  
  return customer.data;
}

/**
 * Creates a one-time payment
 */
export async function createLemonSqueezyOneTimePayment(userId, email, variantId, successUrl, cancelUrl) {
  // For LemonSqueezy, one-time payments use the checkout flow just like subscriptions
  return createLemonSqueezyCheckout(
    { id: userId, email },
    variantId,
    successUrl,
    cancelUrl
  );
}

/**
 * Retrieves subscription data for a customer
 */
export async function getLemonSqueezyCustomerSubscriptions(customerId) {
  const subscriptions = await lemonSqueezy.listSubscriptions({
    filter: {
      customer_id: customerId,
    },
  });
  
  return subscriptions.data;
}

/**
 * Cancels a subscription
 */
export async function cancelLemonSqueezySubscription(subscriptionId) {
  return await lemonSqueezy.updateSubscription(subscriptionId, {
    cancelled: true,
  });
} 