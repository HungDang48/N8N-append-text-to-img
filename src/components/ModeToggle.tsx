import React from 'react';

interface ModeToggleProps {
  isDeveloperMode: boolean;
  onToggle: () => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isDeveloperMode, onToggle }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="flex space-x-1">
          <button
            onClick={onToggle}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              !isDeveloperMode
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User Mode
          </button>
          <button
            onClick={onToggle}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              isDeveloperMode
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Developer Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeToggle; 