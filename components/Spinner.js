const Spinner = () => {
  return (
    <svg viewBox="0 0 60 60" className="w-12 animate-spin">
      <circle
        cx="30"
        cy="30"
        r="25"
        className="stroke-gray-200"
        fill="transparent"
        strokeWidth="4"
      />
      <path
        d="M 30 5 A 25 25 0 0 1 55 30"
        className="stroke-gray-800"
        fill="transparent"
        strokeWidth="4"
      />
    </svg>
  );
};

export default Spinner;
