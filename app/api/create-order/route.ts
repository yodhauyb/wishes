import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Lazily initialized so the build doesn't fail when Razorpay env vars are absent
let razorpay: Razorpay | null = null;
function getRazorpay(): Razorpay {
  if (!razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys are not configured');
    }
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const amount = body.amount || 4900; // default 4900 paise = ₹49

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Minimum amount must be 100 paise (₹1)' },
        { status: 400 }
      );
    }

    const options = {
      amount: Number(amount),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await getRazorpay().orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}