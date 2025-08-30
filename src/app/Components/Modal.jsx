import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  children,
  onClose = () => {},
  Width,
  showCross = true,
}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // Add event listener for key press
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter" && isOpen) {
        // Find the first button in the modal and simulate a click event
        const button = document.querySelector(".modal-button");
        if (button) button.click();
      }
    };

    // Add event listener for Enter key press
    document.addEventListener("keydown", handleEnterKeyPress);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Main modal */}
      {isOpen && (
        <div
          className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-center w-full h-screen bg-opacity-50 bg-gray-500  backdrop-filter backdrop-blur-sm`}
        >
          <div className={`relative bg-white rounded-3xl shadow  ${Width}`}>
            {showCross && onClose && (
              <button
                type="button"
                className="absolute z-0 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            )}
            <div className="px-6 py-6 lg:px-8 max-h-screen">
              <div className="overflow-y-auto max-h-100 md:max-h-116 p-3 z-50">
                {/* Content */}
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
