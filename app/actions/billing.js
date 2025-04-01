'use server';

import { getServerSession } from '@/lib/auth';
import { createProviderCustomerPortal } from '@/lib/payment-provider';
import { db } from '@/lib/db';

export async function createBillingPortalSession(formData) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return { error: 'Unauthorized', status: 401 };
    }

    // Parse form data or use structured data if directly called
    const data = formData instanceof FormData 
      ? {
          returnUrl: formData.get('returnUrl')
        }
      : formData;

    const { returnUrl } = data;

    if (!returnUrl) {
      return { error: 'Missing returnUrl', status: 400 };
    }

    // Get user with provider customer IDs
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { 
        customerId: true, 
        lemonSqueezyCustomerId: true 
      },
    });

    // Determine which customer ID to use based on available IDs
    const providerCustomerId = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER === 'lemonsqueezy' 
      ? user?.lemonSqueezyCustomerId 
      : user?.customerId;

    if (!providerCustomerId) {
      return { error: 'No associated payment customer found', status: 400 };
    }

    const portalSession = await createProviderCustomerPortal(
      providerCustomerId,
      returnUrl
    );

    return { url: portalSession.url };
  } catch (error) {
    console.error('Billing portal error:', error);
    return { error: 'Internal server error', status: 500 };
  }
} 