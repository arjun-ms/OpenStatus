
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req) {
//   try {
//     // Parse the incoming request data
//     const data = await req.json();
//     console.log("Received data:", data);

//     const { serviceName, serviceStatus, method, link } = data;

//     // Validate the incoming data (optional but recommended)
//     if (!serviceName || !serviceStatus) {
//       return NextResponse.json(
//         { error: "Missing required fields: serviceName or serviceStatus" },
//         { status: 400 }
//       );
//     }

//     // Update the service in the database
//     const newService = await prisma.service.create({
//       data: {
//         name: serviceName, // Insert the service name
//         status: serviceStatus.toUpperCase(), // Ensure status matches enum (case-insensitive)
//         description: link, // Optionally update the description with the link
//         createdAt: new Date(), // Set the created date
//         updatedAt: new Date(), // Set the updated date as well
//       },
//     });

//     // Respond with the updated service details
//     return NextResponse.json({
//       message: "Service status updated successfully!",
//       data: newService,
//     });
//   } catch (error) {
//     console.error("Error updating service:", error);

//     // Handle potential errors
//     if (error.code === "P2025") {
//       return NextResponse.json({ error: "Service not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }


// ! claude

// app/api/status/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    const { serviceName, serviceStatus, method, link } = data;

    // Validate required fields
    if (!serviceName || !serviceStatus) {
      return NextResponse.json(
        { error: "Missing required fields: serviceName or serviceStatus" },
        { status: 400 }
      );
    }

    // Convert status string to match enum format
    // This handles both formats: "Degraded_Performance" and "Degraded Performance"
    const formattedStatus = serviceStatus
      .toUpperCase()
      .replace(/\s/g, "_");

    // Create the service in the database
    const newService = await prisma.service.create({
      data: {
        name: serviceName,
        status: formattedStatus,
        description: link, // Store the link in the description field
        // Note: method is not stored as it's not in your schema
      },
    });

    return NextResponse.json({
      message: "Service status created successfully!",
      data: newService,
    });
  } catch (error) {
    console.error("Error creating service:", error);

    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A service with this name already exists" },
        { status: 409 }
      );
    }

    if (error.code === "P2011" || error.name === "PrismaClientValidationError") {
      return NextResponse.json(
        { error: "Invalid status value provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET endpoint to fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}