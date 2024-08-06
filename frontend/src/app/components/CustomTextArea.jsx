import React from 'react';
import Image from 'next/image';

export default function CustomTextArea({ value, onChange, placeholder, onClick }) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 border border-[#949494] rounded-lg resize-none min-h-[100px] w-full"
        rows={4}
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute bottom-4 right-2 bg-transparent text-[#C7C7C7] flex items-center"
      >
        <Image src="/images/lucide_wand.svg" width={16} height={16} alt="wand" />
        <span className='ml-1 text-[#8F8F8F] text-sm'>Try an example</span>
      </button>
    </div>
  );
}
