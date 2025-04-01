import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/dashboard');
  }
  
  // Get user's subscription status
  const subscription = session.user.id
    ? await db.subscription.findFirst({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    : null;
    
  const isSubscribed = subscription && 
    subscription.stripeCurrentPeriodEnd.getTime() > Date.now();

  // Prepare the data to pass to client component
  const userData = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image
  };

  const subscriptionData = subscription ? {
    stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd.toISOString(),
    isSubscribed
  } : {
    isSubscribed: false
  };

  return (
    <DashboardClient 
      user={userData}
      subscription={subscriptionData}
    />
  );
} 