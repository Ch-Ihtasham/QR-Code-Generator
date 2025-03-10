import React, { useRef } from "react";
import ReactQRCode from "react-qr-code";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";

const QRDisplay = ({ qrValue }) => {
    const qrRef = useRef(null); // Reference to the QR Code

    // Function to Copy QR Code Image to Clipboard
    const handleCopy = async () => {
        if (!qrValue) return alert("No QR Code to copy!");

        try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const svgElement = qrRef.current;
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const img = new Image();

            img.onload = async () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                canvas.toBlob(async (blob) => {
                    if (blob) {
                        await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob }),
                        ]);
                        alert("QR Code copied to clipboard!");
                    }
                }, "image/png");
            };

            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        } catch (error) {
            console.error("Error copying QR Code:", error);
            alert("Failed to copy QR Code.");
        }
    };

    // Function to Download QR Code Image
    const handleDownload = () => {
        if (!qrValue) return alert("No QR Code to download!");

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const svgElement = qrRef.current;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "qr-code.png";
            link.click();
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    return (
        <div className="relative flex  flex-col justify-center items-center w-96 h-80 bg-white rounded-lg shadow-md border-[#d1d9e0] border-2 pt-8 dark:bg-[#0D1117]">
            {/* QR Code or Placeholder */}
            {qrValue ? (
                <div id="qr-code">
                    <ReactQRCode ref={qrRef} value={qrValue} size={100} />
                </div>
            ) : (
                <p className="text-[#25292e] dark:text-white text-lg">QR Code will appear here</p>
            )}

            {/* Label at the center of the top border */}
            <div className="font-medium dark:font-normal text-xl rounded border-[#d1d9e0] border-2 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-1 text-[#0969da] whitespace-nowrap dark:bg-[#0D1117]">
                Your QR Code
            </div>

            {/* Copy & Download Icons */}
            {qrValue && (
                <div className="flex gap-2 mt-3">
                    {/* Copy Button */}
                    <button className="p-1" onClick={handleCopy}>
                        <MdOutlineContentCopy className="text-black w-6 h-6 dark:text-white" />
                    </button>

                    {/* Download Button */}
                    <button className="p-1" onClick={handleDownload}>
                        <MdOutlineFileDownload className="text-black w-6 h-6 dark:text-white" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRDisplay;