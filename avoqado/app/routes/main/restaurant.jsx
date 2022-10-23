import { Link, Outlet } from "@remix-run/react";

export const loader = ({ params, request }) => {
  return null;
};

function Restaurant() {
  return (
    <div className="">
      {/* <h1>Restaurants</h1> */}
      <div
      // style={{ background: "lightgrey", padding: 16 }}
      >
        {/* <p className="text-xl font-bold">this is the outlet comp below</p>
        <p className="text-xl font-bold">VVVVV</p> */}

        <Outlet />
      </div>
    </div>
  );
}

export default Restaurant;
