import React from 'react';

export default function CustomTextArea({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 border border-[#949494] rounded-lg resize-none min-h-[100px] w-full"
        rows={4}
      />
    </div>
  );
}
