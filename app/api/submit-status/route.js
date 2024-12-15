// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   // Log the received data
//   const data = await req.json();
//   console.log('Received data:', data);

//   // Respond with a success message
//   return NextResponse.json({ message: 'Service status updated successfully!', data });
// }

// export async function GET(req) {
//   return NextResponse.json({ message: `Method ${req.method} not allowed` }, { status: 405 });
// }

//! ------

// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req) {
//   try {
//     // Parse the incoming request data
//     const data = await req.json();
//     console.log('Received data:', data);

//     const { serviceName, serviceStatus, link } = data;

//     // Validate the incoming data (optional but recommended)
//     if (!serviceName || !serviceStatus) {
//       return NextResponse.json(
//         { error: 'Missing required fields: serviceName or serviceStatus' },
//         { status: 400 }
//       );
//     }

//     // Update the service in the database
//     const newService = await prisma.service.create({
//         data: {
//           name: serviceName, // Insert the service name
//           status: serviceStatus.toUpperCase(), // Ensure status matches enum (case-insensitive)
//           description: link, // Optionally update the description with the link
//           createdAt: new Date(), // Set the created date
//           updatedAt: new Date(), // Set the updated date as well
//         },
//       });

//     // Respond with the updated service details
//     return NextResponse.json({
//       message: 'Service status updated successfully!',
//       data: newService,
//     });
//   } catch (error) {
//     console.error('Error updating service:', error);

//     // Handle potential errors
//     if (error.code === 'P2025') {
//       return NextResponse.json(
//         { error: 'Service not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }
