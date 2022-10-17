import { db } from "../utils/db.server";

export function getTableCount() {
  return db.table.count({});
}

export function getOrderId(tableId) {
  return db.order.findMany({
    where: {
      tableId: tableId,
    },
    select: {
      id: true,
    },
  });
}
