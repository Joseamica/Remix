// Use this to delete a user by their email
// Simply call this with:
// node --require tsconfig-paths/register ./cypress/support/delete-user.js username@example.com
// and that user will get deleted

const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const { installGlobals } = require("@remix-run/node");

const { prisma } = require("~/db.server");

installGlobals();

async function deleteUser(email) {
  if (!email) {
    throw new Error("email required for login");
  }
  if (!email.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  try {
    await prisma.user.delete({ where: { email } });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log("User not found, so no need to delete");
    } else {
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser(process.argv[2]);
