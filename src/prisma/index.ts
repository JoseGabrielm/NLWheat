//* instancia prisma para BD

import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
