import _ from "lodash";
import { useState, useRef } from "react";
import fakerData from "../../utils/faker";
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


const lagosLGAs = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
  "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
  "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
  "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
];


function Main() {
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);
  const createTicketRef = useRef(null);
  const addItemRef = useRef(null);
  const [dashboardFilter, setDashboardFilter] = useState<string>();

  return (
    <div className="">

{/*    
      <div className="flex col-span-12 items-center mt-8 intro-y sm:flex-row md:px-[22px] " >

        <div className="flex w-full  text-primary">
            <div className="relative w-1/4 text-slate-500">
              <FormInput
                type="text"
                className=" pr-10 !box"
                placeholder="Search database..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>

        

            <FormSelect className="w-48 ml-2 xl:w-1/5 !box mr-2">
              <option>All Parks</option>
              <option>Active</option>
              <option>Removed</option>
            </FormSelect>

            <FormSelect className="w-48  xl:w-1/5 !box mr-4">
              <option>All LGAs</option>
              <option>Active</option>
              <option>Removed</option>
            </FormSelect>


            <div className="relative mt-3 sm:ml-auto sm:mt-0  text-slate-500">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                
                  value={dashboardFilter}
                  onChange={setDashboardFilter}
                  options={{
                    autoApply: false,
                    singleMode: false,
                    numberOfColumns: 2,
                    numberOfMonths: 2,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
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


      <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0 intro-y bg-gradient-to-r from-primary via-purple-700 to-primary  px-2 lg:px-[22px] py-8  lg:rounded-t-[1.3rem]">

      <div className="col-span-12 intro-y text-black mb-8 bg-secondary p-2">
                

      <div className="flex flex-col lg:flex-row w-full   gap-y-2 text-primary">
            <div className="relative lg:w-1/4 w-full text-slate-500">
              <FormInput
                type="text"
                className=" pr-10 !box"
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

            <FormSelect className="w-48  xl:w-1/5 !box mr-4">
             


              <option value="" disabled>--All LGA--</option>
        {lagosLGAs.map((lga, index) => (
          <option key={index} value={lga}>{lga}</option>
        ))}
            </FormSelect>


            <div className="relative   sm:mt-0  text-slate-500">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                
                  value={dashboardFilter}
                  onChange={setDashboardFilter}
                  options={{
                    autoApply: false,
                    singleMode: false,
                    numberOfColumns: 2,
                    numberOfMonths: 2,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
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

        {/* BEGIN: Item List */}
        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box ">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div>
            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div>
            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div>
            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div>
            
            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div>

            <div className="col-span-12 p-5 flex  cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className={`flex mr-4 items-center justify-center rounded-md  bg-orange-200  w-10 h-10`}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
             <div>
             <div className="text-base font-medium">5000</div>
              <div className="text-slate-500 text-xs">Daily registered Vehicle</div>
             </div>
            </div> 
          
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 ">
        <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">

          <div className="col-span-12 p-5 cursor-pointer 2xl:col-span-3 box zoom-in flex">





          <div className={`flex mr-4 rounded-xl  bg-orange-200 `}>
            <Lucide
              icon='User'
              fill='primary'
              className={`  p-1 w-[32px] h-[32px]   text-black`}
            />
            
          </div>
<div>

<div className="text-base font-medium">5000</div>
            <div className="text-slate-500">Daily registered Vehicle</div>
</div>
          </div>
          <div className="col-span-12 p-5 cursor-pointer  2xl:col-span-3 box zoom-in">
            <div className="text-base font-medium">21000</div>
            <div className="text-slate-500">5 Items</div>
          </div>
          </div>
        </div>

        {/* END: Ticket */}
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* BEGIN: Item List */}
        <div className="col-span-12 intro-y lg:col-span-8">
          <div className="grid grid-cols-12 gap-5 mt-5 lg:mt-0">
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
              <div className="text-base font-medium">Soup</div>
              <div className="text-slate-500">5 Items</div>
            </div>
            <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box bg-primary zoom-in">
              <div className="text-base font-medium text-white">
                List of Activities
              </div>
              <div className="text-white text-opacity-80 dark:text-slate-500">
                8 Items
              </div>
            </div>
       
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 gap-5">
          <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className="text-base font-medium">Soup</div>
            <div className="text-slate-500">5 Items</div>
          </div>
          <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
            <div className="text-base font-medium">Soup</div>
            <div className="text-slate-500">5 Items</div>
          </div>
         
        </div>

        {/* END: Ticket */}
      </div>
      {/* BEGIN: New Order Modal */}
      <Dialog
        open={newOrderModal}
        onClose={() => {
          setNewOrderModal(false);
        }}
        initialFocus={createTicketRef}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">New Order</h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-1">Name</FormLabel>
              <FormInput
                id="pos-form-1"
                type="text"
                className="flex-1"
                placeholder="Customer name"
              />
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-2">Table</FormLabel>
              <FormInput
                id="pos-form-2"
                type="text"
                className="flex-1"
                placeholder="Customer table"
              />
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-3">Number of People</FormLabel>
              <FormInput
                id="pos-form-3"
                type="text"
                className="flex-1"
                placeholder="People"
              />
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setNewOrderModal(false);
              }}
              className="w-32 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-32"
              ref={createTicketRef}
            >
              Create Ticket
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
      {/* END: New Order Modal */}
      {/* BEGIN: Add Item Modal */}
      <Dialog
        open={addItemModal}
        onClose={() => {
          setAddItemModal(false);
        }}
        initialFocus={addItemRef}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              {fakerData[0].foods[0].name}
            </h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-4" className="form-label">
                Quantity
              </FormLabel>
              <div className="flex flex-1">
                <Button
                  type="button"
                  className="w-12 mr-1 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500"
                >
                  -
                </Button>
                <FormInput
                  id="pos-form-4"
                  type="text"
                  className="w-24 text-center"
                  placeholder="Item quantity"
                  value="2"
                  onChange={() => {}}
                />
                <Button
                  type="button"
                  className="w-12 ml-1 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-5">Notes</FormLabel>
              <FormTextarea
                id="pos-form-5"
                placeholder="Item notes"
              ></FormTextarea>
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setAddItemModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-24"
              ref={addItemRef}
            >
              Add Item
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
      {/* END: Add Item Modal */}
      </div>
  );
}

export default Main;
