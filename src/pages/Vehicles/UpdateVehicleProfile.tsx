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
import { FormCheck, FormInput, FormSelect, FormLabel, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import Litepicker from "../../base-components/Litepicker";
import Tippy from '../../base-components/Tippy';
import { UserContext } from '../../stores/UserContext';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import LoadingIcon from '../../base-components/LoadingIcon';
import TomSelect from "../../base-components/TomSelect";

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

export default function UpdateVehicleProfile() {

    const { user } = useContext(UserContext);


    const [vehicleList, setVehicleList] = useState<any[]>([]);

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const deleteButtonRef = useRef(null);
    const [dateRange, setDateRange] = useState<string>('');
    const [selectedLGA, setSelectedLGA] = useState<string>('');
    const [kpiData, setKpiData] = useState(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState("1");

    const isInitialMount = useRef(true);

console.log(vehicleList)

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
        

        <div className="flex items-center intro-y gap-x-2">
        <Lucide
                    icon="User"
                    className="w-6 h-6 text-slate-500 "
                  />       
                   <h2 className="mr-auto text-lg text-slate-500 font-medium">Edit Vehicle Details</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
       
        <div className="col-span-12 ">

            {/* Rider Information */}
            <div className="mt-5 intro-y text-slate-600">
            

            <div className="flex items-center py-4 text-primary">
                          <h3 className="intro-y box  font-semibold mr-4 text-sm ">
                            RIDER DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-primary/50" />
                        </div>

            <div className="py-5 ">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div>
                    <FormLabel htmlFor="update-profile-form-6">Email</FormLabel>
                    <FormInput
                      id="update-profile-form-6"
                      type="text"
                      placeholder="Input text"
                      value={fakerData[0].users[0].email}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-7">Name</FormLabel>
                    <FormInput
                      id="update-profile-form-7"
                      type="text"
                      placeholder="Input text"
                      value={fakerData[0].users[0].name}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-8">
                      ID Type
                    </FormLabel>
                    <FormSelect id="update-profile-form-8">
                      <option>IC</option>
                      <option>FIN</option>
                      <option>Passport</option>
                    </FormSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-9">
                      ID Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-9"
                      type="text"
                      placeholder="Input text"
                      value="357821204950001"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mt-3 xl:mt-0">
                    <FormLabel htmlFor="update-profile-form-10">
                      Phone Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-10"
                      type="text"
                      placeholder="Input text"
                      value="65570828"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-11">
                      Address
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-11"
                      type="text"
                      placeholder="Input text"
                      value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-12">
                      Bank Name
                    </FormLabel>
                    <TomSelect
                      id="update-profile-form-12"
                      value={select}
                      onChange={setSelect}
                      className="w-full"
                    >
                      <option value="1">SBI - STATE BANK OF INDIA</option>
                      <option value="2">CITI BANK - CITI BANK</option>
                    </TomSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-13">
                      Bank Account
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-13"
                      type="text"
                      placeholder="Input text"
                      value="DBS Current 011-903573-0"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mt-3 xl:mt-0">
                    <FormLabel htmlFor="update-profile-form-10">
                      Phone Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-10"
                      type="text"
                      placeholder="Input text"
                      value="65570828"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-11">
                      Address
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-11"
                      type="text"
                      placeholder="Input text"
                      value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-12">
                      Bank Name
                    </FormLabel>
                    <TomSelect
                      id="update-profile-form-12"
                      value={select}
                      onChange={setSelect}
                      className="w-full"
                    >
                      <option value="1">SBI - STATE BANK OF INDIA</option>
                      <option value="2">CITI BANK - CITI BANK</option>
                    </TomSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-13">
                      Bank Account
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-13"
                      type="text"
                      placeholder="Input text"
                      value="DBS Current 011-903573-0"
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
             
            </div>
          </div>
            {/* end ridwer info */}
          {/* BEGIN: Next of Kin  Information */}
          <div className="mt-5 intro-y text-slate-600 ">
            
             <div className="flex items-center py-4">
                          <h3 className="intro-y box  font-semibold mr-4 text-sm text-primary">
                            NEXT OF KIN DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-primary/50" />
                        </div>

            <div className="py-5">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div>
                    <FormLabel htmlFor="update-profile-form-6">Email</FormLabel>
                    <FormInput
                      id="update-profile-form-6"
                      type="text"
                      placeholder="Input text"
                      value={fakerData[0].users[0].email}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-7">Name</FormLabel>
                    <FormInput
                      id="update-profile-form-7"
                      type="text"
                      placeholder="Input text"
                      value={fakerData[0].users[0].name}
                      onChange={() => {}}
                      disabled
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-8">
                      ID Type
                    </FormLabel>
                    <FormSelect id="update-profile-form-8">
                      <option>IC</option>
                      <option>FIN</option>
                      <option>Passport</option>
                    </FormSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-9">
                      ID Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-9"
                      type="text"
                      placeholder="Input text"
                      value="357821204950001"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mt-3 xl:mt-0">
                    <FormLabel htmlFor="update-profile-form-10">
                      Phone Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-10"
                      type="text"
                      placeholder="Input text"
                      value="65570828"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-11">
                      Address
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-11"
                      type="text"
                      placeholder="Input text"
                      value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-12">
                      Bank Name
                    </FormLabel>
                    <TomSelect
                      id="update-profile-form-12"
                      value={select}
                      onChange={setSelect}
                      className="w-full"
                    >
                      <option value="1">SBI - STATE BANK OF INDIA</option>
                      <option value="2">CITI BANK - CITI BANK</option>
                    </TomSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-13">
                      Bank Account
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-13"
                      type="text"
                      placeholder="Input text"
                      value="DBS Current 011-903573-0"
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <div className="mt-3 xl:mt-0">
                    <FormLabel htmlFor="update-profile-form-10">
                      Phone Number
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-10"
                      type="text"
                      placeholder="Input text"
                      value="65570828"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-11">
                      Address
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-11"
                      type="text"
                      placeholder="Input text"
                      value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-12">
                      Bank Name
                    </FormLabel>
                    <TomSelect
                      id="update-profile-form-12"
                      value={select}
                      onChange={setSelect}
                      className="w-full"
                    >
                      <option value="1">SBI - STATE BANK OF INDIA</option>
                      <option value="2">CITI BANK - CITI BANK</option>
                    </TomSelect>
                  </div>
                  <div className="mt-3">
                    <FormLabel htmlFor="update-profile-form-13">
                      Bank Account
                    </FormLabel>
                    <FormInput
                      id="update-profile-form-13"
                      type="text"
                      placeholder="Input text"
                      value="DBS Current 011-903573-0"
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
           
            </div>
          </div>
          {/* END: Next of Kin  Information */}
          {/* BEGIN: Owners Information */}

          <div className="intro-y  lg:mt-5 text-slate-600">
          <div className="flex items-center py-4">
                          <h3 className="intro-y box  font-semibold mr-4 text-sm text-primary">
                           OWNER's DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-primary/50" />
                        </div>

            <div className="py-5">
              <div className="flex flex-col xl:flex-row">
                <div className="flex-1 mt-6 xl:mt-0">
                  <div className="grid grid-cols-12 gap-x-5">
                    <div className="col-span-12 2xl:col-span-6">
                      <div>
                        <FormLabel htmlFor="update-profile-form-1">
                          Display Name
                        </FormLabel>
                        <FormInput
                          id="update-profile-form-1"
                          type="text"
                          placeholder="Input text"
                          value={fakerData[0].users[0].name}
                          onChange={() => {}}
                          disabled
                        />
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="update-profile-form-2">
                          Nearest MRT Station
                        </FormLabel>
                        <TomSelect
                          id="update-profile-form-2"
                          value={select}
                          onChange={setSelect}
                          className="w-full"
                        >
                          <option value="1">Admiralty</option>
                          <option value="2">Aljunied</option>
                          <option value="3">Ang Mo Kio</option>
                          <option value="4">Bartley</option>
                          <option value="5">Beauty World</option>
                        </TomSelect>
                      </div>
                    </div>
                    <div className="col-span-12 2xl:col-span-6">
                      <div className="mt-3 2xl:mt-0">
                        <FormLabel htmlFor="update-profile-form-3">
                          Postal Code
                        </FormLabel>
                        <TomSelect
                          id="update-profile-form-3"
                          value={select}
                          onChange={setSelect}
                          className="w-full"
                        >
                          <option value="1">
                            018906 - 1 STRAITS BOULEVARD SINGA...
                          </option>
                          <option value="2">
                            018910 - 5A MARINA GARDENS DRIVE...
                          </option>
                          <option value="3">
                            018915 - 100A CENTRAL BOULEVARD...
                          </option>
                          <option value="4">
                            018925 - 21 PARK STREET MARINA...
                          </option>
                          <option value="5">
                            018926 - 23 PARK STREET MARINA...
                          </option>
                        </TomSelect>
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="update-profile-form-4">
                          Phone Number
                        </FormLabel>
                        <FormInput
                          id="update-profile-form-4"
                          type="text"
                          placeholder="Input text"
                          value="65570828"
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="mt-3">
                        <FormLabel htmlFor="update-profile-form-5">
                          Address
                        </FormLabel>
                        <FormTextarea
                          id="update-profile-form-5"
                          placeholder="Adress"
                          value="10 Anson Road, International Plaza, #10-11, 079903
                            Singapore, Singapore"
                          onChange={() => {}}
                        ></FormTextarea>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" type="button" className="w-20 mt-3">
                    Save
                  </Button>
                </div>
                <div className="mx-auto w-52 xl:mr-0 xl:ml-6">
                  <div className="p-5 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400">
                    <div className="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
                      <img
                        className="rounded-md"
                        alt="Midone Tailwind HTML Admin Template"
                        src={fakerData[0].photos[0]}
                      />
                      <Tippy
                        as="div"
                        content="Remove this profile photo?"
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                      >
                        <Lucide icon="X" className="w-4 h-4" />
                      </Tippy>
                    </div>
                    <div className="relative mx-auto mt-5 cursor-pointer">
                      <Button
                        variant="primary"
                        type="button"
                        className="w-full"
                      >
                        Change Photo
                      </Button>
                      <FormInput
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Owners  Personal Information */}
        </div>
      </div>

      </div>
    </div>
  </main>
</div>



    </>
  )
}
