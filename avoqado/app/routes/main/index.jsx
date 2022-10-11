import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ request, params }) => {
  const restaurants = await db.restaurant.findMany({});
  return { restaurants };
};
export default function Index() {
  const { restaurants } = useLoaderData();
  // TODO: AQUI IRA LA INFORMACION DE TODOS LOS RESTAURANTES MAS CERCA DE TI.
  return (
    <div className="col-start-1 col-end-13">
      {restaurants.map((restaurant) => {
        return (
          <Link key={restaurant.id} to={`/main/restaurant/${restaurant.id}`}>
            <p>{restaurant.name}</p>
            <img src={restaurant.logo} className="object-contain h-20 w-20" />
          </Link>
        );
      })}
    </div>
  );
}
