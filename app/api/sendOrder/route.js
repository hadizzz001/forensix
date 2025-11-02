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
        } = body;

        const client = await clientPromise; // Connect to MongoDB
        const db = client.db('test'); // Replace with your database name
        const collection = db.collection('Order'); // Replace with your collection name

        console.log("Data: ", body);

        // Get current date as string like "1/jul/2020"
        const now = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateString = `${now.getDate()}/${monthNames[now.getMonth()]}/${now.getFullYear()}`;

        // Insert the new order into the collection
        const result = await collection.insertOne({
            name: name,
            email: email,
            phone: phone,
            location: location,
            subject: subject,
            message: message,
            cat: cat,
            date: dateString, // <-- added date here
        });

        return NextResponse.json({ success: true, insertedId: result.insertedId }); // Return success response
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
    }
}
