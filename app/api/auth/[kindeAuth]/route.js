// API route handler for authentication using Kinde Auth.
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();
