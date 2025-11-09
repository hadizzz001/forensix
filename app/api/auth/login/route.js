// app/api/auth/login/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test'); // your DB name
    const users = db.collection('Users');

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return basic user info (in production, use JWT or session)
    return NextResponse.json({ success: true, user: { name: user.name, email: user.email, _id: user._id } });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
