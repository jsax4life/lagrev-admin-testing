import { Fragment, JSXElementConstructor, ReactElement, ReactNode } from "react";
import _ from "lodash";
import { useState, useRef, useEffect, useContext, Key } from "react";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab, Dialog } from "../../base-components/Headless";
import Litepicker from "../../base-components/Litepicker";
import { UserContext } from "../../stores/UserContext";
import API from "../../utils/API";
import DashboardCard from "./DashboardCard";
import Progress from "../../base-components/Progress";
import { formatCurrency, formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import Chip from "../../components/Chip";
import FilterChips from "../../components/FilterChips";
import { date } from "yup";




interface Change {
  original: string | number | null;
  updated: string | number | null;
}

interface Changes {
  [section: string]: {
    [field: string]: Change;
  };
}

const lagosLGAs = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
];


// const activity = [
 
//   {
//     id: 2,
//     type: 'tags',
//     person: { name: 'Hilary Mahy', href: '#' },
//     tags: [
//       { name: 'Updated vehicle registration', href: '#', color: 'bg-rose-500' },
//       { name: 'Added new vehicle', href: '#', color: 'bg-indigo-500' },
//       { name: 'Deleted vehicle', href: '#', color: 'bg-green-500' },
//       { name: 'User logged in', href: '#', color: 'bg-orange-500' },
//       { name: 'User logged out', href: '#', color: 'bg-blue-500' },


//     ],
//     date: '6h ago',
//   },

//   {
//     id: 3,
//     type: 'tags',
//     person: { name: 'Hilary Mahy', href: '#' },
//     tags: [
//       { name: 'Updated vehicle registration', href: '#', color: 'bg-rose-500' },
//       { name: 'Added new vehicle', href: '#', color: 'bg-indigo-500' },
//       { name: 'Deleted vehicle', href: '#', color: 'bg-green-500' },
//       { name: 'User logged in', href: '#', color: 'bg-orange-500' },
//       { name: 'User logged out', href: '#', color: 'bg-blue-500' },


//     ],
//     date: '6h ago',
//   },

// ]

const tags = [
  { name: 'Updated vehicle registration', href: '#', color: 'bg-rose-500' },
  { name: 'User logged in', href: '#', color: 'bg-indigo-500' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Main() {
  const { user } = useContext(UserContext);

  const [dateRange, setDateRange] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [selectedLGA, setSelectedLGA] = useState<string>("");
  const [selectedPark, setSelectedPark] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpiData, setKpiData] = useState<any>(null);
  const [activitylogs, setActiviyLogs] = useState([]);
  const [datepickerModalPreview, setDatepickerModalPreview] = useState(false);
  const cancelButtonRef = useRef(null);
  const [showLgaSubMenu, setShowLgaSubMenu] = useState(false);
  const [showParkSubMenu, setShowParkSubMenu] = useState(false);
  const isInitialMount = useRef(true);


  useEffect(() => {
    if (user?.token) {
      fetchDashboardData();
    }
  }, [user?.token]);

  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;

    //   setDateRange("");
    //   return;
    // }

    fetchDashboardData();
  }, [dateRange, selectedLGA]);

  useEffect(() => {
    if (user?.token) {
      fetchKPIData();
    }
  }, [user?.token]);

  useEffect(() => {
    fetchActivityLogs();
  }, []);


  console.log(startDate, endDate)

  // const handleAddFilter = (filter: string, value: string) => {
  //   if (filter === 'LGA') setSelectedLGA(value);
  //   else if (filter === 'Park') setSelectedPark(value);
  //   else if (filter === 'Date') setDateRange(value);

  //   onFilterChange({
  //     lga: filter === 'LGA' ? value : selectedLGA,
  //     park: filter === 'Park' ? value : selectedPark,
  //     date: filter === 'Date' ? value : dateRange,
  //   });
  // };

  // const handleRemoveFilter = (filter: string) => {
  //   if (filter === 'LGA') setSelectedLGA('');
  //   else if (filter === 'Park') setSelectedPark('');
  //   else if (filter === 'Date') setDateRange('');

  //   onFilterChange({
  //     lga: filter === 'LGA' ? '' : selectedLGA,
  //     park: filter === 'Park' ? '' : selectedPark,
  //     date: filter === 'Date' ? '' : dateRange,
  //   });
  // };

    // Function to handle adding filters
    // const handleAddFilter = (filter: string, value: string) => {
    //   if (filter === 'LGA') {
    //     setSelectedLGA(value);
    //   } else if (filter === 'Park') {
    //     setSelectedPark(value);
    //   } else if (filter === 'Date') {
    //     setDateRange(value);
    //   }
  
    //   // Here you can add any logic to fetch or update data based on the new filters
    //   // For example, if you are fetching data, call your API here
    // };
  
    // Function to handle removing filters
    const handleRemoveFilter = (filter: string) => {
      if (filter === 'LGA') {
        setSelectedLGA('');
      } else if (filter === 'Park') {
        setSelectedPark('');
      } else if (filter === 'Date') {
        setDateRange('');
      }
  
      // Optionally update your data based on the filters being removed
    };
  
  // const handleFilterChange = (filters: { lga: string; park: string; date: string }) => {
  //   // Handle filter logic here
  //   setSelectedLGA(filters.lga);
  //   setSelectedPark(filters.park);
  //   setDateRange(filters.date);
  //   // Optionally fetch and update dashboard data based on filters
  // };



  // Function to handle filter changes
  const handleFilterChange = (filter: string, value: string) => {
    const newFilters = {
      lga: selectedLGA,
      park: selectedPark,
      date: dateRange,
    };

    if (filter === 'LGA') {
      setSelectedLGA(value);
      newFilters.lga = value;
    } else if (filter === 'Park') {
      setSelectedPark(value);
      newFilters.park = value;
    } else if (filter === 'Date') {
      setDateRange(value);
      newFilters.date = value;
    }

    // Call any logic to update data based on the new filters
    console.log('New Filters:', newFilters);

    // Update your data or perform actions here
  };

  const fetchKPIData = () => {
    setError("");

    console.log("hello");

    setLoading(true);

    API(
      "get",
      `registration-kpi`,
      {},

      function (response: any) {
        setKpiData(response);

        console.log(response);
        setLoading(false);
      },
      function (error: any) {
        console.error("Error fetching recent searches:", error);
        setLoading(false);
      },
      user?.token && user.token
    );
  };

  const fetchActivityLogs = () => {
    setError("");

    console.log("hello");

    setLoading(true);

    API(
      "get",
      'activity-logs',
      {},

      function (response: any) {
        setActiviyLogs(response);

        console.log(response);
        setLoading(false);
      },
      function (error: any) {
        console.error("Error fetching recent searches:", error);
        setLoading(false);
      },
      user?.token && user.token
    );
  };

  // useEffect(() => {
  //   if (user?.token) {
  //     fetchDashboardData();
  //   }
  // }, [user?.token]);

  // useEffect(() => {

  //     fetchDashboardData();
  // }, [  dateRange, selectedLGA ]);

  const fetchDashboardData = () => {
    const [startDate, endDate] = dateRange?.split(" - ") || [null, null];

    setError("");

    const params: any = {};
    if (selectedLGA) params.lga = selectedLGA;
    if (startDate && endDate) {
      params.start_date = startDate.trim();
      params.end_date = endDate.trim();
    }

    API(
      "get",
      `dashboard-analytics`,
      params,
      function (dashboardData: any) {
        setDashboardData(dashboardData);
        setLoading(false);
      },
      function (error: any) {
        console.error("Error fetching recent searches:", error);
        setLoading(false);
      },
      user?.token && user.token
    );
  };

  // const formatChanges = (changes: Changes): string => {
  //   let formattedChanges = '';
  
  //   Object.entries(changes).forEach(([section, fields]) => {
  //     Object.entries(fields).forEach(([field, values]) => {
  //       if (field !== 'updated_at') { // Optional: skip 'updated_at' field
  //         formattedChanges += `${section.toUpperCase()} - ${field}: ${values.original} -> ${values.updated}\n`;
  //       }
  //     });
  //   });
  
  //   return formattedChanges;
  // };

 

  // const formatChanges = (changes: string): JSX.Element => {
  //   const changeElements: JSX.Element[] = [];
  
  //   try {
  //     // Parse the changes JSON string into an object
  //     const parsedChanges: Changes = JSON.parse(changes);
  
  //     // Iterate over the parsed object
  //     Object.entries(parsedChanges).forEach(([section, fields]) => {
  //       if (fields && typeof fields === 'object') {
  //         Object.entries(fields).forEach(([field, values]) => {
  //           if (values && typeof values === 'object' && 'original' in values && 'updated' in values) {
  //             if (field !== 'updated_at') { // Optional: skip 'updated_at' field
  //               changeElements.push(
  //                 <div key={`${section}-${field}`} className=" inline-flex items-center   text-xs  truncate">
  //                   <span className="">
  //                     {section.toUpperCase()} - {field}: {values.original} -{">"} {values.updated}
  //                   </span>
  //                   <span
  //                     className='bg-orange-600 h-1.5 w-1.5 rounded-full inline-block mx-2'
  //                     aria-hidden="true"
  //                   />
  //                 </div>
  //               );
  //             }
  //           }
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error parsing changes:', error);
  //   }
  
  //   return <>{changeElements}</>;
  // };
  
  const formatChanges = (changes: string | null | undefined): JSX.Element => {
    const changeElements: JSX.Element[] = [];
  
    // Check if changes is a valid non-empty string
    if (typeof changes !== 'string' || changes.trim() === '') {
      console.error('Invalid changes input: The input is not a valid string.');
      return <>{changeElements}</>; // Return empty if input is invalid
    }
  
    try {
      // Parse the changes JSON string into an object
      const parsedChanges: Changes = JSON.parse(changes);
  
      // Iterate over the parsed object
      Object.entries(parsedChanges).forEach(([section, fields]) => {
        if (fields && typeof fields === 'object') {
          Object.entries(fields).forEach(([field, values]) => {
            if (
              values &&
              typeof values === 'object' &&
              'original' in values &&
              'updated' in values
            ) {
              if (field !== 'updated_at') {
                // Optional: skip 'updated_at' field
                changeElements.push(
                  <div key={`${section}-${field}`} className=" inline-flex items-center   text-xs  truncate">
                  <span className="">
                    {section.toUpperCase()} - {field}: {values.original} -{">"} {values.updated}
                  </span>
                  <span
                    className='bg-orange-600 h-1.5 w-1.5 rounded-full inline-block mx-2'
                    aria-hidden="true"
                  />
                </div>
                  

                  
                );
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Error parsing changes:', error);
    }
  
    return <>{changeElements}</>;
  };

  // const formatChanges = (changes: string): JSX.Element => {
  //   const changeElements: JSX.Element[] = [];
  
  //   try {
  //     const parsedChanges: Changes = JSON.parse(changes);
  
  //     Object.entries(parsedChanges).forEach(([section, fields]) => {
  //       if (fields && typeof fields === 'object') {
  //         Object.entries(fields).forEach(([field, values]) => {
  //           if (values && typeof values === 'object' && 'original' in values && 'updated' in values) {
  //             if (field !== 'updated_at') { // Optional: skip 'updated_at' field
  //               changeElements.push(
  //                 <div key={`${section}-${field}`}>
  //                   {section.toUpperCase()} - {field}: {values.original} 
  //                   <span className='bg-orange-600 h-1.5 w-1.5 rounded-full inline-block mx-2' aria-hidden="true" />
  //                   {values.updated}
  //                 </div>
  //               );
  //             }
  //           }
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error parsing changes:', error);
  //   }
  
  //   return <>{changeElements}</>;
  // };

  return (
    <div className="bg-secondary">
      <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0 intro-y   px-2 lg:px-[22px] py-8  ">

      <div className="col-span-12 justify-start items-center flex  intro-y sm:flex">
              







 <Dialog
                      open={datepickerModalPreview}
                      onClose={() => {
                        setDatepickerModalPreview(false);
                      }}
                      initialFocus={cancelButtonRef}
                      className="flex place-self-center lg:items-center lg:justify-center  "

                    >
                      <Dialog.Panel className='  ">
'>
                        {/* BEGIN: Modal Header */}
                        <Dialog.Title>
                       
                       <div className="flex justify-center items-center">
<div className="bg-customColor/20 fill-customColor text-customColor mr-2 rounded-lg p-1.5">
<Lucide icon="Calendar" className="w-6 h-6 " />

</div>
<div className="">
<h2 className="mr-auto text-slate-600 font-bold">
   Date Range
 </h2>
 <p className="text-xs">Choose a date range to filter</p>
</div>
                       </div>
                        
                         
                        </Dialog.Title>
                        {/* END: Modal Header */}
                        {/* BEGIN: Modal Body */}
                        <Dialog.Description className="grid grid-cols-12 gap-x gap-y-6">
                          <div className="col-span-12 relative">
                            <FormLabel htmlFor="modal-datepicker-1">
                              Start Date
                            </FormLabel>
                            <Litepicker
                              id="modal-datepicker-1"
                              value={startDate}
                              onChange={setStartDate}
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
                           <div className="absolute flex items-center justify-center w-8  h-8 right-0 bottom-1  text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
        <Lucide icon="Calendar" className="w-4 h-4" />
    </div>
                          </div>
                          <div className="col-span-12 relative ">
                            <FormLabel htmlFor="modal-datepicker-2">
                              End Date
                            </FormLabel>
                            <Litepicker
                              id="modal-datepicker-2"
                              value={endDate}
                              onChange={setEndDate}
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

<div className="absolute flex items-center justify-center w-8  h-8 right-0 bottom-1  text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
        <Lucide icon="Calendar" className="w-4 h-4" />
    </div>
                          </div>
                        </Dialog.Description>
                        {/* END: Modal Body */}
                        {/* BEGIN: Modal Footer */}
                        <Dialog.Footer className="text-right">
                          <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => {
                              setDatepickerModalPreview(false);
                            }}
                            className="w-20 mr-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            // variant="primary"
                            type="button"
                            className="w-autos bg-customColor text-secondary"
                            ref={cancelButtonRef}
                            onClick={() => {
                              setDateRange(`${startDate}-${endDate}`)
                              // const dateString = date.toString(); // Convert date object to string
                              // handleAddFilter('Date', dateString);
                              handleFilterChange('Date', `${startDate} - ${endDate}`);
                              setDatepickerModalPreview(false);

            
                            }}

                          >
                            Apply Filter
                          </Button>
                        </Dialog.Footer>
                        {/* END: Modal Footer */}
                      </Dialog.Panel>
                    </Dialog>

<Menu className="text-xs mr-2">
    <Menu.Button as={Button} className="bg-customColor text-secondary" >
    <Lucide icon="Filter" className="w-4 h-4 mr-2" />

        Filter
        <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
    </Menu.Button>
    <Menu.Items className="w-40 text-xs">
    <Menu.Header className="">Filter Categories</Menu.Header>

        {/* <Menu.Item>
            <Lucide icon="Home" className="w-4 h-4 mr-2" />
            LGA

            <Lucide icon="ChevronRight" className="w-4 h-4 ml-auto" />

        </Menu.Item> */}

<Menu.Item
              onClick={() => setShowLgaSubMenu(!showLgaSubMenu)}

>
           
              <Lucide icon="Home" className="w-4 h-4 mr-2" />
              LGA
              <Lucide icon="ChevronRight" className="w-4 h-4 ml-auto" />
        </Menu.Item> 

            {/* LGA Submenu */}
            {showLgaSubMenu && (
                        <Menu.Items className="lg:w-60 w-40 overflow-y-scroll h-72" placement="right-start">

              {lagosLGAs.map((lga, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div
                    className={`flex items-center px-8 cursor-pointer ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    {lga}
                  </div>
                )}
              </Menu.Item>
            ))}



            </Menu.Items >
        )}


        <Menu.Item>
            <Lucide icon="Cloud" className="w-4 h-4 mr-2" />
            Park

            <Lucide icon="ChevronRight" className="w-4 h-4 ml-auto" />

        </Menu.Item>
        <Menu.Item
         onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setDatepickerModalPreview(true);
        }}
        >
            <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
            Date
            <Lucide icon="ChevronRight" className="w-4 h-4 ml-auto" />

        </Menu.Item>
       
    </Menu.Items>
</Menu>

<FilterChips
          lagosLGAs={lagosLGAs}
          selectedLGA={selectedLGA}
          selectedPark={selectedPark}
          dateRange={dateRange}
          onRemoveFilter={handleRemoveFilter}
        />
                
              </div>

        {/* <div className="col-span-12 intro-y text-black mb-8 bg-secondary p-2">


        <FilterChips
          lagosLGAs={lagosLGAs}
          selectedLGA={selectedLGA}
          selectedPark={selectedPark}
          dateRange={dateRange}
          onRemoveFilter={handleRemoveFilter}
        />
        

          <div className="flex flex-col lg:flex-row w-full gap-y-2 text-primary">
            <div className="relative lg:w-1/4 w-full text-slate-500">
              <FormInput
                type="text"
                className="pr-10 !box"
                placeholder="Search database..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>

           
          

            <FormSelect
              className="w-48 lg:ml-2 lg:w-1/5 !box mr-2"
              // onChange={(e) => setSelectedLGA(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                // handleAddFilter('LGA', value);
                handleFilterChange('LGA', value);

              }}
              value={selectedLGA}
              // onChange={(e) => {
              //   const value = e.target.value;
              //   setSelectedLGA(value);
              //   handleFilterChange({ lga: value, park: selectedPark, date: dateRange });
              // }}
            >
              <option value="" disabled>
                --All LGA--
              </option>
              {lagosLGAs.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))}
            </FormSelect>

            <FormSelect className="w-48  lg:w-1/5 !box mr-2"
             onChange={(e) => {
              const value = e.target.value;
              // handleAddFilter('Park', value);
              handleFilterChange('Park', value);

            }}
            value={selectedPark}
            >
              <option>All Parks</option>
              <option>Active</option>
              <option>Removed</option>
            </FormSelect>

            <div className="relative sm:mt-0 text-slate-500">
              <Lucide
                icon="Calendar"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                placeholder="Select a date range"
                // value={dateRange}
                // onChange={setDateRange}
                onChange={(date) => {
                  setDateRange
                  const dateString = date.toString(); // Convert date object to string
                  // handleAddFilter('Date', dateString);
                  handleFilterChange('Date', dateString);

                }}

                options={{
                  startDate: "",
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 2023,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="pl-10 sm:w-56 !box text-slate-500"
              />
            </div>
          </div>
        </div> */}

        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <DashboardCard
              count={dashboardData?.daily_registered_vehicles}
              label="Daily Registered Vehicles"
              bgColor="bg-orange-200"
              iconFill="primary"
              iconText="text-primary"
            />
            <DashboardCard
              count={dashboardData?.daily_untagged_vehicles}
              label="Daily Untagged Vehicles"
              bgColor="bg-orange-200"
              iconFill="orange"
              iconText="text-orange-300"
            />
            <DashboardCard
              count={dashboardData?.daily_tagged_vehicles}
              label="Daily Tagged Vehicles"
              bgColor="bg-pink-200"
              iconFill="pink"
              iconText="text-pink-600"
            />
            <DashboardCard
              count={dashboardData?.total_registered_vehicles}
              label="Total Registered Vehicles"
              bgColor="bg-green-200"
              iconFill="green"
              iconText=""
            />
            <DashboardCard
              count={dashboardData?.total_untagged_vehicles}
              label="Total Untagged Vehicles"
              bgColor="bg-slate-200"
              iconFill="quinary"
              iconText=""
            />
            <DashboardCard
              count={dashboardData?.total_tagged_vehicles}
              label="Total Tagged Vehicles"
              bgColor="bg-blue-200"
              iconFill="blue"
              iconText=""
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-4 cursor-pointer box zoom-in flex">
              <div
                className={`flex mr-4 items-center justify-center rounded-md bg-green-200 w-10 h-10`}
              >
                <Lucide
                  icon="Banknote"
                  fill="green"
                  className={`p-1 w-[40px] h-[38px] text-green`}
                />
              </div>
              <div>
                <div className="text-base font-medium ">
                  N
                  {formatCurrency(
                    dashboardData?.daily_registered_vehicles * 4500
                  )}
                </div>
                <div className="text-slate-500 text-xs">
                  Daily Registration Fee
                </div>
              </div>
            </div>

            <div className="col-span-12 p-4 cursor-pointer  box zoom-in flex">
              <div
                className={`flex mr-4 items-center justify-center rounded-md bg-green-200 w-10 h-10`}
              >
                <Lucide
                  icon="Banknote"
                  fill="green"
                  className={`p-1 w-[38px] h-[38px] text-green`}
                />
              </div>
              <div>
                <div className="text-base font-medium">
                  N
                  {formatCurrency(
                    dashboardData?.total_registered_vehicles * 4500
                  )}
                </div>
                <div className="text-slate-500 text-xs">
                  Total Registration Fee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y px-5">
        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-5 cursor-pointer  box">




            <div className="flow-root overflow-y-auto h-72">
              <h2 className="text-lg mb-4">Activity Log</h2>
              <div className="flex mb-4 items-center">   <Lucide icon="ArrowUp" className="h-5 w-5 text-green-600"  /> <p className="text-xs text-slate-500">15% this month</p> </div>
      <ul role="list" className="-mb-8">
        {activitylogs.map((activityItem: any, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activitylogs.length - 1 ? (
                <span className="absolute top-3 left-2 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                
                  <>
                    <div>
                    <div className="relative px-1">
                        <div className="h-2 w-2  bg-purple-800 rounded-full ring-4 ring-white flex items-center justify-center">
                        {/* <Lucide icon="Activity" className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm  text-gray-500">
                        <span className="mr-2">
                          <Link to={activityItem.admin.id} className="font-medium text-gray-900">
                            {activityItem.action}
                          </Link>
                        </span>
                      
                        <span className="whitespace-nowrap"> {formatDate(activityItem.created_at)}</span>

                            <div className="mr-0.5">
                            <span className="mr-2">{activityItem.admin.firstName} {activityItem.admin.lastName }</span>

                            <span
                      className='bg-slate-400 h-1.5 w-1.5 rounded-full inline-block '
                      aria-hidden="true"
                    />

                                <span className="ml-3  text-slate-500">{ formatChanges(activityItem.changes)}</span>
     
                       
                                                    <span className="mr-2 text-xs">{activityItem.admin.name}</span>
                        </div> 
                      </div>
                    </div>
                  </>
                
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>





             
            </div>
          
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-4 cursor-pointer  box zoom-in">
              <div className="">
                <div className="mr-auto text-xs">Project Target</div>

                <div className="flex mt-4">
                  <div className="mr-auto text-xl font-bold text-purple-500">
                    {kpiData?.total_registrations}
                    <span className="text-slate-700 font-normal text-sm">
                      {` (${kpiData?.percentage_achieved}%)`}
                    </span>
                  </div>
                  <div className="text-xl font-bold">60,000</div>
                </div>
              

<Progress className="h-1 mt-2">
        <Progress.Bar
          className="bg-purple-500"
          role="progressbar"
          aria-valuenow={kpiData?.percentage_achieved}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${kpiData?.percentage_achieved}%` }}
        ></Progress.Bar>
      </Progress>
                
              </div>
            </div>
            <div className="col-span-12 p-4 cursor-pointer  box zoom-in">
              <div className="text-base font-medium">Top Performing LGAs</div>
              <div className="text-slate-500">
                Total vehicles successfully registered on Lagrev
              </div>
{kpiData?.top_performing_lgas.map((top_performing_lga: any, index: Key | null | undefined) => (

<div className="box mt-4 p-4" key={index}>
<div className="mr-auto text-xs">{top_performing_lga.registered_lga} LGA</div>

<div className="flex mt-2">
  <div className="mr-auto text-xl font-bold text-slate-500">
    {top_performing_lga?.total}
  </div>
  <div className="text-xs">
  {` (${top_performing_lga?.percentage}%)`}
  
  </div>
</div>

  <Progress className="h-1 mt-2">
<Progress.Bar
className="bg-purple-500"
role="progressbar"
aria-valuenow={kpiData?.lga_contribution_percentage}
aria-valuemin={0}
aria-valuemax={100}
style={{ width: `${kpiData?.lga_contribution_percentage}%` }}
></Progress.Bar>
</Progress>
</div>


))}

            
            </div>
            {/* <div className="col-span-12 p-4 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
            <div className="col-span-12 p-4 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
