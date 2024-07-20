import _ from "lodash";
import { useState, useRef, useEffect, useContext } from "react";
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
import { formatCurrency } from "../../utils/utils";

const lagosLGAs = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
  "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
  "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
  "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
];

function Main() {
  const { user } = useContext(UserContext);

  const [dateRange, setDateRange] = useState<string>('');
  const [selectedLGA, setSelectedLGA] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

if(dateRange){
  console.log(dateRange);

}
  useEffect(() => {
    if (user?.token) {
      fetchDashboardData();
    }
  }, [user?.token,]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // console.log('true')

        setDateRange('')
      return;

    }

    
      fetchDashboardData();
    
  }, [dateRange, selectedLGA]);

  // useEffect(() => {
  //   if (user?.token) {
  //     fetchDashboardData();
  //   }
  // }, [user?.token]);

  // useEffect(() => {
  
  //     fetchDashboardData();
  // }, [  dateRange, selectedLGA ]);


  const fetchDashboardData = () => {
    const [startDate, endDate] = dateRange?.split(' - ') || [null, null];

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

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0 intro-y bg-gradient-to-r from-primary via-purple-700 to-primary  px-2 lg:px-[22px] py-8  lg:rounded-t-[1.3rem]">
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

            <FormSelect className="w-48 lg:ml-2 lg:w-1/5 !box mr-2">
              <option>All Parks</option>
              <option>Active</option>
              <option>Removed</option>
            </FormSelect>

            <FormSelect className="w-48 lg:ml-2 lg:w-1/5 !box mr-2" onChange={(e) => setSelectedLGA(e.target.value)}>
              <option value="" disabled>--All LGA--</option>
              {lagosLGAs.map((lga, index) => (
                <option key={index} value={lga}>{lga}</option>
              ))}
            </FormSelect>

            <div className="relative sm:mt-0 text-slate-500">
              <Lucide
                icon="Calendar"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
              placeholder="Select a date range"
                // value={dateRange}
                onChange={setDateRange}
                options={{
                  
                  startDate: '',
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

        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <DashboardCard
              count={dashboardData?.daily_registered_vehicles}
              label="Daily Registered Vehicles"
              bgColor="bg-orange-200"
              iconFill="primary"
              iconText='text-primary'
            />
            <DashboardCard
              count={dashboardData?.daily_untagged_vehicles}
              label="Daily Untagged Vehicles"
              bgColor="bg-orange-200"
              iconFill="orange"
              iconText='text-orange-300'
            />
            <DashboardCard
              count={dashboardData?.daily_tagged_vehicles}
              label="Daily Tagged Vehicles"
              bgColor="bg-pink-200"
              iconFill="pink"
              iconText='text-pink-600'
            />
            <DashboardCard
              count={dashboardData?.total_registered_vehicles}
              label="Total Registered Vehicles"
              bgColor="bg-green-200"
              iconFill="green"
              iconText=''
            />
            <DashboardCard
              count={dashboardData?.total_untagged_vehicles}
              label="Total Untagged Vehicles"
              bgColor="bg-slate-200"
              iconFill="quinary"
              iconText=''
            />
            <DashboardCard
              count={dashboardData?.total_tagged_vehicles}
              label="Total Tagged Vehicles"
              bgColor="bg-blue-200"
              iconFill="blue"
              iconText=''
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-4 cursor-pointer 2xl:col-span-3 box zoom-in flex">
              <div className={`flex mr-4 items-center justify-center rounded-md bg-green-200 w-10 h-10`}>
                <Lucide
                  icon='Banknote'
                  fill='green'
                  className={`p-1 w-[40px] h-[38px] text-green`}
                />
              </div>
              <div>
                <div className="text-base font-medium ">N{ formatCurrency (dashboardData?.daily_registered_vehicles * 4500)}</div>
                <div className="text-slate-500 text-xs">Daily Registration Fee</div>
              </div>
            </div>

            <div className="col-span-12 p-4 cursor-pointer 2xl:col-span-3 box zoom-in flex">
              <div className={`flex mr-4 items-center justify-center rounded-md bg-green-200 w-10 h-10`}>
                <Lucide
                  icon='Banknote'
                  fill='green'
                  className={`p-1 w-[38px] h-[38px] text-green`}
                />
              </div>
              <div>
                <div className="text-base font-medium">N{formatCurrency(dashboardData?.total_registered_vehicles * 4500)}</div>
                <div className="text-slate-500 text-xs">Total Registration Fee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y px-5">
        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-4 cursor-pointer  box zoom-in">


            <div className="">
                        
                          <div className="mr-auto text-xs">Project Target</div>
                         
                        <div className="flex mt-4">
                          <div className="mr-auto text-xl font-bold text-purple-500">30,000 <span className="text-slate-700 font-normal text-sm">(50%)</span></div>
                          <div className="text-xl font-bold">60,000</div>
                        </div>
                        <Progress className="h-1 mt-2">
                          <Progress.Bar
                            className="w-3/4 bg-primary"
                            role="progressbar"
                            aria-valuenow={0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></Progress.Bar>
                        </Progress>
                      </div>

            </div>
            <div className="col-span-12 p-4 cursor-pointer  box zoom-in">

            <div className="text-base font-medium">Top Performing LGA</div>
              <div className="text-slate-500">Total vehicles successfully registered on Lagrev</div>
            <div className="box mt-4">
                        
                        <div className="mr-auto text-xs">Ikeja LGA</div>
                       
                      <div className="flex mt-2">
                        <div className="mr-auto text-xl font-bold text-purple-500"> 15,000</div>
                        <div className="text-xs">55%</div>
                      </div>
                      <Progress className="h-1 mt-2">
                        <Progress.Bar
                          className="w-3/4 bg-primary"
                          role="progressbar"
                          aria-valuenow={0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></Progress.Bar>
                      </Progress>
                    </div>

              
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
