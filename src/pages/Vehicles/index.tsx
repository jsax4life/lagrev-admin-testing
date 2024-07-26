/* This example requires Tailwind CSS v2.0+ */
import { Fragment, Key, useContext, useEffect } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import _ from "lodash";
import clsx from "clsx";
import { useState, useRef } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import Litepicker from "../../base-components/Litepicker";
import Tippy from '../../base-components/Tippy';
import { UserContext } from '../../stores/UserContext';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '../../base-components/LoadingIcon';

const lagosLGAs = [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
    "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
    "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
    "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
  ];

  const tagStyle = [
    "bg-orange-100 text-orange-600",
    "bg-green-100 text-green-600",
  ];

export default function Main() {

    const { user } = useContext(UserContext);


    const [vehicleList, setVehicleList] = useState<any[]>([]);

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const deleteButtonRef = useRef(null);
    const [dateRange, setDateRange] = useState<string>('');
    const [selectedLGA, setSelectedLGA] = useState<string>('');
    const [kpiData, setKpiData] = useState(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const isInitialMount = useRef(true);

// console.log(vehicleList)

const navigate = useNavigate();


useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // console.log('true')

        setDateRange('')
      return;

    }

    
      fetchDashboardData();
    
  }, [dateRange, selectedLGA]);

    useEffect(() => {
        if (user?.token) {
          fetchDashboardData();
        }
      }, [user?.token ]);
    
   
     

    
      const fetchDashboardData = () => {
        const [startDate, endDate] = dateRange?.split(' - ') || [null, null];
    
        setError("");
        setLoading(true);
        
        const params: any = {};
        if (selectedLGA) params.lga = selectedLGA;
        if (startDate && endDate) {
          params.start_date = startDate.trim();
          params.end_date = endDate.trim();
        }
    
        API(
          "get",
          `vehicle-data`,
          params,
          // {lga: 'Alimosho'},
          function (vehicleListData: any) {
            setVehicleList(vehicleListData.registered_vehicles);
            setLoading(false);
          },
          function (error: any) {
            console.error("Error fetching recent searches:", error);
            setLoading(false);
          },
          user?.token && user.token
        );
      };
    

     


  
  return (
    <>
   



      <div className="min-h-full">
  <div className="bg-gradient-to-r from-primary via-purple-800 to-primary pb-32">
    <header className="py-5">
      {/* Header content */}
    </header>
  </div>

  <main className="-mt-32">
    <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">

        {/* Content Section */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-black intro-y">Vehicles</h2>
            <p className="mt-4 text-xs text-black intro-y">View, Edit and Delete Vehicle</p>
          </div>
          <Button variant="secondary" className="mr-2 shadow-sm">
            <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export As Excel Document
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y text-black mb-8 bg-secondary p-2">
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

        

            {/* <FormSelect className="w-48 xl:w-1/5 !box mr-4">
              <option value="" disabled>--All LGA--</option>
              {lagosLGAs.map((lga, index) => (
                <option key={index} value={lga}>{lga}</option>
              ))}
            </FormSelect> */}

            <FormSelect className="w-48 lg:ml-2 lg:w-1/5 !box mr-2" onChange={(e) => setSelectedLGA(e.target.value)}>
              <option value="" disabled>--All LGA--</option>
              {lagosLGAs.map((lga, index) => (
                <option key={index} value={lga}>{lga}</option>
              ))}
            </FormSelect>

            <FormSelect className="w-48  lg:w-1/5 !box mr-2">
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
              title='testing'
            
                value={dateRange}
                onChange={setDateRange}
                placeholder='Pick a date range'
                options={{
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
        </div>

          {/* Data List or Loading Indicator */}
          {loading ? (
            <div className="col-span-12 flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center w-full">
                <LoadingIcon icon="bars" className="w-8 h-8" />
                <div className="mt-2 text-xs text-center">Loading data</div>
              </div>
            </div>
          ) : (
            <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
              {/* Your table or data list */}
              {/* Render your vehicleList here */}



              <Table className="border-spacing-y-[2px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Sn
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  DRIVER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PLATE NUMBER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                PHONE NUMBER

                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                    VIN                
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    STATUS                
                </Table.Th>
                {/* <Table.Th className="text-right border-b-0 whitespace-nowrap">
                  <div className="pr-16">TOTAL TRANSACTION</div>
                </Table.Th> */}
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTION
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
          
          {
              vehicleList.map((vehicle: any, vehicleKey: any | null | undefined) => (
                <Table.Tr key={vehicleKey} className="intro-x text-slate-600">
                 
                  <Table.Td className=" first:rounded-l-md last:rounded-r-md w-10  bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] ">
                    <div
                      className=" whitespace-nowrap"
                    >
                      {vehicleKey + 1}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md  bg-white border-b-0 dark:bg-darkmode-600  shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center" onClick={() => navigate(`/profile/${vehicle.id}`)}>
                      <div className="w-9 h-9 image-fit zoom-in">
                        <Tippy
                          as="img"
                          
                          alt="Profile"
                          className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={vehicle?.rider?.profile_picture_url}
                          content={`Uploaded at ${vehicle.created_at}`}
                        />
                      </div>
                      <div className="ml-4">
                        <a href="" className="font-medium whitespace-nowrap">
                          {vehicle?.rider?.first_name} {vehicle?.rider?.last_name }
                        </a>
                        {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {vehicle?.rider?.phone}
                        </div> */}
                      </div>
                    </div>
                  </Table.Td>


                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span  className="font-medium whitespace-nowrap ">
{vehicle?.plate_number? vehicle?.plate_number : '------'}
                    </span>
                    
                  
                  </Table.Td>
                  
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                   
                      <>
                        <div className="whitespace-nowrap">


                        {vehicle?.rider?.phone}
</div>
                       
                      </>
                  
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40  bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="pr-16">{vehicle?.vin ? vehicle?.vin : '------'}</div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span
                      className=
 {`items-center px-2 lg:py-1 rounded-full text-xs font-medium capitalize ${
    tagStyle[vehicle?.tagged]
  }`}
                         
                    >
                            {vehicle?.tagged ? "tagged" : "Registered "}
                    </span>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <button
                        className="flex items-center  text-primary whitespace-nowrap"
                        onClick={() => navigate(`/profile/${vehicle.id}`)}

                      >
                        {/* <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "} */}
                        View Profile
                      </button>
                   
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          

            </Table.Tbody>
          </Table>



            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
            {/* Pagination component */}
            <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
          </div>

          {/* Delete Confirmation Modal */}
          <Dialog
            open={deleteConfirmationModal}
            onClose={() => setDeleteConfirmationModal(false)}
            initialFocus={deleteButtonRef}
          >
            {/* Dialog content */}
          </Dialog>
        </div>
      </div>
    </div>
  </main>
</div>



    </>
  )
}
