import { db } from "../utils/db.server";

export function IncreaseQuantity(cartItem, cartQuantity) {
  return db.orderItem.update({
    where: {
      id: Number(cartItem),
    },
    data: {
      quantity: cartQuantity + 1,
    },
  });
}

export function DecreaseQuantity(cartItem, cartQuantity) {
  return db.orderItem.update({
    where: {
      id: Number(cartItem),
    },
    data: {
      quantity: cartQuantity - 1,
    },
  });
}

export function getQuantityCartItems(cartItem) {
  return db.orderItem.findUnique({
    where: {
      id: Number(cartItem),
    },
    select: {
      quantity: true,
    },
  });
}

export function DeleteCartItem(cartItem) {
  return db.orderItem.delete({
    where: {
      id: Number(cartItem),
    },
  });
}

export function getCartItemAndMenuItem(orderId) {
  return db.orderItem.findMany({
    where: {
      orderId: Number(orderId),
    },
    include: {
      MenuItem: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}
