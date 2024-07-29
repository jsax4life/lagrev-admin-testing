// src/components/Chip.tsx

import React from 'react';
import Lucide from '../base-components/Lucide';

interface ChipProps {
  label: string;
  icon:  any;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ icon, label, onDelete }) => {
  return (
    <div className="flex items-center justify-center px-3 py-1.5 bg-customColor/15 text-customColor rounded-lg m-1">
      
      <Lucide icon={icon} className="w-4 h-4 " />

      <span className='mx-2'>{label}</span>
      
      
      <button
        onClick={onDelete}
        className="  hover:bg-blue-800 text-customColor rounded-lg w-5 h-5 flex items-center justify-center"
      >
        &times;
      </button>
    </div>
  );
};

export default Chip;
