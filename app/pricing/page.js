'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/app/actions';

export default function PricingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (priceId) => {
    try {
      setIsLoading(true);
      
      // Use server action instead of API call
      const result = await createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout session');
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      name: 'Hobby',
      description: 'Perfect for side projects and hobbyists',
      price: '$9.99',
      priceId: 'price_1234567890', // Replace with your actual Stripe price ID
      features: [
        '5 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      description: 'For professionals and small teams',
      price: '$29.99',
      priceId: 'price_0987654321', // Replace with your actual Stripe price ID
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: '$99.99',
      priceId: 'price_5555555555', // Replace with your actual Stripe price ID
      features: [
        'Unlimited everything',
        '1TB storage',
        'Custom analytics',
        'Dedicated support',
        'Advanced security',
        'Custom integrations',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`flex flex-col ${
              plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleCheckout(plan.priceId)}
                disabled={isLoading}
                variant={plan.popular ? 'primary' : 'secondary'}
              >
                {isLoading ? 'Processing...' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 