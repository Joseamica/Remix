// case "decreaseQuantity": {
//     const productId = formData.get("productId");
//     const quantity = action === "increaseQuantity" ? 1 : -1;

//     let [cart, product] = await Promise.all([
//         getShoppingCart(userId),
//         getProduct(productId),
//       ]);
//       const cartItem = cart.cartItems.find((item) => item.productId === productId);

//     if (cartItem) {
//       const newQuantity = cartItem.quantity + quantity;
//       const newTotalPrice = Number(product.price) * newQuantity;
//       return prisma.cartItem.update({
//         data: { quantity: newQuantity, totalPrice: newTotalPrice },
//         where: { id: cartItem.id },
//       });
//     }
//     break;
