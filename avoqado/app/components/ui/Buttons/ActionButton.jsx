export const ActionButton = ({ styleType, ...propiedades }) => {
  return (
    <button
      {...propiedades}
      className="absolute h-11 w-11 bg-white drop-shadow-lg m-auto left-0 right-0 
        rounded-full text-center flex justify-center items-center"
    >
      +
    </button>
  );
};
