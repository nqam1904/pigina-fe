import { Prisma } from "@prisma/client";

export const getPrismaErrorMessage = (
  error: Prisma.PrismaClientKnownRequestError,
): string => {
  console.log(error.code, "ERROR CODE");
  switch (error.code) {
    case "P2002":
      return `Unique constraint failed on the ${error.meta?.target}`;
    default:
      return "An unknown error occurred";
  }
};
