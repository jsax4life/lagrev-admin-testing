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
import { formatCurrency } from "../../utils/utils";

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


const activity = [
  {
    id: 1,
    type: 'assignment',
    person: { name: 'Eduardo Benz', href: '#' },
    // imageUrl:
    //   'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'bg-rose-500' },
      { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'assignment',
    person: { name: 'Jason Meyers', href: '#' },
    // imageUrl:
    //   'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Main() {
  const { user } = useContext(UserContext);

  const [dateRange, setDateRange] = useState<string>("");
  const [selectedLGA, setSelectedLGA] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpiData, setKpiData] = useState<any>(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (user?.token) {
      fetchDashboardData();
    }
  }, [user?.token]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // console.log('true')

      setDateRange("");
      return;
    }

    fetchDashboardData();
  }, [dateRange, selectedLGA]);

  useEffect(() => {
    if (user?.token) {
      fetchKPIData();
    }
  }, [user?.token]);

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

           

            <FormSelect
              className="w-48 lg:ml-2 lg:w-1/5 !box mr-2"
              onChange={(e) => setSelectedLGA(e.target.value)}
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
                placeholder="Select a date range"
                // value={dateRange}
                onChange={setDateRange}
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
        </div>

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




            <div className="flow-root">
              <h2 className="text-lg mb-4">Activity Log</h2>
              <div className="flex mb-4 items-center">   <Lucide icon="ArrowUp" className="h-5 w-5 text-green-600"  /> <p className="text-xs text-slate-500">15% this month</p> </div>
      <ul role="list" className="-mb-8">
        {activity.map((activityItem: any, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activity.length - 1 ? (
                <span className="absolute top-3 left-2 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                { activityItem.type === 'assignment' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-2 w-2  bg-purple-800 rounded-full ring-4 ring-white flex items-center justify-center">
                        {/* <Lucide icon="Activity" className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                        </div>
                      </div>
                    </div>
                   

<div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Commented {activityItem.date}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'tags' ? (
                  <>
                    <div>
                    <div className="relative px-1">
                        <div className="h-2 w-2  bg-purple-800 rounded-full ring-4 ring-white flex items-center justify-center">
                        {/* <Lucide icon="Activity" className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>{' '}
                          added tags
                        </span>{' '}
                        <span className="mr-0.5">
                          {activityItem?.tags.map((tag: { name:  ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>  | undefined; href: string | undefined; color: string; }, index: any) => (
                            <Fragment key={index}>
                              <a
                                href={tag.href}
                                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                              >
                                <span className="absolute flex-shrink-0 flex items-center justify-center">
                                  <span
                                    className={classNames(tag.color, 'h-1.5 w-1.5 rounded-full')}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="ml-3.5 font-medium text-gray-900">{tag.name}</span>
                              </a>{' '}
                            </Fragment>
                          ))}
                        </span>
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : null}
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
