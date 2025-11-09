import clientPromise from '../../lib/mongodb'; 
import { NextResponse } from 'next/server';

export const revalidate = 10;

 
export async function POST(request) {
  try {
    const body = await request.json();
const data = body; 
    

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Work');

    const result = await collection.insertOne({ data });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }
}
 




export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Work');

    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}