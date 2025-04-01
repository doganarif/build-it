/**
 * This file provides utility functions to work with different payment providers
 */

// Get the currently configured payment provider
export function getPaymentProvider() {
  return process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'stripe';
}

// Determine if we're using Stripe
export function isStripeProvider() {
  return getPaymentProvider() === 'stripe';
}

// Determine if we're using LemonSqueezy
export function isLemonSqueezyProvider() {
  return getPaymentProvider() === 'lemonsqueezy';
}

// Import the appropriate functions based on the provider
export async function getPaymentFunctions() {
  if (isStripeProvider()) {
    return await import('@/lib/stripe');
  } else if (isLemonSqueezyProvider()) {
    return await import('@/lib/lemonsqueezy');
  }
  throw new Error(`Unsupported payment provider: ${getPaymentProvider()}`);
}

/**
 * Creates a checkout session with the selected payment provider
 */
export async function createProviderCheckout(userData, productId, successUrl, cancelUrl, mode = 'subscription') {
  const provider = getPaymentProvider();
  
  if (provider === 'stripe') {
    const { createCheckoutSession } = await import('@/lib/stripe');
    return createCheckoutSession(userData, productId, successUrl, cancelUrl, mode);
  } else if (provider === 'lemonsqueezy') {
    const { createLemonSqueezyCheckout } = await import('@/lib/lemonsqueezy');
    return createLemonSqueezyCheckout(userData, productId, successUrl, cancelUrl);
  }
  
  throw new Error(`Unsupported payment provider: ${provider}`);
}

/**
 * Creates a customer portal session with the selected payment provider
 */
export async function createProviderCustomerPortal(customerId, returnUrl) {
  const provider = getPaymentProvider();
  
  if (provider === 'stripe') {
    const { createCustomerPortalSession } = await import('@/lib/stripe');
    return createCustomerPortalSession(customerId, returnUrl);
  } else if (provider === 'lemonsqueezy') {
    const { createLemonSqueezyCustomerPortalSession } = await import('@/lib/lemonsqueezy');
    return createLemonSqueezyCustomerPortalSession(customerId, returnUrl);
  }
  
  throw new Error(`Unsupported payment provider: ${provider}`);
}

/**
 * Manages subscription status changes with the selected payment provider
 */
export async function manageProviderSubscriptionChange(subscriptionId, customerId, createAction = false) {
  const provider = getPaymentProvider();
  
  if (provider === 'stripe') {
    const { manageSubscriptionStatusChange } = await import('@/lib/stripe');
    return manageSubscriptionStatusChange(subscriptionId, customerId, createAction);
  } else if (provider === 'lemonsqueezy') {
    const { manageLemonSqueezySubscriptionStatusChange } = await import('@/lib/lemonsqueezy');
    return manageLemonSqueezySubscriptionStatusChange(subscriptionId, customerId, createAction);
  }
  
  throw new Error(`Unsupported payment provider: ${provider}`);
}

/**
 * Creates or retrieves a customer with the selected payment provider
 */
export async function createOrRetrieveProviderCustomer(userId, email) {
  const provider = getPaymentProvider();
  
  if (provider === 'stripe') {
    const { createOrRetrieveCustomer } = await import('@/lib/stripe');
    return createOrRetrieveCustomer(userId, email);
  } else if (provider === 'lemonsqueezy') {
    const { createOrRetrieveLemonSqueezyCustomer } = await import('@/lib/lemonsqueezy');
    return createOrRetrieveLemonSqueezyCustomer(userId, email);
  }
  
  throw new Error(`Unsupported payment provider: ${provider}`);
} 