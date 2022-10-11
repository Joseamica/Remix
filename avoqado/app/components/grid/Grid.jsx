function Grid({ children, className, ignore }) {
  return (
    <div
      className={` 
      w-full 
      px-8
 
    ${className ? className : ""}`}
    >
      <div
        className="
        bg-white
      w-full h-full mx-auto px-0 grid 
      grid-cols-custom-laptop
      md:grid-cols-custom-laptop
      sm:grid-cols-custom-mobile gap-4
      "
      >
        {children}
      </div>
    </div>
  );
}

export { Grid };

// max-w-laptop-full bg-purple-500
// md:max-tablet-full md:bg-red-500
// sm:max-w-mobile sm:bg-yellow-500
