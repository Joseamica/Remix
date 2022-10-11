import { Link, Outlet } from "@remix-run/react";

function A() {
  const ab = [
    {
      id: 1,
      name: "Team One",
      players: [
        {
          id: 1,
          name: "player one team one",
        },
        {
          id: 2,
          name: "player two team one",
        },
        {
          id: 3,
          name: "player three team one",
        },
      ],
    },
    { id: 2, name: "Team Two" },
    { id: 3, name: "Team Three" },
  ];
  return (
    <div className="w-max bg-red-200">
      <h1>AB LINK</h1>
      <div
      // style={{ background: "lightgrey", padding: 16 }}
      >
        <p className="text-xl font-bold">this is the outlet comp below</p>
        <p className="text-xl font-bold">VVVVV</p>

        <Outlet context={[ab]} />
      </div>
    </div>
  );
}

export default A;
