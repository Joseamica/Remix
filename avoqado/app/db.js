// shout-out to https://icanhazdadjoke.com/

export const db = () => {
  //RESTAURANTE
  const restaurant = [
    {
      id: 1,
      name: "Madre Cafe",
      menuID: [1, 2],
      tableId: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      name: "Bikina",
      menuID: [1, 2],
    },
  ];
  //TABLE
  const table = [
    {
      id: 1,
      number: 2,
      restId: 1,
      orderInProgress: true, //si la orden se convierte en false borrar  order id y poner la mesa como disponible
      orderID: 1, //la orden (platillos, total etc)
      userID: [1, 2], //que usuarios estan en la mesa
    },
    {
      id: 2,
      restId: 1,
      orderInProgress: false,
      orderID: 1,
      userID: [1, 2],
    },
  ];
  //MENU
  const menu = [
    {
      id: 1,
      name: "desayuno",
      restaurantID: 2,
      menu_CategoriesID: [2, 1, 4],
    },
    {
      id: 2,
      name: "comida",
      restaurantID: 1,
      menu_CategoriesID: [1, 2, 4],
    },
    {
      id: 3,
      name: "desayuno",
      restaurantID: 2,
      menu_CategoriesID: [2, 1, 4],
    },
  ];
  //MENU_CATEGORIES
  const menu_categories = [
    {
      id: 1,
      name: "hotcakes",
      menuID: 2,
      menu_itemID: [1, 4, 2, 4, 1],
    },
    {
      id: 2,
      name: "carnes",
      menuID: 2,
      menu_itemID: [5, 6, 7],
    },
  ];
  //MENU_ITEM
  const menu_item = [
    {
      id: 1,
      image: "https://drive.google.com/uc?id=1M5GRr1yoHzRHjCEPNNQevpIdRx9vuRp8",
      name: "Hot Cakes de Frutos Rojos",
      description: "Con salsa de frutos rojos con mantequilla mascarpone.",
      price: 178,
      available: true,
      orderItemID: [1, 3, 4],
      menu_CategoriesID: 1,
    },
    {
      id: 2,
      image: "https://drive.google.com/uc?id=1DOBu7FBErMHJuqujOGah9xqXSQF5rr0X",
      name: "Toast de Aguacate",
      description:
        "Pan campesino con guacamole hecho en casa, rabano, jitomate cherry y huevo pochado.",
      price: 185,
      available: true,
      //se asigna a la mesa
      orderItemID: [1, 3, 4],
      menuItemExtraID: [1, 2],
    },
  ];
  //MENU_ITEM_EXTRA
  const menu_item_extra = [
    {
      id: 1,
      image: "https://drive.google.com/uc?id=1M5GRr1yoHzRHjCEPNNQevpIdRx9vuRp8",
      name: "Hot Cakes de Frutos Rojos",
      description: "Con salsa de frutos rojos con mantequilla mascarpone.",
      price: 178,
      available: true,
      menu_itemID: 1,
      orderItemExtraID: 1,
    },
  ];

  //USER
  const user = [
    {
      user_1: {
        id: 1,
        email: "joseamica@gmail.com",
        orderID: 1,
        total: 460,
      },
    },
    {
      user_2: {
        id: 2,
        email: "hola@gmail.com",
        orderID: 1,
        total: 30,
      },
    },
  ];
  //ORDER
  const orders = [
    {
      id: 1,
      //NO SE AUN CHECAR SI ESTA BIEN, aver si no es un array
      tableId: 1,
      payed: false,
      //Order_Item
      orderItemID: [2, 4, 1],
      //LocalStorage or USERID
      userID: [1, 2],
      total: 490,
      discount: 0.2,
    },
  ];
  //ORDER ITEM
  const order_item = [
    {
      id: 1,
      price: 190,
      quantity: 1,
      //se anexa a la orden
      orderID: 1,
      //son los items en el menu
      menu_itemID: 2,
      orderItemExtraID: 1,
    },
  ];
  const order_item_extra = [
    {
      id: 1,
      quantity: 2,
      orderItemId: 1,
      //se anexa a la orden
      orderID: 1,
      //son los items en el menu
      menu_itemID: 2,
    },
  ];

  //estar en constante crecimiento

  console.log("TABLEINFO", tableInfo.table[0]);
};
