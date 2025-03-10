import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useQRCodeGenerator from "./hooks/useQRCodeGenerator";
import QRTabs from "./components/QRTabs";
import QRInput from "./components/QRInput";
import QRButtons from "./components/QRButtons";
import QRDisplay from "./components/QRDisplay";
import QRCustomize from "./components/QRCustomize";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";

const App = () => {
    const { activeTab, input, qrValue, setInput, generateQRCode, clearQRCode, handleTabChange } = useQRCodeGenerator();
    const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light")
    function lightMode() {
        setThemeMode('light')
    }
    function darkMode() {
        setThemeMode('dark')
    }
    useEffect(() => {
        document.querySelector('html').classList.remove('light', 'dark')
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])
    return (
        <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
            <Router>
                <Header />
                <Routes>

                    {/* Main QR Code Generator Page */}
                    <Route path="/" element={

                        <div className=" dark:bg-[#0D1117] h-screen">

                            <div className="h-4/6  flex justify-between flex-row gap-16  px-20 bg-white  dark:bg-[#0D1117]">

                                <div className="border-[#d1d9e0] border-2  w-full px-28  rounded-lg shadow-lg ">
                                    <h1 className="text-2xl  font-normal text-center my-8 dark:text-white"> Generator Your Own QR </h1>
                                    <QRTabs activeTab={activeTab} setActiveTab={handleTabChange} />
                                    <QRInput activeTab={activeTab} input={input} setInput={setInput} />
                                    <QRButtons generateQRCode={generateQRCode} clearQRCode={clearQRCode} />
                                </div>
                                <div className="border-[#d1d9e0] border-2 w-full  flex flex-col items-center justify-center  p-4 rounded-lg shadow-md">
                                    <QRDisplay qrValue={qrValue} />
                                    {/* Link to Customization Page */}
                                    {qrValue && (
                                        <a href={`/customize?value=${encodeURIComponent(qrValue)}`} className="font-semibold pt-1 text-blue-600 cursor-pointer">
                                            Click here to customize
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                    } />

                    {/* QR Code Customization Page */}
                    <Route path="/customize" element={<QRCustomize />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;