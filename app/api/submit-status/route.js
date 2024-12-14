import { NextResponse } from 'next/server';

export async function POST(req) {
  // Log the received data
  const data = await req.json();
  console.log('Received data:', data);

  // Respond with a success message
  return NextResponse.json({ message: 'Service status updated successfully!', data });
}

export async function GET(req) {
  return NextResponse.json({ message: `Method ${req.method} not allowed` }, { status: 405 });
}