"use client";

import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface NumericKeyboardProps {
  onChange: (input: string) => void;
  onKeyPress?: (button: string) => void;
}

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onChange,
  onKeyPress,
}) => {
  const handleChange = (input: string) => {
    onChange(input);
  };

  const handleKeyPress = (button: string) => {
    if (onKeyPress) onKeyPress(button);
  };

  return (
    <div className="numeric-keyboard">
      <Keyboard
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            "AC / *",
            "7 8 9 -",
            "4 5 6 +",
            "1 2 3 Enter",
            "0 . {bksp}",
          ],
        }}
        display={{
          "{bksp}": "⌫",
          AC: "AC",
          "/": "÷",
          "*": "×",
          "-": "−",
          "+": "+",
          Enter: "⏎",
        }}
        theme="hg-theme-default hg-layout-numeric"
      />
    </div>
  );
};

export default NumericKeyboard;
