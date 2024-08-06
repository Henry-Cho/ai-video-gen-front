import { useEffect, useRef, useState } from 'react';

function UserMenu({ user, signOut, onClose, onRemoveProfileImage }) {
  const usernameContainer = user?.user_metadata || user?.payload?.user_metadata || {};
  const username = usernameContainer.username || "User";

  const [profileImage, setProfileImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleSignOutClick = () => {
    signOut();
    onClose(); // Close the menu
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    onRemoveProfileImage();
  };

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 200); // Delay to allow click
  };

  return (
    <div className="absolute top-16 right-5 mr-10 mt-4 z-50 bg-gray-800 text-white shadow-lg rounded-lg p-5">
      <button className="absolute top-2 right-4 text-gray-200 hover:text-gray-400" onClick={onClose}>
        &times;
      </button>
      <div className="flex flex-col items-center justify-center relative">
        <div
          className="relative mt-4 flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full text-white text-2xl cursor-pointer hover:bg-gray-600 hover:shadow-lg transition-transform transform hover:scale-110"
          tabIndex="0"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            username.charAt(0).toUpperCase()
          )}

          {showOptions && (
            <div className="absolute flex space-x-14 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <label
                htmlFor="profileImageUpload"
                className="block py-1 px-4 bg-blue-500 text-white text-xs rounded-full cursor-pointer hover:bg-blue-600"
              >
                Change 
              </label>
              <button
                className="block py-1 px-4 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                Remove 
              </button>
            </div>
          )}
        </div>
        <input
          id="profileImageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <h2 className="mt-3 text-lg">Hi, {username}!</h2>
      </div>
      <button
        className="mt-4 w-full py-2 px-4 text-sm text-blue-400 border border-white rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:shadow-xl transition-all duration-300"
        onClick={() => { /* Add logic for managing account */ }}
      >
        Manage your Account
      </button>
      <button
        className="mt-2 w-full py-2 px-4 text-sm text-red-400 bg-gray-950 rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:shadow-xl transition-all duration-300"
        onClick={handleSignOutClick}
      >
        Sign out
      </button>
    </div>
  );
}

export default UserMenu;
