import React from 'react';
import Lucide from "../../base-components/Lucide";
import LoadingIcon from '../../base-components/LoadingIcon';

interface DashboardCardProps {
  count: number | undefined;
  label: string;
  bgColor: string;
  iconFill: string;
  iconText: string;
  laadingCount: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ count, label, bgColor, iconFill, iconText, laadingCount }) => {
  return (
    <div className="col-span-12 px-2 py-4 flex  space-x-4 justify-center items-center cursor-pointer sm:col-span-4  bg-white  shadow-lg rounded-xl zoom-in ">
      <div className={`flex items-center justify-center rounded-md ${bgColor} w-10 h-10`}>
        <Lucide icon='User' fill={iconFill} className={`p-1 w-[32px] h-[32px] ${iconText}`} />
      </div>
      <div className=''>
        <div className="text-lg font-medium ">{laadingCount? 
        
        (
          <div className="flex flex-col items-center justify-end col-span-6 sm:col-span-3 xl:col-span-2">
          <LoadingIcon icon="three-dots" className="w-6 h-6" />
        </div>
  ) : count
   
        
        }</div>
        <div className="text-slate-400 text-xs">{label}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
