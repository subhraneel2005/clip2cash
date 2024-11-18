"use client";

import React, { useState } from "react";
import Story from "../Video-Components/Story";
import FontStyle from "../Video-Components/FontStyle";
import Video from "../Video-Components/Video";
import AiVoiceover from "../Video-Components/AiVoiceover";

export default function CreateVideo() {
  const [activeSection, setActiveSection] = useState("story");

  const handleNextSection = () => {
    switch (activeSection) {
      case "story":
        setActiveSection("font");
        break;
      case "font":
        setActiveSection("video");
        break;
      case "video":
        setActiveSection("voice");
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "story":
        return <Story onNext={handleNextSection} />;
      case "font":
        return <FontStyle onNext={handleNextSection}/>;
      case "video":
        return <Video onNext={handleNextSection} />;
      case "voice":
        return <AiVoiceover />;
      default:
        return null;
    }
  };

  const menuItems = [
    { id: "story", label: "Script", icon: "/book.svg" },
    { id: "font", label: "Font Style", icon: "/type.svg" },
    { id: "video", label: "Video", icon: "/video.svg" },
    { id: "voice", label: "AI Voiceover", icon: "/mic.svg" },
  ];

  return (
    <div className="drawer lg:drawer-none">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Hamburger menu button - only show on mobile/tablet */}
        <div className="lg:hidden bg-base-100 p-4 shadow-lg">
          <label htmlFor="my-drawer" className="btn btn-ghost">
            <img src="/menu.svg" alt="menu" className="w-6 h-6" />
          </label>
        </div>

        <div className="flex">
          {/* Desktop Sidebar - hidden on mobile/tablet */}
          <div className="hidden lg:block w-64 bg-base-100 shadow-lg min-h-screen">
            <ul className="menu p-4 text-base-content space-y-3">
              <li className="menu-title">
                <span className="text-xl">Create Video</span>
              </li>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`${
                      activeSection === item.id
                        ? "bg-success text-success-content hover:bg-success"
                        : "hover:bg-base-200"
                    } flex items-center gap-4 px-4 py-3 text-lg`}
                  >
                    <img src={item.icon} alt={item.label} className="w-6 h-6" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">{renderContent()}</div>
        </div>
      </div>

      {/* Mobile Drawer Sidebar */}
      <div className="drawer-side lg:hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content space-y-3">
          <li className="menu-title">
            <span className="text-xl">Create Video</span>
          </li>
          {menuItems.map((item) => (
            <li key={item.id}>
              <label
                htmlFor="my-drawer"
                onClick={() => setActiveSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? "bg-success text-success-content hover:bg-success"
                    : "hover:bg-base-200"
                } flex items-center gap-4 px-4 py-3 text-lg`}
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
