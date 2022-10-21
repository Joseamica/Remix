import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { db } from "../utils/db.server";

export const loader = async ({ request, params }) => {
  const { branchId } = params;
  const branch = await db.branch.findUnique({
    where: { id: Number(branchId) },
    include: { restaurant: true, Table: true },
  });

  return json({ branch });
};
export default function Index() {
  const { branch } = useLoaderData();
  const { restaurant, Table } = branch;

  return (
    <div>
      <img src={branch.ppt_image} alt={restaurant.name} className="w-full" />
      <h2 className="text-xl font-bold mt-4">Branch: {branch.name}</h2>
      <h2 className="text-lg font-bold mt-2">Tables</h2>
      <div className="flex gap-4 flex-wrap w-full">
        {Table.map((table) => (
          <div
            key={table.id}
            className="p-4 w-16 h-16 bg-blue-400 text-black font-bold items-center text-center justify-center flex"
          >
            <Link
              className="underline"
              to={`/restaurant/${restaurant.id}/branch/${branch.id}/table/${table.id}`}
            >
              {table.table_number}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
