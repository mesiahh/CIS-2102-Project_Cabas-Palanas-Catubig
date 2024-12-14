import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCurrency, currencies } from '../../context/CurrencyContext';

const SettingsModal = ({ onClose }) => {
  const { currency, setCurrency } = useCurrency();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleCurrencyChange = (e) => {
    setCurrency(currencies[e.target.value]);
  };

  const handleSave = () => {
    // Save settings to localStorage or your preferred storage method
    localStorage.setItem('settings', JSON.stringify({
      darkMode,
      notifications,
      currency: currency.code
    }));
    
    // Close the modal after saving
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-[#FFF5F1]'} rounded-lg p-6 w-[400px] relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-8 text-blue-600">Settings</h2>

          <div className="flex items-center justify-between mb-6">
            <span className="text-blue-600 font-medium">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-blue-600 font-medium">notification</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-blue-600 font-medium mb-2">Currency</label>
            <select
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={currency.code}
              onChange={handleCurrencyChange}
            >
              {Object.entries(currencies).map(([code, { symbol }]) => (
                <option key={code} value={code}>
                  {code} ({symbol})
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal; 