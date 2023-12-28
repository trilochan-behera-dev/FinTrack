import React, { ReactNode } from 'react';
interface CardDataStatsProps {
  cardData: any,
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  cardData,
  children,
}) => {
  const rupee = "₹";
  const { title, total, rate } = cardData;
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary bg-opacity-10 dark:bg-meta-3 pl-1">
          {children}
        </div>
        <span className="text-lg font-medium">{title}</span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {rupee} {total}
          </h4>
        </div>
        <span
          className={`flex items-center gap-1 text-sm font-medium ${status ? 'text-meta-2'
            : 'text-meta-1'} `}
        >
          {rate}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
