import { PencilIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { TipButton } from "../ui/Buttons/TipButton";

export const FullBill = ({ totalBill }) => {
  // TODO: Bring the total of the order from DB

  const [tipAmount, setTipAmount] = useState(0);
  const [bill, setBill] = useState(0);

  const handleAmountTip = (tipAmount) => {
    setTipAmount(tipAmount);
  };

  const tipObj = {
    standard: totalBill * 0.1,
    generous: totalBill * 0.12,
    amazing: totalBill * 0.18,
  };

  useEffect(() => {
    const fullBill = totalBill + tipAmount;
    setBill(fullBill);
  }, [tipAmount]);

  return (
    <>
      <div className="space-y-2">
        <div className="flex flex-col bg-white shadow-md rounded-md p-3 space-y-2">
          <h3 className="font-semibold text-2xl">Tip</h3>
          <div className="flex flex-row space-x-1 justify-around ">
            {/* TODO: Agregar logica para agregar tip */}
            <TipButton
              concept="Standard"
              onClick={() => handleAmountTip(tipObj.standard)}
              amount={"$" + tipObj.standard.toLocaleString("en-US")}
            />
            <TipButton
              concept="Generous"
              onClick={() => handleAmountTip(tipObj.generous)}
              amount={"$" + tipObj.generous.toLocaleString("en-US")}
            />
            <TipButton
              concept="Amazing"
              onClick={() => handleAmountTip(tipObj.amazing)}
              amount={"$" + tipObj.amazing.toLocaleString("en-US")}
            />
            <TipButton
              concept="Other"
              onClick={null}
              amount={"$" + tipAmount.toLocaleString("en-US")}
            />
            {/* aqui tengo que poner activar modal */}
          </div>
          {/* C-START: Rest of information (promo code, summary of order, total) */}
        </div>
      </div>
      <div className="flex flex-col bg-white shadow-md rounded-md p-3 divide-y space-y-2">
        <button className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-2">
            <PencilIcon className="h-5 w-5" />
            <label>Enter Promo Code</label>
          </div>
          <PlusCircleIcon className="h-7 w-7" />
        </button>
        <div className="flex flex-col">
          <div className="flex flex-row p-3 justify-between">
            <label>Subtotal (tax included)</label>
            <label>${totalBill.toLocaleString("en-US")}</label>
          </div>
          <div className="flex flex-row p-3 justify-between">
            <label>Tip</label>
            {true ? (
              <label>{tipAmount.toLocaleString("en-US")}</label>
            ) : (
              <>$0</>
            )}
          </div>
        </div>
        <div className="flex flex-row p-3 justify-between font-bold">
          <label className="text-xl">Total</label>
          <label className="text-xl">${bill.toLocaleString("en-US")}</label>
        </div>
      </div>
    </>
  );
};
