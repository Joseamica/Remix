export const TipButton = ({ val, children, onClick }) => {
  return (
    <button
      name="tip"
      value={val}
      className="flex flex-col border-slighlyGray border-solid border 
    items-center text-left p-2 rounded-md min-w-[20%] focus:ring-2 focus:ring-black bg-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
