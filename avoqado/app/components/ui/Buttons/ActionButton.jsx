export const ActionButton = ({ styleType, ...propiedades }) => {
  return (
    <button
      {...propiedades}
      className="absolute h-14 w-14 bg-white shadow-lg m-auto left-0 right-0 
        rounded-full text-center flex justify-center items-center"
    >
      +
    </button>
  );
};
