'use server';

import { getServerSession } from '@/lib/auth';
import { createProviderCheckout } from '@/lib/payment-provider';

export async function createCheckoutSession(formData) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return { error: 'Unauthorized', status: 401 };
    }

    // Parse form data or use structured data if directly called
    const data = formData instanceof FormData 
      ? {
          priceId: formData.get('priceId'),
          successUrl: formData.get('successUrl'),
          cancelUrl: formData.get('cancelUrl'),
          mode: formData.get('mode') || 'subscription'
        }
      : formData;

    const { priceId, successUrl, cancelUrl, mode = 'subscription' } = data;

    if (!priceId || !successUrl || !cancelUrl) {
      return { error: 'Missing required fields', status: 400 };
    }

    const checkout = await createProviderCheckout(
      session.user,
      priceId,
      successUrl,
      cancelUrl,
      mode
    );

    return { url: checkout.url };
  } catch (error) {
    console.error('Checkout error:', error);
    return { error: 'Internal server error', status: 500 };
  }
} 