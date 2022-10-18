import { db } from "../utils/db.server";

export function getOrderId(idTable) {
  return db.table.findUnique({
    where: {
      id: idTable,
    },
    select: {
      Order: {
        where: {
          tableId: idTable,
        },
      },
    },
  });
}

export function createOrder(price, quantity, id, tableId, orderId) {
  return db.orderItem.create({
    data: {
      price: price,
      quantity: quantity,
      orderId: orderId,
      MenuItem: {
        connect: {
          id: id,
        },
      },
      Order: {
        create: {
          tableId: tableId,
          payed: false,
          creationDate: new Date(),
          orderedDate: new Date(),
        },
      },
    },
  });
}

export async function createOrderItem(price, quantity, id, orderId) {
  // get the id of order item if exist and compare with the id provided
  // get the menuitemid that is on orderitemid and know if is the smae as the id provided

  return db.orderItem.create({
    data: {
      price: price,
      quantity: quantity,
      MenuItem: {
        connect: {
          id: id,
        },
      },
      Order: {
        connect: {
          id: parseInt(orderId),
        },
      },
    },
  });
}

export function deleteOrder(id) {
  return db.order.delete({
    where: {
      id: id,
    },
  });
}
