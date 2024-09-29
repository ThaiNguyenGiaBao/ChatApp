import { PrismaClient } from "@prisma/client";

// Add debug: true to log all queries
const prisma = new PrismaClient({ log: ["info"] });
async function checkDbConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

checkDbConnection();
export default prisma;
