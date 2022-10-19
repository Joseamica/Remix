import { BookOpenIcon, PhoneIcon } from "@heroicons/react/outline";
import { LargeButtonWithIcon } from "../components/index";

function RestaurantInfoCard({ restaurant, branch, menu, tableId }) {
  const [branchInfo] = branch;
  return (
    <section
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="space-y-1 bg-white drop-shadow-lg rounded-2xl mt-4"
    >
      {branch.map((properties) => (
        <div key={properties.id}>
          <button className="w-full drop-shadow-md">
            <div className="relative">
              <img
                src={properties.ppt_image}
                className="max-h-60 w-full object-cover rounded-t-2xl"
              />
              {/* <img
                src="https://madre-cafe.com/wp-content/uploads/2021/11/logo-madre-cafe-header.svg"
                className=" bg-white "
              /> */}
            </div>

            <div
              className="flex flex-row p-4 rounded-b-xl text-left   
              overflow-hidden sm:justify-start justify-between space-y-2 "
              //   key={properties.id}
            >
              <div className="flex flex-row shrink-0 space-x-2 justify-between">
                <img
                  className="shrink-0  object-contain h-24 w-24 rounded-full drop-shadow-sm bg-white"
                  src={`${restaurant.logo}`}
                />
                <div className="flex flex-row space-x-2">
                  {/* <p className="text-lg">{restaurant.name} </p> */}
                  {/* <label> • </label>
                  <p className="text-lg font-medium">{properties.name} </p> */}
                </div>
                <div className="flex flex-row space-x-2"></div>
              </div>
              {/* endRestaurant name and logo */}
              {/* ----INFORMATION---- */}
              <div className="shrink-0 space-y-1">
                {/* Rating */}
                <div className="flex flex-row space-x-2 items-center">
                  <p className="text-lg font-lg">{restaurant.name} </p>
                  {/* EXPLAIN If Restaurant and branch are the same doesnt show branch name */}
                  {!restaurant.name.trim() === properties.name.trim() && (
                    <>
                      <label> • </label>
                      <p className="text-md ">{properties.name} </p>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {/* <StarIcon className="h-5 w-5" /> */}
                  <p className="text-sm">{properties.rating}</p>
                  <p className="text-sm">
                    ({properties.rating_quantity}+ ratings)
                  </p>
                  <label>•</label>
                  <span className="text-sm">{properties.cuisine}</span>
                </div>
                {/* endRating */}
                {/* Location */}
                <div className="flex flex-row space-x-1  ">
                  {/* <CursorClickIcon className="h-5 w-5" /> */}
                  <p className="text-sm ">
                    {properties.address} • {properties.extraAddress} •{" "}
                    {properties.city}
                    {/* •{" "}
                {properties.zipCode} */}
                  </p>
                </div>
                {/* endLocation */}
                {/* Distance */}
              </div>
              {/* endDistance */}
            </div>
          </button>
          <hr />
          <LargeButtonWithIcon
            to={`/menu/?rest=${restaurant.id}&branch=${branchInfo.id}&meal=${
              menu.meal
            }&table=${tableId.table_number <= 0 ? 9999 : tableId.table_number}`}
          >
            <p>View the menu</p>
            <BookOpenIcon className="h-5 w-5" />
          </LargeButtonWithIcon>
          <hr />

          <button className="py-4 px-4 justify-between flex flex-row w-full items-center  rounded-2xl text-center">
            <a href={`tel://${properties.phone}`}>Contact {restaurant.name}</a>
            <PhoneIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </section>
  );
}

export { RestaurantInfoCard };
