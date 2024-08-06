import React, { forwardRef, useImperativeHandle, useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const Modal = forwardRef(({ title, message, outerClassName = "", titleClassName = "", onCancel, children, isLoading = false }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    closeModal: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`flex flex-col flex-wrap bg-[#2A2A2A] py-3 px-5 rounded shadow-lg ${outerClassName}`}>
        <div className={`flex justify-between w-full mb-5 h-[50px]`}>
          <h2 className={`text-4xl text-[#DEDEDE] font-semibold self-end ${titleClassName}`}>{title}</h2>
          <button onClick={() => { onCancel(); setIsVisible(false); }} className="text-white px-2 py-2 rounded self-start">
            <img src="/images/X.svg" width={12} height={12} alt="close icon"/>
          </button>
        </div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {message && <p className="mb-4">{message}</p>}
            {children}
          </>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Modal;
