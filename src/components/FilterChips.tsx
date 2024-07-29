// src/components/FilterChips.tsx

import React from 'react';
import Chip from './Chip';

interface FilterChipsProps {
  lagosLGAs: string[];
  selectedLGA: string;
  selectedPark: string;
  dateRange: string;
  onRemoveFilter: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedLGA,
  selectedPark,
  dateRange,
  onRemoveFilter,
}) => {
  return (
    <div className="flex flex-wrap ">
      {selectedLGA && (
        <Chip label={`LGA: ${selectedLGA}`} onDelete={() => onRemoveFilter('LGA')} icon={'Cloud'}   />
      )}
      {selectedPark && (
        <Chip label={`Park: ${selectedPark}`} onDelete={() => onRemoveFilter('Park')} icon={'Cloud'}/>
      )}
      {dateRange && (
        <Chip label={`Date: ${dateRange}`} onDelete={() => onRemoveFilter('Date')} icon={'Calendar'} />
      )}
    </div>
  );
};

export default FilterChips;

