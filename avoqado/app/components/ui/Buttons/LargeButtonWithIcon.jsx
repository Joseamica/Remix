import { Link } from "@remix-run/react";
export const LargeButtonWithIcon = ({ title, children, ...rest }) => {
  return (
    <div className="">
      <Link
        className="py-4 px-4 justify-between flex flex-row w-full items-center  rounded-2xl text-center"
        {...rest}
      >
        {children}
      </Link>
    </div>
  );
};
