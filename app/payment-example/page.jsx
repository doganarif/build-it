'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaymentForm from '@/components/PaymentForm';

export default function PaymentExamplePage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [amount, setAmount] = useState(2500); // $25.00

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    setShowPaymentForm(false);
    console.log('Payment succeeded:', paymentIntent);
  };

  const resetForm = () => {
    setPaymentSuccess(false);
    setShowPaymentForm(false);
  };

  const products = [
    { id: 'prod_1', name: 'Basic Package', amount: 2500, description: 'Essential features for small projects' },
    { id: 'prod_2', name: 'Premium Package', amount: 5000, description: 'Advanced features for growing teams' },
    { id: 'prod_3', name: 'Enterprise Package', amount: 10000, description: 'Full suite of tools for large organizations' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">One-Time Payment Example</h1>

      {paymentSuccess ? (
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-green-600"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
              <p className="text-green-700 mb-4">Thank you for your purchase.</p>
              <Button onClick={resetForm} variant="outline">Make Another Payment</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {showPaymentForm ? (
            <div className="mb-8">
              <Button 
                onClick={() => setShowPaymentForm(false)}
                variant="outline"
                className="mb-4"
              >
                ← Back to Products
              </Button>
              <PaymentForm 
                amount={amount} 
                onSuccess={handlePaymentSuccess} 
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">${(product.amount / 100).toFixed(2)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setAmount(product.amount);
                        setShowPaymentForm(true);
                      }}
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Implementation Notes</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>This is a demonstration of Stripe integration for one-time payments</li>
          <li>The Stripe API key in this example is a placeholder and needs to be replaced with a real key</li>
          <li>In a real application, you would handle inventory, stock management, and order fulfillment</li>
          <li>The PaymentElement component from Stripe handles all payment method collection securely</li>
          <li>Webhooks should be implemented to handle post-payment processes reliably</li>
        </ul>
      </div>
    </div>
  );
} 