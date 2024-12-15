"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

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

// Server Action
async function submitServiceStatus(formData) {
  // "use server";

  const rawFormData = {
    serviceName: formData.get("serviceName"),
    link: formData.get("link"),
    method: formData.get("method"),
    serviceStatus: formData.get("serviceStatus"),
  };

  try {
    // Validate the data
    const validatedData = ServiceSchema.parse(rawFormData);

    // TODO: Add your actual submission logic here
    // For example, sending data to an API or database
    console.log("Validated Service Data:", validatedData);

    // Optional: Return a success message or status
    return { success: true, message: "Service status updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return {
        success: false,
        errors: error.errors.map((err) => ({
          path: err.path[0],
          message: err.message,
        })),
      };
    }

    // Handle other potential errors
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
