/* This example requires Tailwind CSS v2.0+ */
import { Fragment, JSXElementConstructor, ReactElement, ReactNode, useContext, useEffect } from "react";

// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import _ from "lodash";
import clsx from "clsx";
import { useState, useRef } from "react";
import fakerData from "../../utils/faker";

import { Dialog, Menu, Tab } from "../../base-components/Headless";

import { UserContext } from "../../stores/UserContext";
import API from "../../utils/API";
import Tippy from "../../base-components/Tippy";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { formatDate } from "../../utils/utils";

const tagStyle = [
  "bg-orange-100 text-orange-600",
  "bg-green-100 text-green-600",
];



type UserRoleKey = 'registration_officer' | 'attachment_officer' | 'operation_officer';

interface ActivityItem {
  user_role: UserRoleKey;
  // other fields...
}

const userRole: Record<UserRoleKey, any> = {
  registration_officer: 'Registration Officer',
  attachment_officer: 'Attachment Officer',
  operation_officer: 'Operation Officer',
};

const activityItem: ActivityItem = {
  user_role: 'registration_officer',
  // other fields...
};

// const activity = [
//     {
//       id: 1,
//       type: 'assignment',
//       person: { name: 'Eduardo Benz', href: '#' },
//       // imageUrl:
//       //   'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//       comment:
//         'Lorem ipsum dolor sit amet, ',
//       date: '6d ago',
//     },
//     {
//       id: 2,
//       type: 'assignment',
//       person: { name: 'Hilary Mahy', href: '#' },
//       assigned: { name: 'Kristin Watson', href: '#' },
//       date: '2d ago',
//     },
//     {
//       id: 3,
//       type: 'tags',
//       person: { name: 'Hilary Mahy', href: '#' },
//       tags: [
//         { name: 'Bug', href: '#', color: 'bg-rose-500' },
//         { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
//       ],
//       date: '6h ago',
//     },
//     {
//       id: 4,
//       type: 'assignment',
//       person: { name: 'Jason Meyers', href: '#' },
//       // imageUrl:
//       //   'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//       comment:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
//       date: '2h ago',
//     },
//   ]

export default function ProfileDetails() {
  const { user } = useContext(UserContext);

  const { id } = useParams<{ id: string }>();
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);

  

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isInitialMount = useRef(true);

  const navigate = useNavigate();

console.log(vehicleDetails);
  

  useEffect(() => {
    if (user?.token) {
        fetchVehicleData();
    }
  }, [user?.token]);

  const { rider, owner, user_activity_logs } = vehicleDetails ?? {};

  // const user_activity_logs: any[] =[];

  const isNull = 'Unavailable';

  const fetchVehicleData = () => {

    setError("");


    API(
      "get",

      `vehicle-details/${id}`, // Make sure your backend API endpoint is correct
      {},

      // {lga: 'Alimosho'},
      function (vehicleData: any) {
        setVehicleDetails(vehicleData);
        setLoading(false);
      },
      function (error: any) {
        console.error("Error fetching recent searches:", error);
        setLoading(false);
      },
      user?.token && user.token
    );
  };



  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gradient-to-r from-primary via-purple-800 to-primary pb-32">
          <header className="py-5"></header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}

            <div className="bg-white rounded-lg shadow px-2 py-6 sm:px-6">
              {/* content */}

              <Tab.Group>
                {/* BEGIN: Profile Info */}
                <div className=" pt-5  intro-y box">
                  <div className="flex flex-col pb-5 -mx-5  lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex justify-center items-center lg:hidden mb-4">

<Button variant="primary" className="mr-2 shadow-sm px-2" onClick={() => {
              navigate(`/update-profile/${id}`);
            }}>Edit</Button>

                      <Button variant="secondary" className="mr-2 shadow-sm">
            <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export As Excel Document
          </Button>
</div>
                    <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
         
                      <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                        <img
                          alt="Profile pix"
                          className="rounded-lg"
                          src={rider?.profile_picture_url}
                        />
                      </div>
                      <div className="ml-5 mr-auto">
                        <div
                          className={`w-1/2 text-center px-2 lg:py-1 py-0.5 mb-2 rounded-full text-xs font-medium capitalize ${
                            tagStyle[vehicleDetails?.tagged]
                          }`}
                        >
                          {vehicleDetails?.tagged ? "tagged" : "Registered"}
                        </div>
                        <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                          {rider?.first_name} {rider?.last_name}
                        </div>
                        <div className="text-slate-500">
                          <span className="font-semibold text-md">
                            {" "}
                            Phone Number:
                          </span>{" "}
                          <span>{rider?.phone}</span>
                        </div>
                      </div>
<div className="lg:flex hidden ">

<Button variant="primary" className="mr-2 shadow-sm px-4" onClick={() => {
              navigate(`/update-profile/${id}`);
            }}>Edit</Button>

                      <Button variant="secondary" className="mr-2 shadow-sm">
            <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export As Excel Document
          </Button>
</div>
                    </div>
                  </div>
                  <Tab.List
                    variant="link-tabs"
                    className="flex-col justify-center text-center sm:flex-row lg:justify-start"
                  >
                    <Tab fullWidth={false}>
                      <Tab.Button className="flex items-center cursor-pointer">
                        {/* <Lucide icon="User" className="w-4 h-4 mr-2" />  */}
                        Driver Overview
                      </Tab.Button>
                    </Tab>
                    <Tab fullWidth={false}>
                      <Tab.Button className="flex items-center  cursor-pointer">
                        {/* <Lucide icon="Shield" className="w-4 h-4 mr-2" /> */}
                        Vehicle Details
                      </Tab.Button>
                    </Tab>
                    <Tab fullWidth={false}>
                      <Tab.Button className="flex items-center  cursor-pointer">
                        {/* <Lucide icon="Lock" className="w-4 h-4 mr-2" />  */}
                        Vehicle Activity
                      </Tab.Button>
                    </Tab>
                  </Tab.List>
                </div>
                {/* END: Profile Info */}
                <Tab.Panels className="mt-5">
                  <Tab.Panel>
                    <div className="grid grid-cols-12 gap-6 text-slate-600">
                      {/* BEGIN: Rider Details */}
                      <div className="col-span-12 intro-y  ">
                        <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-md">
                          <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                            <div className="font-semibold ">Nin</div>
                            <div className="font-semibold ">Age:</div>
                            <div className="font-semibold ">Gender:</div>
                            <div className="font-semibold ">LGA</div>
                            <div className="font-semibold ">
                              Park/Zone
                            </div>
                            <div className="font-semibold ">
                              Home Address
                            </div>
                          </div>
                          <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2 ">
                            <div className="">**************</div>

                            <div className="">{rider?.age}</div>
                            <div className="">
                              {rider?.gender === "f" ? "Female" : "Male"}
                            </div>

                            <div className="">{rider?.lga}</div>
                            <div className="">{rider?.parkzone}</div>
                            <div className="">{rider?.home_address}</div>
                          </div>
                        </div>
                      </div>
                      {/* END: Rider Details */}

                      {/* BEGIN: Next of Kin  */}
                      <div className="col-span-12 intro-y  text-md ">
                        <div className="flex items-center py-4">
                          <h3 className="intro-y box  font-semibold mr-4 text-sm text-primary">
                            NEXT OF KIN DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-slate-200/" />
                        </div>
                        <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                          <div className=" flex flex-col no-wrap items-start  space-y-2 mb-5 ">
                            <div className="font-semibold ">First Name:</div>
                            <div className="font-semibold ">Last Name:</div>
                            <div className="font-semibold ">Relationship:</div>
                            <div className="font-semibold ">Phone Number:</div>

                            <div className="font-semibold ">Home Address</div>
                          </div>
                          <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2 ">
                            <div className="">
                              {rider?.next_of_kin?.first_name}
                            </div>

                            <div className="">
                              {rider?.next_of_kin?.last_name}
                            </div>
                            <div className="">
                              {rider?.next_of_kin?.relationship}
                            </div>

                            <div className="">
                              {rider?.next_of_kin?.phone}
                            </div>
                            <div className="">
                              {rider?.next_of_kin?.home_address}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* END: Next of Kin  */}

                      {/* BEGIN: Ownser's  */}

                      <div className="col-span-12 intro-y text-base ">
                        <div className="flex items-center py-4">
                          <h3 className="ntro-y box  font-semibold mr-4 text-sm text-primary">
                            OWNER's DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-slate-200/" />
                        </div>
                        <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-sm">
                          <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                            <div className="font-semibold ">
                              First Name:
                            </div>
                            <div className="font-semibold ">
                              Last Name:
                            </div>
                            <div className="font-semibold ">
                              Phone Number:
                            </div>

                            <div className="font-semibold ">
                              Home Address
                            </div>
                          </div>
                          <div className="  mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                            <div className="">{owner?.first_name}</div>

                            <div className="">{owner?.last_name}</div>

                            <div className="">{owner?.phone}</div>
                            <div className="">{owner?.home_address}</div>
                          </div>
                        </div>
                      </div>
                      {/* END: Owners Details */}

                        {/* BEGIN: Vehicles  */}

                        {/* <div className="col-span-12 intro-y text-base ">
                        <div className="flex items-center py-4">
                          <h3 className="ntro-y box  font-semibold mr-4 text-sm text-primary">
                            VEHICLE DETAILS
                          </h3>
                          <hr className="flex-grow border-t border-slate-200/" />
                        </div>
                        <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-sm">
                          <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                            <div className="font-semibold ">
                              Registered LGA:
                            </div>
                            <div className="font-semibold ">
                              Vehicle Type:
                            </div>
                            <div className="font-semibold ">
                              Plate Number:
                            </div>

                            <div className="font-semibold ">
                              Vehicle Manufacture:
                            </div>
                            <div className="font-semibold ">
                              Date Purchased:
                            </div>
                          </div>
                          <div className="  mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                            <div className="">{vehicleDetails?.registered_lga? vehicleDetails?.registered_lga : isNull }</div>

                            <div className="">{vehicleDetails?.vehicle_type? vehicleDetails?.vehicle_type : isNull}</div>

                            <div className="">{vehicleDetails?.plate_number ? vehicleDetails?.plate_number : isNull}</div>
                            <div className="">{vehicleDetails?.manufacturer ? vehicleDetails?.manufacturer : isNull}</div>
                            <div className="">{vehicleDetails?.date? vehicleDetails?.date : isNull}</div>

                          </div>
                        </div>
                      </div> */}
                      {/* END: Vehicle */}
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <div className="grid grid-cols-12 gap-6 text-slate-600">
                      {/* BEGIN: Rider Details */}
                      <div className="col-span-12 intro-y  ">
                        <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                          <div className=" items-center mb-5">
                            <div className="font-semibold lg:mb-4 text-md">
                              Registration Fee
                            </div>
                            <div className="font-semibold lg:mb-4 text-md">
                              Plate Number:
                            </div>
                            <div className="font-semibold lg:mb-4 text-md">VIN:</div>
                            <div className="font-semibold lg:mb-4 text-md">
                              Vehicle Type
                            </div>
                            <div className="font-semibold lg:mb-4 text-md">
                              Manufacturer{" "}
                            </div>
                            <div className="font-semibold lg:mb-4 text-md">
                              Vehicle Color{" "}
                            </div>
                            <div className="font-semibold lg:mb-4 text-md">
                              Year of Purchase{" "}
                            </div>
                          
                          </div>

                          <div className=" items-center mb-5">
                            <div className="ml-auto lg:mb-4">4,500</div>

                            <div className="ml-auto lg:mb-4">{vehicleDetails?.plate_number? vehicleDetails?.plate_number : isNull}</div>
                            <div className="ml-auto lg:mb-4">
                              {vehicleDetails?.vin? vehicleDetails?.vin: isNull}
                            </div>

                            <div className="ml-auto lg:mb-4">{vehicleDetails?.vehicle_type? vehicleDetails?.vehicle_type : isNull}</div>
                            <div className="ml-auto lg:mb-4">{vehicleDetails?.manufacturer? vehicleDetails?.manufacturer : isNull}</div>
                            <div className="ml-auto lg:mb-4">{vehicleDetails?.vehicle_color? vehicleDetails?.vehicle_color : isNull}</div>
                            <div className="ml-auto lg:mb-4">{vehicleDetails?.year_of_purchase? vehicleDetails?.year_of_purchase : isNull}</div>

                          </div>
                        </div>
                      </div>
                      {/* END: Rider Details */}

                      {/* BEGIN: Next of Kin  */}
                      <div className="col-span-12 intro-y box text-base ">
                        <div className="flex items-center py-4">
                          <h3 className="intro-y box  font-semibold mr-4 text-sm">
                            VEHICLE IMAGES
                          </h3>
                          <hr className="flex-grow border-t border-slate-200/" />
                        </div>
                        {/* <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                          <div className=" items-center mb-5 text-sm">
                            <div className="font-semibold ">First Name:</div>
                            <div className="font-semibold ">Last Name:</div>
                            <div className="font-semibold ">Relationship:</div>
                            <div className="font-semibold ">Phone Number:</div>

                            <div className="font-semibold ">Home Address</div>
                          </div>
                          <div className=" items-center mb-5">
                            <div className="ml-auto">
                              {rider?.next_of_kin?.first_name}
                            </div>

                            <div className="ml-auto">
                              {rider?.next_of_kin?.last_name}
                            </div>
                            <div className="ml-auto">
                              {rider?.next_of_kin?.relationship}
                            </div>

                            <div className="ml-auto">
                              {rider?.next_of_kin?.phone}
                            </div>
                            <div className="ml-auto">
                              {rider?.next_of_kin?.home_address}
                            </div>
                          </div>
                        </div> */}



                        <div className="flex-1 gap-y-4 lg:px-5 pt-5 mt-2 border-t-2 lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
              <div className="flex justify-start items-center space-x-4 lg:flex-none text-sm lg:font-medium text-center lg:text-left lg:mt-5">
                <div>
                  <img alt="Front" className="" src={vehicleDetails?.images?.vehicle_picture1} />
                </div>
                <div>
                  <img alt="Side" className="" src={vehicleDetails?.images?.vehicle_picture2} />
                </div>
                <div>
                  <img alt="Aeriel" className="" src={vehicleDetails?.images?.vehicle_picture3} />
                </div>
              </div>
            </div>

                      </div>
                      {/* END: Next of Kin  */}

                    
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <div className="grid grid-cols-12 gap-6 text-slate-600">
               

     

    <div className="flow-root col-span-12 intro-y overflow-y-auto h-72">
              <h2 className="text-lg mb-4">Activity Log</h2>
              <div className="flex mb-4 items-center">   <Lucide icon="ArrowUp" className="h-5 w-5 text-green-600"  /> <p className="text-xs text-slate-500">15% this month</p> </div>
      <ul role="list" className="-mb-8">
        {user_activity_logs?.map((activityItem: any , activityItemIdx: number) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== user_activity_logs.length - 1 ? (
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
                          <Link to={activityItem.id} className="font-medium text-gray-900">
                            {activityItem.action}
                          </Link>
                        </span>
                      
                        <span className="whitespace-nowrap"> {formatDate(activityItem.created_at)}</span>

                            <div className="mr-0.5">
                            <span className=""> {activityItem.user.name }</span>

                            <span
                      className='bg-slate-400 h-1.5 w-1.5 rounded-full inline-block mx-2 '
                      aria-hidden="true"
                    />

                                {/* <span className="ml-3  text-slate-500">{ formatChanges(activityItem.changes)}</span> */}
                                <span className=" text-xs">{activityItem.type}</span>

                                <span
                      className='bg-slate-400 h-1.5 w-1.5 rounded-full inline-block  mx-2'
                      aria-hidden="true"
                    />

                                                    <span className="mr-2 text-xs">{ activityItem.type}</span>
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
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* end content */}

              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}


