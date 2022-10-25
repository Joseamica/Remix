export const OrderItemsDetail = ({
  children,
  hideBill,
  orderItemsOnTable,
  subtotal,
}) => {
  return (
    <div className="bg-white shadow-lg p-2 space-y-2 rounded-2xl ">
      {hideBill ? null : (
        <>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl">Bill</h2>
            <h2 className="text-2xl">${subtotal}</h2>
          </div>
          <hr />
        </>
      )}

      {Array.isArray(orderItemsOnTable) &&
        orderItemsOnTable.map((orderItems) => {
          const menuItem = orderItems.MenuItem;
          return (
            <div className="w-full" key={orderItems.id}>
              <div className="flex flex-row justify-between items-center space-x-2 ">
                <div className="flex flex-row items-center space-x-4 shrink-0 ">
                  {/* Quantity */}
                  <label className="font-semibold p-0.5  text-mainTextColor rounded-lg ring-2 ring-slate-200 text-sm">
                    {orderItems.quantity}
                  </label>
                  {/* Image */}
                  <img src={menuItem.image} className="w-10 h-10 rounded-lg" />
                </div>
                {/* REVIEW si el name es muy largo, se buguea, como le hago para que se salte la linea */}
                <div className="flex w-full flex-col text-clip overflow-hidden ">
                  <p className="text-md font-semibold truncate ">
                    {menuItem.name}
                  </p>
                  <p className="text-sm truncate">
                    {/* {specs} {extraSpecs ? <>• {extraSpecs}</> : null} */}
                  </p>
                </div>
                {orderItems.quantity > 1 && (
                  <p className="text-sm text-gray-500">${orderItems.price}</p>
                )}
                <p className="text-sm">
                  ${orderItems.price * orderItems.quantity}
                </p>
              </div>
            </div>
          );
        })}

      {children}
    </div>
  );
};
