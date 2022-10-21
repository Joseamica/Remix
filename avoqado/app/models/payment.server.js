import { db } from "../utils/db.server";

export function updateTipAmount(orderId, tip) {
  return db.order.update({
    where: { id: orderId },
    data: {
      tip: tip,
    },
  });
}
