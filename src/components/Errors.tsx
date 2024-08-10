import React from "react";
import Alert from "../base-components/Alert";
import Lucide from "../base-components/Lucide";


const RequiredError = (props: any) => {


//   return <div className="text-left text-red-600 text-xs mt-2">{children}</div>;
  return <div className="mt-2 text-danger">
                            
                              {props.children}
                          </div>
};


const InvalidError = (props: any) => {

   return (<div className="col-span-12 mt-6 -mb-6 intro-y">
          <Alert
            variant="danger"
            dismissible
            className="flex items-center mb-6 box dark:border-darkmode-600"
          >
            {({ dismiss }) => (
              <>
                <span>
                {props.error}
                {props.emailError}
                  <a
                    href="https://billpoint.ng/report"
                    className="ml-1 underline"
                    target="blank"
                  >
                    {props.emailError? 'Resend Mail' : 'report this error'}
                  </a>
                  .
                </span>
                <Alert.DismissButton
                  className="text-white"
                  onClick={dismiss}
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </Alert.DismissButton>
              </>
            )}
          </Alert>
        </div>)
}


export { RequiredError, InvalidError };