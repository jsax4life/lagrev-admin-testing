import React from 'react';
import Lucide from "../../base-components/Lucide";

interface DashboardCardProps {
  count: number | undefined;
  label: string;
  bgColor: string;
  iconFill: string;
  iconText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ count, label, bgColor, iconFill, iconText }) => {
  return (
    <div className="col-span-12 p-4 flex cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
      <div className={`flex mr-4 items-center justify-center rounded-md ${bgColor} w-10 h-10`}>
        <Lucide icon='User' fill={iconFill} className={`p-1 w-[32px] h-[32px] ${iconText}`} />
      </div>
      <div>
        <div className="text-base font-medium">{count}</div>
        <div className="text-slate-500 text-xs">{label}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
