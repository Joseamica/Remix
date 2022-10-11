import React, { useState } from "react";
import {
  FullBill,
  DishLayout,
  Modal,
  ModalContainer,
  LargeButton,
  ItemLayout,
} from "../";

export const Bill = ({ order, totalBill }) => {
  const [billButton, setBillButton] = useState("");
  const [selectDish, setSelectDish] = useState([]);

  const handleBillButton = (parameter) => {
    if (parameter === "fullBill") {
      setBillButton("fullBill");
    } else if (parameter === "splitBill") {
      setBillButton("splitBill");
    }
  };
  return (
    <>
      <div className="flex flex-col rounded-md p-3 shadow-2xl ">
        {/* TODO: Dish order confirmed from database */}
        {/* {order.map((o) => {
          return (
            <DishLayout
              description={o.description}
              image={o.image}
              meal={o.meal}
              name={o.name}
              price={o.price}
              specs
              key={o.id}
            />
          );
        })} */}

        {/* END DISH */}
        {/* <div className="w-full bg-gray-200 h-[1px]" /> */}
        <div className="">
          <div className="flex flex-row justify-between p-2">
            <h4 className="text-2xl">total bill</h4>
            <span className="text-2xl">${totalBill}</span>
          </div>
          <hr />
          {/* <div className="w-full bg-gray-200 h-[1px] my-4" /> */}

          <div className="flex flex-row justify-between items-center p-2">
            <h4 className="text-2xl">left to pay</h4>
            <span className="text-2xl">$121</span>
          </div>
        </div>
      </div>
      <button
        className="largeButton"
        onClick={() => handleBillButton("fullBill")}
      >
        pay the bill
      </button>
      {/* TODO: If there is left to pay, appear this option */}
      <button
        className="largeButton"
        onClick={() => handleBillButton("splitBill")}
      >
        split the bill
      </button>
      {billButton === "fullBill" && (
        <>
          <FullBill totalBill={totalBill} />
        </>
      )}
      {billButton === "splitBill" && (
        <Modal onClose={() => setBillButton(false)}>
          <ModalContainer>
            <LargeButton
              className="largeButton"
              onClick={() => setBillButton("splitPerItem")}
            >
              <label>pay per item</label>
            </LargeButton>
            <LargeButton className="largeButton">
              <label>pay amount</label>
            </LargeButton>
          </ModalContainer>
        </Modal>
      )}
      {billButton === "splitPerItem" && (
        <Modal onClose={() => setBillButton(false)}>
          <ModalContainer>
            <div className="flex flex-col overflow-y-scroll  bg-blue-500">
              <ItemLayout
                dish="Onion Rings"
                price="290.00"
                onClick={() => setSelectDish()}
              />
              <ItemLayout dish="Onion Rings" price="290.00" />
              <ItemLayout dish="Hamburguesa con Queso" price="185.00" />
              <ItemLayout dish="Ribeye" price="420.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
              <ItemLayout dish="Pastel de Chocolate" price="192.00" />
            </div>
            <div className="bg-red-500">
              <div className="flex flex-row">
                <span>full bill</span>
                <span>290</span>
              </div>
              <LargeButton
                className="largeButton"
                onClick={() => setBillButton(false)}
              >
                Confirm
              </LargeButton>
            </div>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};
