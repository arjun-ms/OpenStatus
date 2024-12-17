// Server Side functions/actions are stored in this file

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

// Signin Signup 
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

// Create a Service
export async function actionServiceCreate(previousState = {}, formData) {
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
    const link = formData.get("link");
    const httpMethod = formData.get("httpMethod");
    const serviceStatus = formData.get("serviceStatus");

    // Create service in database
    const newService = await prismadb.service.create({
      data: {
        userId: user?.id,
        name: serviceName,
        link: link,
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

// Fetch All Services
export async function actionFetchAllServices() {
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
        id: true,
        name: true,
        link: true,
        method: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // Optional: order by most recent first
      },
    });

    return {
      error: false,
      data: services,
    };
  } catch (error) {
    console.error("Error fetching services:", error);

    return {
      error: true,
      message: "An unknown error occurred while fetching services",
    };
  }
}

// Edit a Service
export async function actionServiceEdit(
  previousState = {},
  { formData, data }
) {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();

  console.log(formData, data);

  try {
    // First, check if the service exists and belongs to the user
    const service = await prismadb.service.findUnique({
      where: {
        id: data.id,
        userId: user?.id, // Ensure the service belongs to the logged-in user
      },
    });

    // If no service found, return an error
    if (!service) {
      return {
        error: true,
        message: "Service not found or you do not have permission to edit",
      };
    }
    // Edit the service
    const updatedService = await prismadb.service.update({
      where: {
        id: Number(data.id),
        userId: user.id,
      },
      data: {
        name: formData.serviceName,
        link: formData.link,
        method: formData.httpMethod,
        status: formData.serviceStatus,
        updatedAt: new Date(),
      },
    });

    console.log(updatedService);

    // Revalidate the path to refresh server-side rendered content, so that the latest service data is displayed
    revalidatePath("/monitors");
    return {
      error: false,
      message: "Service successfully updated",
      service: updatedService,
    };
  } catch (error) {
    // Handle potential errors
    console.error("Error updating service:", error);

    return {
      error: true,
      message: "Failed to update service",
    };
  }
}

// Remove a Service
export async function actionServiceRemove(serviceId) {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();

  try {
    // First, check if the service exists and belongs to the user
    const service = await prismadb.service.findUnique({
      where: {
        id: serviceId,
        userId: user?.id, // Ensure the service belongs to the logged-in user
      },
    });

    // If no service found, return an error
    if (!service) {
      return {
        error: true,
        message: "Service not found or you do not have permission to delete",
      };
    }

    // Delete the service
    const deletedService = await prismadb.service.delete({
      where: {
        id: serviceId,
      },
    });

    // Revalidate the path to refresh server-side rendered content, so that the latest service data is displayed
    revalidatePath("/monitors");
    return {
      error: false,
      message: "Service successfully deleted",
      service: deletedService,
    };
  } catch (error) {
    // Handle potential errors
    console.error("Error deleting service:", error);

    return {
      error: true,
      message: "Failed to delete service",
    };
  }
}

// Create an Incident
export async function actionIncidentCreate(previousState = {}, formData) {
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
    const incidentName = formData.get("incidentName");
    const serviceId = Number(formData.get("serviceId"));
    const incidentStatus = formData.get("incidentStatus");

    // First, check if the service exists (isValid)
    const service = await prismadb.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    // If no such service is found, return an error
    if (!service) {
      return {
        error: true,
        message: "Reported service not found",
      };
    }

    // Create incident in database
    const newIncident = await prismadb.incident.create({
      data: {
        name: incidentName,
        status: incidentStatus,
        serviceId: serviceId,
      },
    });

    // Revalidate the path to refresh server-side rendered content, so that the latest incident data is displayed
    revalidatePath("/incidents");
    return {
      error: false,
      message: "Incident created successfully",
      incident: newIncident,
    };
  } catch (error) {
    console.error("Error creating incident:", error);

    return {
      error: true,
      message: "Failed to create incident",
    };
  }
}

// Fetch All Incidents
export async function actionFetchAllIncidents() {
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
        name: true,
        status: true,
        createdAt: true,
        service: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      error: false,
      data: incidents,
    };
  } catch (error) {
    console.error("Error fetching incidents:", error);

    return {
      error: true,
      message: "An unknown error occurred while fetching incidents",
    };
  }
}

// Edit Incidents
export async function actionIncidentEdit(
  previousState = {},
  { formData, data }
) {
  // get the auth status of logged in user
  const { isAuthenticated, getUser } = getKindeServerSession();

  // check whether user logged in the browser
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  // check if user is in database
  const user = await getUser();
  console.log(data, formData);
}