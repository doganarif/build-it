'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { createBillingPortalSession } from '@/app/actions';
import { useStore } from '@/lib/store/index.js';

// Client component for interactive buttons
function ClientButton({ href, className, variant, children }) {
  return (
    <Button
      className={className}
      variant={variant}
      onClick={() => window.location.href = href}
    >
      {children}
    </Button>
  );
}

export default function DashboardClient({ user, subscription }) {
  const isSubscribed = subscription?.isSubscribed || false;
  const [isLoading, setIsLoading] = useState(false);
  
  // Using Zustand store
  const { 
    setSubscription, 
    addNotification, 
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompletedTodos
  } = useStore();
  
  // Initialize subscription data in store when component mounts
  useEffect(() => {
    setSubscription(subscription);
  }, [subscription, setSubscription]);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const result = await createBillingPortalSession({
        returnUrl: '/dashboard'
      });
      
      if (result.error) {
        // Use notification from Zustand store
        addNotification({
          type: 'error',
          title: 'Error',
          message: result.error
        });
        throw new Error(result.error);
      }
      
      window.location.href = result.url;
    } catch (error) {
      console.error('Error creating billing portal session:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name || user.email}!</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {isSubscribed ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-gray-600">Free Plan</span>
              )}
            </div>
            {isSubscribed ? (
              <p className="text-sm text-gray-600">
                Your subscription is active until{' '}
                {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Upgrade to a paid plan to access premium features
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Storage</span>
                  <span>25% used</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>API Calls</span>
                  <span>10% used</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isSubscribed ? (
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Manage Subscription'}
                </Button>
              ) : (
                <ClientButton href="/pricing" className="w-full">
                  Upgrade Plan
                </ClientButton>
              )}
              <Link href="/docs">
                <Button variant="secondary" className="w-full">
                  View Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Todo section using Zustand */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>Manage your tasks using Zustand state</CardDescription>
        </CardHeader>
        <CardContent>
          <TodoSection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This would typically be populated from actual user activity */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Logged in from new device</h4>
                  <p className="text-sm text-gray-600">macOS, Chrome browser</p>
                </div>
                <span className="text-sm text-gray-500">Just now</span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Password updated</h4>
                  <p className="text-sm text-gray-600">Security settings modified</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Account created</h4>
                  <p className="text-sm text-gray-600">Welcome to BuildIt!</p>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// New Todo Section component using Zustand
function TodoSection() {
  const [newTodo, setNewTodo] = useState('');
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo,
    clearCompletedTodos
  } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
      
      // Show notification using Zustand
      useStore.getState().addNotification({
        type: 'success',
        title: 'Todo Added',
        message: 'New task has been added successfully'
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-2 border rounded"
        />
        <Button type="submit">Add Task</Button>
      </form>
      
      {todos.length > 0 ? (
        <>
          <ul className="divide-y">
            {todos.map((todo) => (
              <li key={todo.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="rounded"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {todos.filter(todo => !todo.completed).length} items left
            </div>
            {todos.some(todo => todo.completed) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCompletedTodos}
              >
                Clear completed
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No tasks yet. Add your first task above.
        </div>
      )}
    </div>
  );
} 