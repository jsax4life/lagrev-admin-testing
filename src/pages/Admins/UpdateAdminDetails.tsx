import { Fragment, Key, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormSelect,
  FormLabel,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "../../stores/UserContext";
import API from "../../utils/API";
import LoadingIcon from "../../base-components/LoadingIcon";

import Toastify from "toastify-js";
import Notification from "../../base-components/Notification";

interface VehicleDetails {
  rider: {
    first_name: string;
    middle_name: string;
    last_name: string;
    age: number;
    lga: string;
    religion: string;
    phone: string;
    tribe: string;
    parkzone: string;
    gender: string;
    home_address: string;
  };
  nok: {
    first_name: string;
    last_name: string;
    phone: string;
    relationship: string;
  };
  owner: {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
  };
}

// Define the validation schema
const validationSchema = yup.object().shape({
  email: yup.string().required("email is required"),

  //   phone: yup.string().required("Phone number is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  gender: yup.string().required("Gender is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),

  role: yup.string().required("role is required"),
//   password: yup.string().min(6),

  // date: yup.string().required('Vehicle Date is required'),
});


export default function UpdateAdminProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { user } = useContext(UserContext);

  const { id } = useParams<{ id: string }>();

  const [adminDetails, setAdminDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
const [userRole, setUserRole] = useState(adminDetails?.role);
const [showPassword, setShowPassword] = useState(false);
const toggleShowPasswd = () => setShowPassword(!showPassword);

  console.log(loading);

  useEffect(() => {
    if (user?.token) {
      fetchAdminData();
    }
  }, [user?.token, id]);

  useEffect(() => {
    if (adminDetails) {
      const { attached_vehicles, registered_vehicles } = adminDetails;
    //   setValue("last_name", adminDetails?.last_name || "");
      setValue("phoneNumber", adminDetails?.phoneNumber || "");
      setValue("gender", adminDetails?.gender || "");
      setValue("email", adminDetails?.email || "");
      setValue("role", adminDetails?.roles[0]?.name || "");
      setValue("email", adminDetails?.email || "");
      setValue("firstName", adminDetails?.firstName || "");
      setValue("lastName", adminDetails?.lastName || "");


    }
  }, [adminDetails, setValue]);


  const fetchAdminData = () => {

    setError("");
    setLoading(true);

const userListFromLocalStorage = localStorage.getItem('adminList');
let adminList = userListFromLocalStorage ? JSON.parse(userListFromLocalStorage) : [];

// Assuming you are looking for the user with id 2
const adminId = Number(id);
const admin = adminList.find((u: any) => u.id === adminId);

if (admin) {
  setAdminDetails(admin);

    setLoading(false);

console.log("Admin found:", admin);
} else {
setLoading(false);

}

setError("");


};



  const onSubmit = async (data: any) => {
    console.log(data)
    setLoading(true);

    // Conditionally create the vehicle_details object only if vehicleDetails.tagged is true
   

    // Transform the data into a nested object
  console.log(data)

    API(
      "put",
      `update-admin/${id}`, // Ensure your backend API endpoint is correct
      { ...data },
      function (responseData: any) {
        //   setVehicleDetails(vehicleData);
        setLoading(false);
        const successEl = document
          .querySelectorAll("#success-notification-content")[0]
          .cloneNode(true) as HTMLElement;

        successEl.classList.remove("hidden");
        Toastify({
          node: successEl,
          duration: 8000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
        // console.log(responseData);
      },
      function (error: any) {
        console.log(error)
        setLoading(false);
        setErrorMessage(error);
        const failedEl = document
          .querySelectorAll("#failed-notification-content")[0]
          .cloneNode(true) as HTMLElement;
        failedEl.classList.remove("hidden");
        Toastify({
          node: failedEl,
          duration: 8000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      },
      user?.token && user.token
    );

    //   console.log("Structured Data:", structuredData);
    // Send structuredData to the backend here

    // console.log( data);
    //   setLoading(true);
    // Call API to update vehicle details with form data
    //   await API("put", `vehicle-details/${id}`, data, null, null, user?.token);

    //   navigate("/vehicle-list");
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <LoadingIcon className="w-8 h-8" />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="max-w-7xl mx-auto pb-12 lg:pb-0  lg:px-0">
        <div className="bg-white   px-5 py-6 sm:px-6 sm:py-4">
          {/* Content Section */}

          <div className="flex items-center intro-y gap-x-2">
            <Lucide icon="User" className="w-6 h-6 text-slate-500 " />
            <h2 className="mr-auto text-lg text-slate-500 font-medium">
              Admin Information
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="  col-span-12 ">
              {/* Rider Information */}

             

              <form  onSubmit={handleSubmit(onSubmit)} className=" ">
              <div className="mt-5 intro-y text-slate-600 border-b border-slate-200">
                

                  <div className="py-5 ">
                    <div className="grid grid-cols-12 gap-x-5">
                    
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      

                        <div className="mt-3">
                          <FormLabel htmlFor="role">
                            Role
                          </FormLabel>
                          <FormSelect
                            id="role"
                            {...register("role")}
                            className=""
                            // value={adminDetails?.roles[0]?.name}
                            onChange={(e) => 
                              setValue("role", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <option value="" selected disabled>
                              --Select--
                            </option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Operation Manager">Operation Manager</option>
                            <option value="Support Administrator">Support Administrator</option>
                          


                          </FormSelect>

                          {errors.role && (
                            <p className="text-red-500">
                              {errors?.role?.message?.toString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
          

                <div className="mt-5 lg:mt-0 intro-y text-slate-600  border-b border-slate-200">
                 

                  <div className="py-5">
                    <div className="grid grid-cols-12 gap-x-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div>
                          <FormLabel htmlFor="firstName">
                            Full Name 
                          </FormLabel>
                          <FormInput
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            {...register("firstName")}
                            //   value={rider?.name}
                          />
                          {errors.firrst_name && (
                            <p className="text-red-500">
                              {errors?.firstName?.message?.toString()}
                            </p>
                          )}
                        </div>


                        <div className="mt-3 ">
                          <FormLabel htmlFor="nok_phone">
                            Phone Number *
                          </FormLabel>
                          <FormInput
                            id="phone"
                            type="text"
                            placeholder="0807********"
                            {...register("phoneNumber")}
                            maxLength={11}
                          />
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message?.toString()}
                            </p>
                          )}
                        </div>

                        
                      </div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                       
                      <div>
                          <FormLabel htmlFor="first_name">
                            Last Name 
                          </FormLabel>
                          <FormInput
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            {...register("lastName")}
                            //   value={rider?.name}
                          />
                          {errors.firrst_name && (
                            <p className="text-red-500">
                              {errors?.lastName?.message?.toString()}
                            </p>
                          )}
                        </div>

                      

                        <div className="mt-3">
                          <FormLabel htmlFor="update-profile-form-8">
                            Gender
                          </FormLabel>
                          <FormSelect
                            id="update-profile-form-8"
                            {...register("gender")}
                            className=""
                            onChange={(e) =>
                              setValue("gender", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <option value="" selected disabled>
                              --Gender--
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </FormSelect>

                          {errors.gender && (
                            <p className="text-red-500">
                              {errors?.gender?.message?.toString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="mt-3 lg:mt-0">
                          <FormLabel htmlFor="email">
                            Email *
                          </FormLabel>
                          <FormInput
                            id="email"
                            type="text"
                            placeholder="Email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors?.email?.message?.toString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              

                {/* <div className="mt-5 lg:mt-0 intro-y text-slate-600  border-b border-slate-200">
        

                  <div className="py-5">
                    <div className="grid grid-cols-12 gap-x-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      <div className="mt-3 lg:mt-0">
                              <FormLabel htmlFor="address">
                                Address
                              </FormLabel>
                              <textarea
                                id="address"
                                placeholder=" Address"
                                {...register("address")}
                                // value={rider?.next_of_kin?.address}
                                rows={4}
                                className="form-textarea w-full border-gray-300 rounded-lg"
                              />
                              {errors.address && (
                                <p className="text-red-500">
                                  {errors.address.message?.toString()}
                                </p>
                              )}
                            </div>
                      </div>
                    
                  
                    </div>
                  </div>
                </div> */}

               < div className="mt-5 lg:mt-0 intro-y text-slate-600  border-b border-slate-200">
        

                  <div className="py-5">
                    <div className="grid grid-cols-12 gap-x-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="relative">
                          <FormLabel htmlFor="street">
                            Password
                          </FormLabel>
                          <FormInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password")}
                            //   value={ownerData?.password}
                          />
                        

<div
                        className="absolute bottom-2  right-0 pr-3 flex items-center cursor-pointer"
                        onClick={toggleShowPasswd}
                      >
                        {showPassword ? (
                          <EyeSlashIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <EyeIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                     
                        </div>
                        {errors.password && (
                            <p className="text-red-500">
                              {errors.password.message?.toString()}
                            </p>
                          )}
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
                {/* end Next Of Kin Section */}

                <div className="flex justify-start mt-4">
                  <Button
                    type="submit"
                    className="bg-customColor text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2 justify-end">
                        <LoadingIcon
                          icon="spinning-circles"
                          className="w-6 h-6"
                        />
                        <div className=" text-xs text-center">Updating</div>
                      </div>
                    ) : (
                      "Update Details"
                    )}
                  </Button>
                </div>
              </form>

              <Notification id="success-notification-content" className="flex">
                <Lucide icon="CheckCircle" className="text-success" />
                <div className="ml-4 mr-4">
                  <div className="font-medium">Update Successful</div>
                  <div className="mt-1 text-slate-500">
                    Profile Successfully Updated
                  </div>
                </div>
              </Notification>
              {/* END: Success Notification Content */}
              {/* BEGIN: Failed Notification Content */}
              <Notification id="failed-notification-content" className="flex">
                <Lucide icon="XCircle" className="text-danger" />
                <div className="ml-4 mr-4">
                  <div className="font-medium">Update Failed!</div>
                  <div className="mt-1 text-slate-500">{errorMessage}</div>
                </div>
              </Notification>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
