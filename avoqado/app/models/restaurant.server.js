import { db } from "../utils/db.server";

export function getRestaurant({ id }) {
  return db.restaurant.findMany({
    where: {
      name: "Madre Cafe",
    },
  });
}

export function getBranch({}) {
  return db.branch.findMany({});
}
