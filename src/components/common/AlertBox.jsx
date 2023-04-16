import React, { useState, useEffect } from "react";
import { TiTick, TiWarning, TiInfo, TiCancel } from "react-icons/ti";

const AlertBox = ({ type, message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  let icon;
  switch (type) {
    case "success":
      icon = <TiTick className="text-green-500 w-6 h-6" />;
      break;
    case "error":
      icon = <TiCancel className="text-red-500 w-6 h-6" />;
      break;
    case "warning":
      icon = <TiWarning className="text-yellow-500 w-6 h-6" />;
      break;
    case "info":
    default:
      icon = <TiInfo className="text-blue-500 w-6 h-6" />;
      break;
  }

  return (
    showAlert && (
      <div
        className={`flex rounded items-center p-4 bg-gray-800 text-white border-t-4 ${
          type === "success"
            ? "border-green-500"
            : type === "error"
            ? "border-red-500"
            : type === "warning"
            ? "border-yellow-500"
            : "border-blue-500"
        }`}
      >
        <div className="mr-4">{icon}</div>
        <div>
          <p>{message}</p>
        </div>
        {onClose && (
          <button className="ml-auto" onClick={onClose}>
            <TiCancel className="text-gray-500 w-6 h-6" />
          </button>
        )}
      </div>
    )
  );
};

export default AlertBox;
