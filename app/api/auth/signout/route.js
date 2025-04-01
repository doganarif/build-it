import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Extract redirect URL from request if provided
    const data = await request.json().catch(() => ({}));
    const redirectUrl = data.redirectUrl || '/';
    
    // Use the API to sign out without automatic redirect
    await signOut({ redirect: false });
    
    // Return success response with redirect info
    return NextResponse.json({ 
      success: true,
      redirectUrl
    });
  } catch (error) {
    console.error('Error signing out:', error);
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    );
  }
} 