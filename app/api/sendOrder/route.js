import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            location,
            subject,
            message,
            cat,
            date,   // <-- selected date from form
            time,   // <-- selected time from form
            meet
        } = body;

        const client = await clientPromise; // Connect to MongoDB
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Order'); // Replace with your collection name

        console.log("Data: ", body);

        // Get current date as string like "1/Jul/2020"
        const now = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateString = `${now.getDate()}/${monthNames[now.getMonth()]}/${now.getFullYear()}`;

        // Insert the new order into the collection
        const result = await collection.insertOne({
            name,
            email,
            phone,
            location,
            subject,
            message,
            cat,
            bookedAt: dateString, // current submission date
            date: date,   // selected appointment date
            time: time,   // selected appointment time
            meet
        });

        return NextResponse.json({ success: true, insertedId: result.insertedId }); // Return success response
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
