import React, { useState } from "react";

interface FontStyleProps {
  onNext: () => void;
  onFontSelect?: (font: string) => void;
}

export default function FontStyle({ onNext, onFontSelect }: FontStyleProps) {
  const [selectedFont, setSelectedFont] = useState<string>("");

  const fonts = [
    {
      id: "style1",
      style: {
        fontFamily: "'Black Han Sans'",
        fontSize: "40px",
        lineHeight: "50px",
        color: "#FFFFFF",
        WebkitTextStroke: "2px #000000",
        textStroke: "2px #000000",
        fontWeight: "400",
        filter: "drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.25))",
      }
    },
    {
      id: "style2",
      style: {
        fontFamily: "'Black Han Sans'",
        fontSize: "40px",
        lineHeight: "50px",
        color: "#B4FFAA",
        WebkitTextStroke: "2px #000000",
        textStroke: "2px #000000",
        fontWeight: "400",
        filter: "drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.25))",
      }
    },
    {
      id: "style3",
      style: {
        fontFamily: "'Black Han Sans'",
        fontSize: "40px",
        lineHeight: "50px",
        color: "#FFF700",
        WebkitTextStroke: "2px #000000",
        textStroke: "2px #000000",
        fontWeight: "400",
        filter: "drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.25))",
      }
    },
    {
      id: "style4",
      style: {
        fontFamily: "'Black Han Sans'",
        fontSize: "40px",
        lineHeight: "50px",
        color: "#76DFFC",
        WebkitTextStroke: "2px #000000",
        textStroke: "2px #000000",
        fontWeight: "400",
        filter: "drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.25))",
      }
    },
  ];

  const handleFontSelect = (fontId: string) => {
    setSelectedFont(fontId);
    if (onFontSelect) {
      onFontSelect(fontId);
    }
  };

  return (
    <div id="fontStyle" className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-7xl">
        <h2 className="py-2 text-5xl font-black mb-10 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter text-center">
          Choose Your Font Style
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontSelect(font.id)}
              className={`relative p-4 rounded-xl transition-all hover:scale-105 
                ${selectedFont === font.id 
                  ? "bg-gray-200 ring-2 ring-blue-500" 
                  : "bg-white hover:bg-gray-50"
                }`}
            >
              <p style={font.style}>
                The Quick Brown
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
        <button
            onClick={onNext}
            disabled={!selectedFont}
            className="btn btn-wide"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
