// src/components/FilterChips.tsx

import React from 'react';
import Chip from './Chip';

interface FilterChipsProps {
  lagosLGAs: string[];
  selectedLGA: string;
  selectedPark: string;
  selectedRole: string;
  selectedStatus: string;
  dateRange: string;
  onRemoveFilter: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedLGA,
  selectedPark,
  selectedRole,
  selectedStatus,
  dateRange,
  onRemoveFilter,
}) => {
  return (
    <div className="flex flex-wrap ">
      {selectedLGA && (
        <Chip label={`LGA: ${selectedLGA}`} onDelete={() => onRemoveFilter('LGA')} icon={'Home'}   />
      )}
      {selectedPark && (
        <Chip label={`Park: ${selectedPark}`} onDelete={() => onRemoveFilter('Park')} icon={'Cloud'}/>
      )}
      {dateRange && (
        <Chip label={`Date: ${dateRange}`} onDelete={() => onRemoveFilter('Date')} icon={'Calendar'} />
      )}
      {selectedRole && (
        <Chip label={`Role: ${selectedRole}`} onDelete={() => onRemoveFilter('Role')} icon={'User'} />
      )}
       {selectedStatus && (
        <Chip label={`Status: ${selectedStatus}`} onDelete={() => onRemoveFilter('Status')} icon={'Check'} />
      )}
    </div>
  );
};

export default FilterChips;

