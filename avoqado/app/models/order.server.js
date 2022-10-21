import { db } from "../utils/db.server";

export function getTableCount(branchId) {
  return db.table.count({
    where: {
      branchId: branchId,
    },
  });
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

export function getOrderItemsByOrderId(menuItemId,orderId){
  return db.orderItem.findMany({
    where: {
      menuItemId: menuItemId,
      orderId: Number(orderId),
    },
  });
}



export function createOrderByTableId(tableId){
  return db.order.create({
    data: {
      paid: false,
      creationDate: new Date(),
      orderedDate: new Date(),
      Table: {
        connect: {
          id: tableId,
        },
      },
    },
  });
}


export function createOrderItemsUingMenuItemId(menuItemPrice, menuItemQuantity, menuItemId, orderId){
  return db.orderItem.create({
    data: {
      price: menuItemPrice,
      quantity: menuItemQuantity,
      MenuItem: {
        connect: {
          id: menuItemId,
        },
      },
      Order: {
        connect: {
          id: orderId,
        },
      },
    },
  });
}

export function orderItemUpdateQuantity(menuItemId, menuItemQuantity){
  return db.orderItem.updateMany({
    where: {
      menuItemId: menuItemId,
    },
    data: {
      quantity: { increment: menuItemQuantity },
    },
  });
}

export function countOrderByTableId(tableId){
  return db.order.count({
    where: {
      tableId: tableId
    }
})
}

