import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST() {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: 4900,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    });
    
    // BADLAV: 'orderId' ko 'order_id' kar diya hai
    return NextResponse.json({ order_id: order.id }); 
  } catch (error) {
    console.error("Razorpay Order Error:", error); 
    return NextResponse.json({ 
      error: 'Error creating order', 
      details: error 
    }, { status: 500 });
  }
}