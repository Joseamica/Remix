import { db } from "../utils/db.server";

export function getOrder({ id }) {
  return db.order.findMany({ id });
}
