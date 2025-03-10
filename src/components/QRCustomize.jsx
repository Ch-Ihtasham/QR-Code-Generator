import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQRCode from "react-qr-code";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";

const QRCustomize = () => {
    const [searchParams] = useSearchParams();
    const qrValue = searchParams.get("value") || ""; // Get QR value from URL
    const navigate = useNavigate(); // For navigation

    // States for QR customization
    const [size, setSize] = useState(150);
    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [qrColor, setQrColor] = useState("#00000");
    const [errorCorrection, setErrorCorrection] = useState("M");

    // Copy QR Code Function
    const handleCopy = async () => {
        if (!qrValue) return alert("No QR Code to copy!");
        try {
            const svgElement = document.getElementById("custom-qr");
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            img.onload = async () => {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(async (blob) => {
                    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
                    alert("QR Code copied to clipboard!");
                });
            };
        } catch (error) {
            console.error("Error copying QR Code:", error);
            alert("Failed to copy QR Code.");
        }
    };

    // Download QR Code Function
    const handleDownload = () => {
        if (!qrValue) return alert("No QR Code to download!");

        const svgElement = document.getElementById("custom-qr");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "qr-code-custom.png";
            link.click();
        };
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white min-h-screen dark:text-white dark:bg-[#0D1117]">
            <h2 className="text-2xl font-semibold mb-4">Customize Your QR Code</h2>

            {/* QR Code Display */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                {qrValue ? (
                    <ReactQRCode id="custom-qr" value={qrValue} size={size} bgColor={bgColor} fgColor={qrColor} level={errorCorrection} />
                ) : (
                    <p className="text-gray-500">No QR Code available</p>
                )}
            </div>

            {/* Customization Options */}
            <div className="mt-5 flex flex-col items-center gap-4">
                {/* Size Selector */}
                <label>
                    Size:
                    <input type="range" min="100" max="300" value={size} onChange={(e) => setSize(Number(e.target.value))} className="ml-2" />
                    {size}px
                </label>

                {/* Color Pickers */}
                <label>
                    QR Color:
                    <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="ml-2 cursor-pointer " />
                </label>

                <label>
                    Background Color:
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-2 cursor-pointer " />
                </label>

                {/* Error Correction Selector */}
                <label>
                    Error Correction:
                    <select value={errorCorrection} onChange={(e) => setErrorCorrection(e.target.value)} className="ml-2 border p-1">
                        <option value="L">Low</option>
                        <option value="M">Medium</option>
                        <option value="Q">Quartile</option>
                        <option value="H">High</option>
                    </select>
                </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                <button onClick={handleCopy} className="p-2 bg-gray-200 rounded dark:bg-white">
                    <MdOutlineContentCopy className="text-black w-6 h-6" />
                </button>
                <button onClick={handleDownload} className="p-2 bg-gray-200 rounded dark:bg-white">
                    <MdOutlineFileDownload className="text-black w-6 h-6" />
                </button>
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition"
            >
                🔙
            </button>
        </div>
    );
};

export default QRCustomize;