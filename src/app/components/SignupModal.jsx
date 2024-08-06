import { useEffect } from 'react';

export default function SignupModal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        className="relative p-6 rounded-lg shadow-lg"
        style={{
          border: '2px solid #0ff',
          boxShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff, 0 0 20px #0ff',
          width: '400px',
          backgroundColor: 'rgba(34, 34, 34, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
        }}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-gray-300"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
