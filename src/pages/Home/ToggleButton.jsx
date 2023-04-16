import React, { useState } from "react";

const ToggleButton = () => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <label className="relative inline-block w-10 h-6 cursor-pointer bg-gray-300 rounded">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={isToggled}
        onChange={handleToggle}
      />
      <span
        className={`absolute w-6 h-6 bg-gray-300 rounded-full transition-transform ${
          isToggled ? "bg-green-500 transform translate-x-full" : ""
        }`}
      ></span>
    </label>
  );
};

export default ToggleButton;
