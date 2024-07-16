import React, { useState, useContext } from "react";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.svg";
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import lag from "../../assets/images/lag.jpg";

import clsx from "clsx";

import logo from "../../assets/images/logo.svg";
import GoogleLogo from "../../assets/images/google.svg";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import LoadingIcon from "../../base-components/LoadingIcon";
import { Backdrop } from "../../base-components/Headless";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import { UserContext } from "../../stores/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toastify from "toastify-js";


function Main() {

  const { user, userDispatch } = useContext(UserContext);
  const location = useLocation();

  const [error, setError] = useState("");
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPasswd = () => setShowPassword(!showPassword);

  const [isLoading, setIsLoading] = useState(false);
  const from = ((location.state as any)?.from.pathname as string) || "/profile";

  // const [buttonClass, setButtonClass] = useState('inline');

  const schema = yup
    .object({
      identifier: yup.string().required().min(5),
      password: yup.string().required().min(6),
    })
    .required();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    // console.log(data);
    setIsLoading(true);
    const result = await trigger();
    if (!result) {
      const failedEl = document
        .querySelectorAll("#failed-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      failedEl.classList.remove("hidden");
      Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      // setIsLoading(false)
    }

    if (isLoading === true) return;
    setError("");
    setIsLoading(true);
    API("post", "login", data, onLogin, onFail, user?.data && user.data);
  };

  function onLogin(userData: any) {

    setIsLoading(false);
    userDispatch({ type: "STORE_USER_DATA", user: userData });
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
    history("/dashboard");
  }

  function onFail(error: any) {
    setError(error);
    setIsLoading(false);
    console.log(error);
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
  }

  return (
    <>
      <div
        className={clsx([
          "-m-3  p-3  relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        ])}
      >
        <div className="container relative z-10 h-full grid lg:grid-cols-2">
          {/* BEGIN: Login Info */}
          <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: `url(${lag})` }}>
            <div className="flex items-center pt-5 -intro-x">
              {/* <img
                alt="Midone Tailwind HTML Admin Template"
                className="w-6"
                src={logoUrl}
              /> */}
            </div>
          </div>
          {/* END: Login Info */}
          {/* BEGIN: Login Form */}
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0 lg:flex lg:items-center">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-3/4 xl:w-auto">

              <h2 className="text-2xl mb-4 font-bold text-center intro-x xl:text-3xl xl:text-left">
                LagRev
              </h2>

              <h2 className="text-2xl font-medium text-center intro-x xl:text-3xl xl:text-left">
                Sign In
              </h2>
              
              <div className=" mt-2 text-start intro-x text-slate-400 ">
                Sign In to stay connected
              </div>
              {error && <div className="mt-2 text-danger">{error}</div>}

            


              <form
                  className="validate-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mt-8 intro-x">
                    <FormInput
                      type="text"
                      placeholder="Email address/Phone Number/user name"
                      {...register("identifier")}
                      id="validation-form-1"
                      name="identifier"
                      className={`${clsx({
                        "border-danger": errors.identifier,
                      })} block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]`}

                      // className="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                      // placeholder="Full Name"
                    />
                    {errors.identifier && (
                      <div className="mt-2 text-danger">
                        {typeof errors.identifier.message === "string" &&
                          errors.identifier.message}
                      </div>
                    )}
                    <div className="relative">
                      <FormInput
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`${clsx({
                          "border-danger": errors.email,
                        })} block px-4 py-3 mt-4  login__input min-w-full xl:min-w-[350px]`}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <div className="mt-2 text-danger">
                          {typeof errors.password.message === "string" &&
                            errors.password.message}
                        </div>
                      )}

                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
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
                  </div>
                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <p>
                      <Link to="/forgotpassword">forgot Password?</Link>
                    </p>
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      disabled={!isValid || !isDirty || isLoading}
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:mr-3"
                    >
                    

{isLoading ?  "Logging in" : 'Login'}
{isLoading && (
                        <span className="ml-4">
                          <LoadingIcon icon="three-dots" color="#fff" />
                        </span>
                      )}
                      
                    </Button>
                    
                  </div>



                  <div className="mt-10 text-center intro-x xl:mt-10 text-slate-600 dark:text-slate-500 xl:text-left">
                    By signin up, you agree to our{" "}
                    <a className="text-primary dark:text-slate-200" href="">
                      Terms and Conditions
                    </a>
                    &
                    <a className="text-primary dark:text-slate-200" href="">
                      Privacy Policy
                    </a>
                  </div>
                </form>


            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </>
  );
}

export default Main;
