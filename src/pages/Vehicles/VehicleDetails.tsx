/* This example requires Tailwind CSS v2.0+ */
import {
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
} from "react";

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

type UserRoleKey =
  | "registration_officer"
  | "attachment_officer"
  | "operation_officer";

interface ActivityItem {
  user_role: UserRoleKey;
  // other fields...
}

const userRole: Record<UserRoleKey, any> = {
  registration_officer: "Registration Officer",
  attachment_officer: "Attachment Officer",
  operation_officer: "Operation Officer",
};

const activityItem: ActivityItem = {
  user_role: "registration_officer",
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
  const [surveyResponse, setSurveyResponse] = useState<any>(null);

  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const isInitialMount = useRef(true);

  const navigate = useNavigate();
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle the modal
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  

  console.log(surveyResponse);

  useEffect(() => {
    if (user?.token) {
      fetchVehicleData();
      fetchRiderSurveyResponseData();
    }
  }, [user?.token]);

  const { rider, owner, user_activity_logs } = vehicleDetails ?? {};

  // const user_activity_logs: any[] =[];

  const isNull = "Unavailable";

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
        setShowErrorModal(true);
        setError(error)
      },
      user?.token && user.token
    );
  };

  const fetchRiderSurveyResponseData = () => {
    setError("");

    API(
      "get",

      `survey-response/${id}`, // Make sure your backend API endpoint is correct
      {},

      // {lga: 'Alimosho'},
      function (surveyResponseData: any) {
        setSurveyResponse(surveyResponseData?.answers);
        // console.log(surveyResponse?.answer)
        setLoading(false);
      },
      function (error: any) {
        console.error("Error fetching recent searches:", error);
        // setShowErrorModal(true);
        // setError(error)
        setLoading(false);
      },
      user?.token && user.token
    );
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const getDisplayValue = (value: any) => {
    return value || '---';
  };

  return (
    <>
      {/* <div className="bg-gradient-to-r from-primary via-purple-800 to-primary pb-32">
          <header className="py-5"></header>
        </div> */}

 {isModalOpen && 
 <Dialog
open={isModalOpen}
onClose={toggleModal}
className="flex place-self-center lg:items-center lg:justify-center"
>
<Dialog.Panel className="">
  {/* <Dialog.Title>
    <div className="flex justify-center items-center">
      <div className="bg-customColor/20 fill-customColor text-customColor mr-2 rounded-lg p-2">
      
       
      </div>
    
    </div>
  </Dialog.Title> */}

  <Dialog.Description className="grid grid-cols-12 gap-y-3 p-0">
  <div className="col-span-12 ">

  <img
                          src={owner?.profile_picture_url}
                          alt="Owner"
                          className=" max-h-96 w-full"
                        />
                        </div>
  </Dialog.Description>


</Dialog.Panel>
</Dialog>
}





{showErrorModal && 


<Dialog

staticBackdrop
open={showErrorModal}
onClose={() => {
  setShowErrorModal(true);
}}
>
<Dialog.Panel>
  <div className="p-5 text-center">
    <Lucide
      icon="XCircle"
      className="w-16 h-16 mx-auto mt-3 text-warning"
    />
    <div className="mt-5 text-3xl">Oops...</div>
    <div className="mt-2 text-slate-500">
      {error}!
    </div>
  </div>
  <div className="px-5 pb-8 text-center">
    <Button
       type="button"
       variant="primary"
       className="bg-customColor"
       onClick={() => {
         setShowErrorModal(false);
         navigate('/dashboard')

       }}
    >
      Ok
    </Button>
  </div>
  {/* <div className="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
    <a href="" className="text-primary">
      Why do I have this issue?
    </a>
  </div> */}
</Dialog.Panel>
</Dialog>
}
      <div className=" mx-auto pb-12 lg:pb-0  lg:px-0 ">
        {/* Replace with your content */}

        <div className="bg-white   px-2 py-6 sm:px-6 sm:py-2">
          {/* content */}

          <Tab.Group>
            {/* BEGIN: Profile Info */}
            <div className=" pt-5 lg:pt-2  intro-y ">
              <div className="flex flex-col pb-5 -mx-5  lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                <div className="flex justify-center items-center lg:hidden mb-4">
                  <Button
                    variant="primary"
                    className="mr-2 shadow-sm px-2 bg-customColor"
                    onClick={() => {
                      navigate(`/update-profile/${id}`);
                    }}
                  >
                    Edit
                  </Button>

                  <Button variant="secondary" className="mr-2 shadow-sm">
                    <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
                    As Excel Document
                  </Button>
                </div>
                <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
                  <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 image-fit">
                    <img
                      alt="Profile pix"
                      className="rounded-xl"
                      src={rider?.profile_picture_url}
                    />
                    <button                     
 className="bg-customColor w-full h-4 absolute bottom-0 cursor-pointer rounded-b-xl flex justify-center align-center" onClick={toggleModal}>
                    <Lucide icon="Eye" className="w-4 h-4 mr-2 " color="white" />
                    </button>
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
                      <span className={`font-semibold text-md capitalize `}>
                        {" "}
                        accreditation:
                      </span>{" "}
                      <span className={`uppercase ${vehicleDetails?.verification_status? 'text-green-600' : 'text-danger'}`}>{vehicleDetails?.verification_status? 'approved' : 'decline'}</span>
                    </div>
                  </div>
                  <div className="lg:flex hidden ">
                    <Button
                      variant="primary"
                      className="mr-2  px-4 bg-customColor"
                      onClick={() => {
                        navigate(`/update-profile/${id}`);
                      }}
                    >
                      Edit
                    </Button>

                    <Button variant="secondary" className="mr-2 shadow-sm">
                      <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
                      As Excel Document
                    </Button>
                  </div>
                </div>
              </div>
              <Tab.List
                variant="link-tabs"
                className="flex-col justify-center text-center sm:flex-row lg:justify-start border-b  border-slate-200/60"
              >
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center cursor-pointer ">
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
                    {/* <Lucide icon="Shield" className="w-4 h-4 mr-2" /> */}
                    Owner Details
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center  cursor-pointer">
                    {/* <Lucide icon="Shield" className="w-4 h-4 mr-2" /> */}
                    Vehicle Tags
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center  cursor-pointer">
                    {/* <Lucide icon="Lock" className="w-4 h-4 mr-2" />  */}
                    Vehicle Activity
                  </Tab.Button>
                </Tab>
                <Tab fullWidth={false}>
                  <Tab.Button className="flex items-center  cursor-pointer">
                    {/* <Lucide icon="Lock" className="w-4 h-4 mr-2" />  */}
                    Survey Feedback
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>
            {/* END: Profile Info */}
            <Tab.Panels className="mt-5">
              <Tab.Panel>
                <div className="grid grid-cols-12  text-slate-600">
                  {/* BEGIN: Rider Details */}
                  <div className="col-span-12 intro-y  ">
                    <div className=" flex justify-start items-center py-5 gap-x-6  border-t sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-md">
                      <div className=" mb-2 flex flex-col no-wrap items-start justify-start space-y-2">
                        <div className="font-semibold ">Nin</div>
                        <div className="font-semibold ">Age:</div>
                        <div className="font-semibold ">Gender:</div>
                        <div className="font-semibold ">Marital Status:</div>
                        <div className="font-semibold ">Religion:</div>
                        <div className="font-semibold ">Tribe:</div>

                        <div className="font-semibold ">Home Address</div>

                        <div className="font-semibold ">LGA of Operatiion</div>
                        <div className="font-semibold ">LASDRI Card Available</div>
                        <div className="font-semibold ">LASDRI Card Number</div>
                        <div className="font-semibold ">Driver License</div>
                        <div className="font-semibold ">Driver License Number</div>


                        {/* <div className="font-semibold ">Park/Zone</div> */}
                      </div>
                      <div className=" mb-2 flex flex-col no-wrap items-start justify-start space-y-2 ">
                        <div className="">**************</div>

                        <div className="">{rider?.age}</div>
                        <div className="">
                          {rider?.gender === "f" ? "Female" : "Male"}
                        </div>

                        <div className="capitalize">{rider?.marital_status}</div>
                        <div className="capitalize">{rider?.religion}</div>
                        <div className="capitalize">{rider?.tribe}</div>
                        <div className="capitalize">{getDisplayValue(rider?.home_address)}</div>

                        <div className="capitalize">{getDisplayValue(rider?.lga)}</div>
                        <div className="capitalize">{getDisplayValue(rider?.lasdri_available)}</div>
                        <div className="capitalize">{getDisplayValue(rider?.lasdri)}</div>
                        <div className="capitalize">{getDisplayValue(rider?.ndl_available)}</div>
                        <div className="capitalize">{getDisplayValue(rider?.ndl)}</div>



                      </div>
                    </div>
                  </div>
                  {/* END: Rider Details */}

                  {/* BEGIN: Next of Kin  */}
                  <div className="col-span-12 intro-y  text-md ">
                    <div className="flex items-center py-4">
                      <h3 className="intro-y  font-semibold mr-4 text-sm text-primary">
                        NEXT OF KIN DETAILS
                      </h3>
                      <hr className="flex-grow border-t border-slate-200/" />
                    </div>
                    <div className=" flex justify-start items-center py-5 gap-x-6 sm:py-3  dark:border-darkmode-400">
                      <div className=" flex flex-col no-wrap items-start  space-y-2 mb-2 ">
                        <div className="font-semibold ">First Name:</div>
                        <div className="font-semibold ">Last Name:</div>
                        <div className="font-semibold ">Relationship:</div>
                        <div className="font-semibold ">Phone Number:</div>

                        <div className="font-semibold ">Home Address</div>
                      </div>
                      <div className=" mb-2 flex flex-col no-wrap items-start justify-start space-y-2 ">
                        <div className="">{rider?.next_of_kin?.first_name}</div>

                        <div className="">{rider?.next_of_kin?.last_name}</div>
                        <div className="">
                          {rider?.next_of_kin?.relationship}
                        </div>

                        <div className="">{rider?.next_of_kin?.phone}</div>
                        <div className="">
                          {rider?.next_of_kin?.home_address}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END: Next of Kin  */}


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
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          registration fee:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          accreditation code:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          vehicle type:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          Plate Number:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          vehicle registration number:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                        vehicle identification number:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                        road worthiness number:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                        zone:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                        park:
                        </div>
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                        route:
                        </div>
                        
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          Vehicle Color:
                        </div>
                     
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          Manufacturer:
                        </div>
                       
                        <div className="font-semibold capitalize lg:mb-4 text-md">
                          Year of Purchase:
                        </div>
                      </div>

                      <div className=" items-center mb-5">
                        <div className="ml-auto lg:mb-4">4,500</div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.tagNumber)}
                        </div>

                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.vehicle_type)}
                        </div>

                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.plate_number)}
                        </div>

                        

                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.vrn)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.vin)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.rwn)}
                        </div>

                        
                        <div className="ml-auto lg:mb-4 uppercase">
                          {getDisplayValue(vehicleDetails?.zone)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.parkDesc)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.routeDesc)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.vehicle_color)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.manufacturer)}
                        </div>
                        <div className="ml-auto lg:mb-4">
                          {getDisplayValue(vehicleDetails?.date)}
                        </div>
                       
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
                          <img
                            alt="Front"
                            className=""
                            src={vehicleDetails?.images?.vehicle_picture1}
                          />
                        </div>
                        <div>
                          <img
                            alt="Side"
                            className=""
                            src={vehicleDetails?.images?.vehicle_picture2}
                          />
                        </div>
                        <div>
                          <img
                            alt="Aeriel"
                            className=""
                            src={vehicleDetails?.images?.vehicle_picture3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END: Next of Kin  */}
                </div>
              </Tab.Panel>

{/* Owner Tab */}
              <Tab.Panel>
                {/* <div className="grid grid-cols-12  text-slate-600">
          

                  <div className="col-span-12 intro-y text-base ">
                 
                    <div className=" flex justify-start items-center py-5 gap-x-6  border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-sm">
                      <div className=" mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                      <div className="font-semibold ">Owner Category:</div>
                      <div className="font-semibold ">Owner's Image:</div>

                        <div className="font-semibold ">First Name:</div>
                        <div className="font-semibold ">Middle Name:</div>

                        <div className="font-semibold ">Gender:</div>
                        <div className="font-semibold ">Marital Status:</div>

                        <div className="font-semibold ">Last Name:</div>
                        <div className="font-semibold ">Phone Number:</div>

                        <div className="font-semibold ">Home Address</div>
                      </div>
                      <div className="  mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
                      <div className="capitalize">
                        {owner?.owner_category.toLowerCase().replace(/\s+/g, '_')} 
                        </div>
                  
                        <div className="">{owner?.profilePicture}
                        <span className="ml-1 text-customColor cursor-pointer">view image</span>
                        </div>


                        <div className="">{owner?.first_name}</div>

                        <div className="capitalize">{owner?.middle_name}</div>
                        <div className="capitalize">{owner?.last_name}</div>
                        <div className="capitalize">{owner?.gender === 'm'? 'male' : 'female'}</div>

                        <div className="capitalize">{owner?.marital_status}</div>


                        <div className="">{owner?.phone}</div>
                        <div className="">{owner?.home_address}</div>
                      </div>
                    </div>
                  </div>
                 
                </div> */}
                  <div className="grid grid-cols-12 text-slate-600">
      <div className="col-span-12 intro-y text-base">
        <div className="flex justify-start items-center py-5 gap-x-6 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-sm">
          <div className="mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
            <div className="font-semibold">Owner Category:</div>
            <div className="font-semibold">Owner's Image:</div>
            <div className="font-semibold">First Name:</div>
            <div className="font-semibold">Middle Name:</div>
            <div className="font-semibold">Gender:</div>
            <div className="font-semibold">Marital Status:</div>
            <div className="font-semibold">Last Name:</div>
            <div className="font-semibold">Phone Number:</div>
            <div className="font-semibold">Home Address:</div>
          </div>
          <div className="mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
            <div className="capitalize">
              {owner?.owner_category?.toLowerCase().replace(/\s+/g, '_')}
            </div>
            <div>
              {owner?.profilePicture ? (
                <>
                {owner?.profilePicture}
                  <span
                    className="ml-1 text-customColor cursor-pointer"
                    onClick={toggleModal}
                  >
                    View Image
                  </span>
                  {/* Modal */}
                  {isModalOpen && (
                    <>



                    {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-4 rounded shadow-lg relative">
                           <button
                          className="absolute top-2 right-2 text-black text-lg"
                          onClick={toggleModal}
                        >
                          &times;
                        </button>
                        <img
                          src={owner?.profile_picture_url}
                          alt="Owner"
                          className="max-w-full max-h-full"
                        />
                      </div>
                    </div> */}

                    </>
                  )}
                </>
              ) : (
                'No Image Available'
              )}
            </div>
            <div>{getDisplayValue(owner?.first_name)}</div>
            <div className="capitalize">{getDisplayValue(owner?.middle_name)}</div>
            <div className="capitalize">{getDisplayValue(owner?.last_name)}</div>
            <div className="capitalize">
              {owner?.gender === 'm' ? 'male' : 'female'}
            </div>
            <div className="capitalize">{getDisplayValue(owner?.marital_status)}</div>
            <div>{getDisplayValue(owner?.phone)}</div>
            <div>{getDisplayValue(owner?.home_address)}</div>
          </div>
        </div>
      </div>
    </div>
              </Tab.Panel>

              <Tab.Panel>
              
                  <div className="grid grid-cols-12 text-slate-600">
      <div className="col-span-12 intro-y text-base">
        <div className="flex justify-start items-center py-5 gap-x-6 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400 text-sm">
          <div className="mb-5 flex flex-col no-wrap items-start justify-start space-y-2">
            <div className="font-semibold">Update coming</div>
            
          </div>
          
        </div>
      </div>
    </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="grid grid-cols-12 gap-6 text-slate-600">
                  <div className="flow-root col-span-12 intro-y overflow-y-auto h-72">
                    <h2 className="text-lg mb-4">Activity Logs</h2>
                    {/* <div className="flex mb-4 items-center">   <Lucide icon="ArrowUp" className="h-5 w-5 text-green-600"  /> <p className="text-xs text-slate-500">15% this month</p> </div> */}
                    <ul role="list" className="-mb-8">
                      {user_activity_logs?.map(
                        (activityItem: any, activityItemIdx: number) => (
                          <li key={activityItem.id}>
                            <div className="relative pb-8">
                              {activityItemIdx !==
                              user_activity_logs.length - 1 ? (
                                <span
                                  className="absolute top-3 left-2 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <>
                                  <div>
                                    <div className="relative px-1">
                                      <div className="h-2 w-2  bg-customColor rounded-full ring-4 ring-customColor/20 flex items-center justify-center">
                                        {/* <Lucide icon="Activity" className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1 py-0">
                                    <div className="text-sm  text-gray-500">
                                      <span className="mr-2">
                                        <Link
                                          to={activityItem.id}
                                          className="font-medium text-gray-900"
                                        >
                                          {activityItem.action}
                                        </Link>
                                      </span>

                                      <span className="whitespace-nowrap">
                                        {" "}
                                        {formatDate(activityItem.created_at)}
                                      </span>

                                      <div className="mr-0.5">
                                        <span className="">
                                          {" "}
                                          {activityItem.user.name}
                                        </span>

                                        <span
                                          className="bg-slate-400 h-1.5 w-1.5 rounded-full inline-block mx-2 "
                                          aria-hidden="true"
                                        />

                                        {/* <span className="ml-3  text-slate-500">{ formatChanges(activityItem.changes)}</span> */}
                                        <span className=" text-xs">
                                          {activityItem.type}
                                        </span>

                                        <span
                                          className="bg-slate-400 h-1.5 w-1.5 rounded-full inline-block  mx-2"
                                          aria-hidden="true"
                                        />

                                        <span className="mr-2 text-xs">
                                          {activityItem.user.lga}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </Tab.Panel>


              {/* surevy feedback */}


              <Tab.Panel>
                <div className="grid grid-cols-12 gap-6 text-slate-600">
                  <div className="flow-root col-span-12 intro-y overflow-y-auto h-72">
                    {/* <div className="flex mb-4 items-center">   <Lucide icon="ArrowUp" className="h-5 w-5 text-green-600"  /> <p className="text-xs text-slate-500">15% this month</p> </div> */}
                    <table className="table-auto w-full border-collapse bg-slate-50">
        <thead>
          <tr className="bg-customColor/5 text-left">
            <th className=" px-4 py-2">S/N</th>
            <th className=" px-4 py-2">Survey Question</th>
            <th className=" px-4 py-2">Feedback/Response</th>
          </tr>
        </thead>
        <tbody>
          {surveyResponse?.length > 0 ? (
            surveyResponse.map((answer: any, index: any) => (
              <tr key={index}>
                <td className=" px-4 py-2">{index + 1}</td>
                <td className=" px-4 py-2">{answer.question}</td>
                <td className=" px-4 py-2">{answer.answer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className=" px-4 py-2 text-center">
                No answers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
    </>
  );
}
