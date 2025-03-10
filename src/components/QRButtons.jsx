import React from "react";

const QRButtons = ({ generateQRCode, clearQRCode }) => {
    return (
        <div className="flex justify-evenly pt-4 ">
            <button
                onClick={generateQRCode}
            className="w-1/4 h-10 hover:bg-[#0969da] hover:text-white font-semibold cursor-pointer transition-all duration-200 mr-2 text-[#0969da] border-2 border-[#0969da] rounded-lg "
            >
                Generate
            </button>
            <button
                onClick={clearQRCode}
                className="w-1/4 h-10 bg-transparent hover:bg-red-600 hover:text-white text-red-600 font-semibold cursor-pointer transition-all duration-200 rounded-lg  border-red-600 border-2"
            >
                Clear
            </button>
        </div>
    );
};

export default QRButtons;