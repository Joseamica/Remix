function Grid({ children, className, ignore }) {
  return (
    <div
      className={` 
      w-full 
      px-8
      max-w-mobile bg-purple-500
      md:max-w-mobile md:bg-red-500
      sm:max-w-mobile sm:bg-yellow-500
      
    ${className ? className : ""}`}
    >
      <div
        className="
        bg-white
      w-full h-full mx-auto px-0  max-w-mobile
  
      "
      >
        {children}
      </div>
    </div>
  );
}

export { Grid };
