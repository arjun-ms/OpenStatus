// prisma instantiation

import { PrismaClient } from "@prisma/client";

let prismadb;

if (process.env.NODE_ENV === "production") {
  // in production, always create new instance of prisma
  prismadb = new PrismaClient();
}
// development environment
else {
  // check if there is any pre-existing instance of prisma client. If not, create a new instance
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prismadb = global.cachedPrisma;
}

export default prismadb;
