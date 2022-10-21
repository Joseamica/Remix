import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../../../utils/db.server";

export const loader = async ({ request, params }) => {
  const restaurants = await db.restaurant.findMany({
    include: { branches: true },
  });
  return json({ restaurants });
};

export default function Index() {
  const { restaurants } = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold">Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-full"
            />

            <h2 className="text-xl font-bold mt-4">{restaurant.name}</h2>
            <ul>
              {restaurant.branches.map((branch) => (
                <li key={branch.id}>
                  <h3 className="text-lg mt-1">
                    <Link
                      className="underline"
                      to={`/restaurant/${restaurant.id}/branch/${branch.id}`}
                    >
                      {branch.name}
                    </Link>
                  </h3>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
