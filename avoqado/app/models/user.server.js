import { db } from "../utils/db.server";

export function getUserTotal(userId) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      total: true,
    },
  });
}
