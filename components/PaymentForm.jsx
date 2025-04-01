'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createPayment } from '@/app/actions';

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Main payment form component
export default function PaymentForm({ amount, onSuccess }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        
        // Use server action instead of API call
        const result = await createPayment({
          amount: amount, // amount in cents (e.g., $10.00 = 1000)
          currency: 'usd',
        });

        if (result.error) {
          throw new Error(result.error);
        }

        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast.error('Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    };

    if (amount) {
      createPaymentIntent();
    }
  }, [amount]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#6366f1',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-xl shadow-sm bg-white">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  );
}

// Checkout form subcomponent
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
        toast.success('Payment successful!');
        if (onSuccess) onSuccess(paymentIntent);
      } else {
        setMessage('Payment requires additional steps');
        toast.info('Payment requires additional steps');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setMessage('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <PaymentElement />
      </div>
      
      {message && (
        <div className={`text-sm ${
          message.includes('successful') ? 'text-green-600' : 'text-red-600'
        } mb-4`}>
          {message}
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
} 