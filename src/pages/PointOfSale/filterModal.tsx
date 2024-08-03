import _ from "lodash";
import { useState, useRef, useEffect, useContext, Key } from "react";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab, Dialog } from "../../base-components/Headless";
import Litepicker from "../../base-components/Litepicker";

// Define props interface for the component
interface FilterModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  handleFilterChange: (type: string, value: string) => void;
  lagosLGAs: string[];
  carParks: string[];
  selectedLGA: string;
  setSelectedLGA: (lga: string) => void;
  selectedCarPark: string;
  setSelectedCarPark: (carPark: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  activeFilter: "LGA" | "Date" | "Park";
  setActiveFilter: (filter: "LGA" | "Date" | "Park") => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  setOpen,
  handleFilterChange,
  lagosLGAs,
  carParks,
  selectedLGA,
  setSelectedLGA,
  selectedCarPark,
  setSelectedCarPark,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  activeFilter,
}) => {
  // Temporary states for selections
  const [tempSelectedLGA, setTempSelectedLGA] = useState(selectedLGA);
  const [tempSelectedCarPark, setTempSelectedCarPark] =
    useState(selectedCarPark);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const sendButtonRef = useRef<HTMLButtonElement>(null);

  // Handle LGA filter apply
  const applyLGAFilter = () => {
    setSelectedLGA(tempSelectedLGA);
    handleFilterChange("LGA", tempSelectedLGA);
    setOpen(false);
  };

  // Handle Car Park filter apply
  const applyCarParkFilter = () => {
    setSelectedCarPark(tempSelectedCarPark);
    handleFilterChange("CarPark", tempSelectedCarPark);
    setOpen(false);
  };

  // Handle Date filter apply
  const applyDateFilter = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    handleFilterChange("Date", `${tempStartDate} - ${tempEndDate}`);
    setOpen(false);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      initialFocus={sendButtonRef}
      className="flex place-self-center lg:items-center lg:justify-center"
    >
      <Dialog.Panel className="">
        <Dialog.Title>
          <div className="flex justify-center items-center">
            <div className="bg-customColor/20 fill-customColor text-customColor mr-2 rounded-lg p-2">
              <Lucide
                icon={
                  activeFilter === "LGA"
                    ? "Home"
                    : activeFilter === "Park"
                    ? "Car"
                    : "Calendar"
                }
                className="w-5 h-5"
              />
             
            </div>
            <div className="">
              <h2 className="mr-auto text-slate-600 font-bold">
                {activeFilter === "LGA"
                  ? "Local Government Area (LGA)"
                  : activeFilter === "Park"
                  ? "Car Park"
                  : "Date Range"}
              </h2>
              <p className="text-xs text-slate-500">
                {activeFilter === "LGA"
                  ? "Choose an LGA to filter"
                  : activeFilter === "Park"
                  ? "Choose a Car Park to filter"
                  : "Choose a date range to filter"}
              </p>
            </div>
          </div>
        </Dialog.Title>

        <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
          {activeFilter === "LGA" ? (
            <div className="col-span-12 ">
              <FormLabel htmlFor="lga">Select LGA</FormLabel>
              <FormSelect
                id="lga"
                className=""
                onChange={(e) => {
                  const value = e.target.value;
                  setTempSelectedLGA(value); // Store the selected value temporarily
                }}
                value={tempSelectedLGA}
              >
                <option value="" disabled>
                  All LGA
                </option>
                {lagosLGAs.map((lga, index) => (
                  <option key={index} value={lga}>
                    {lga}
                  </option>
                ))}
              </FormSelect>
            </div>
          ) : activeFilter === "Park" ? (
            <div className="col-span-12 ">
              <FormLabel htmlFor="carPark">Select Car Park</FormLabel>
              <FormSelect
                id="carPark"
                className=""
                onChange={(e) => {
                  const value = e.target.value;
                  setTempSelectedCarPark(value); // Store the selected value temporarily
                }}
                value={tempSelectedCarPark}
              >
                <option value="" disabled>
                  All Car Parks
                </option>
                {carParks.map((carPark, index) => (
                  <option key={index} value={carPark}>
                    {carPark}
                  </option>
                ))}
              </FormSelect>
            </div>
          ) : (
            <>
              <div className="col-span-12 relative">
                <FormLabel htmlFor="modal-datepicker-1">Start Date</FormLabel>
                <Litepicker
                  id="modal-datepicker-1"
                  value={tempStartDate}
                  onChange={setTempStartDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                />
                <div className="absolute flex items-center justify-center w-8 h-8 right-0 bottom-1 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                  <Lucide icon="Calendar" className="w-4 h-4" />
                </div>
              </div>
              <div className="col-span-12 relative ">
                <FormLabel htmlFor="modal-datepicker-2">End Date</FormLabel>
                <Litepicker
                  id="modal-datepicker-2"
                  value={tempEndDate}
                  onChange={setTempEndDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                />
                <div className="absolute flex items-center justify-center w-8 h-8 right-0 bottom-1 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                  <Lucide icon="Calendar" className="w-4 h-4" />
                </div>
              </div>
            </>
          )}
        </Dialog.Description>

        <Dialog.Footer className="text-right">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleClose}
            className="w-20 mr-1 border-customColor text-customColor"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            className="lg:w-25 bg-customColor"
            ref={sendButtonRef}
            onClick={
              activeFilter === "LGA"
                ? applyLGAFilter
                : activeFilter === "Park"
                ? applyCarParkFilter
                : applyDateFilter
            }
          >
            Apply Filter
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  );
};

export default FilterModal;
