// Server Side functions/actions are stored in this file

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function actionSigninSignup() {
  // get the auth status of logged in user
  const { isAuthenticated } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await prismadb.user.findUnique({
    where: {
      kindeId: user?.id,
    },
  });

  // if there is no user, then create a new user
  if (!dbUser && user != null && user?.email != null) {
    await prismadb.user.create({
      data: {
        kindeId: user.id,
        name: user.given_name,
        email: user.email,
      },
    });
  }
  return true;
}

export async function actionService(previousState = {}, formData) {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();

  try {
    // Extract form data
    const serviceName = formData.get("serviceName");
    const description = formData.get("link");
    const httpMethod = formData.get("httpMethod");
    const serviceStatus = formData.get("serviceStatus");

    // Create service in database 
    const newService = await prismadb.service.create({
      data: {
        userId: user?.id,
        name: serviceName,
        description: description,
        method: httpMethod,
        status: serviceStatus,
      },
    });

    // Revalidate the path to refresh server-side rendered content, so that the latest service data is displayed
    revalidatePath("/monitors");

    return {
      error: false,
      message: "Service created successfully",
      service: newService,
    };
  } catch (error) {
    console.error("Error creating service:", error);

    return {
      error: true,
      message: "Failed to create service",
    };
  }
}

// Fetch all services 
export async function fetchAllServices() {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();

  try {
    // Fetch all services with their related user information
    const services = await prismadb.service.findMany({
      where: {
        userId: user?.id, // Filter services by the logged-in user's ID
      },
      select: {
        id:true,
        name:true,
        method:true,
        status:true,
        createdAt:true
      },
      orderBy: {
        createdAt: "desc", // Optional: order by most recent first
      },
    });

    console.log(services)

    return {
      success: true,
      data: services,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "An unknown error occurred while fetching services",
    };
  }
}


// Fetch all incidents 
export async function fetchAllIncidents() {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();

  try {
    // Fetch all incidents
    const incidents = await prismadb.incident.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        service: {
          select: {
            name: true,
            status: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    console.log(incidents)

    return {
      success: true,
      data: incidents,
    };
  } catch (error) {
    console.error("Error fetching incidents:", error);
    
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "An unknown error occurred while fetching incidents",
    };
  }
}
