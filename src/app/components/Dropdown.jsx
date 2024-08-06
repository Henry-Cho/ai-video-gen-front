import { useState } from "react";
import tinycolor from "tinycolor2";

const ToggleColorSelect = ({ colorList }) => {
  const [selectedColor, setSelectedColor] = useState(colorList[0]);

  const colorNameToRgb = (colorNameStr) => {
    const color = tinycolor(colorNameStr);
    return color.toRgbString();
  };

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div>
      <div
        style={{ backgroundColor: colorNameToRgb(selectedColor), height: '100px', width: '100%' }}
        className="mb-4"
      >
        Selected Color Box
      </div>
      <select
        value={selectedColor}
        onChange={handleChange}
        className="p-2 border border-gray-300"
      >
        {colorList.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToggleColorSelect;
