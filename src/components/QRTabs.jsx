import React from "react";

const QRTabs = ({ activeTab, setActiveTab }) => {
    const tabs = ["URL", "Text", "Image", "Email"];

    return (
        <div className="flex justify-between my-10">
            {tabs.map((tab) => (
                <button
                    key={tab.toLowerCase()}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-2 rounded transition-all duration-200 bg-[#0969da] text-white font-normal dark:bg-transparent dark:border-white dark:border`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default QRTabs;