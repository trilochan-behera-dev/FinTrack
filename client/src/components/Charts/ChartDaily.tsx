"use client";
import moment from "moment";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import React, { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { getDataFromAPI, getDateArray, getMonth, getSampleArray, getYear } from "@src/services/getAllServices";

interface ChartDailyState {
  series: { data: number[] }[];
}
interface ChartDailyStatsProps {
  title: String,
  category: string
  barColor: string[]
  IsApiCall: boolean
}

const ChartDaily: React.FC<ChartDailyStatsProps> = ({
  title,
  category,
  barColor,
  IsApiCall
}) => {
  const yearList = getYear();
  const monthList = getMonth();
  const [selectData, setSelectData] = useState({ year: moment().year(), month: moment().month() + 1 })
  const [shownDates, setShownDates] = useState([]) as any;
  const [barState, setBarState] = useState<ChartDailyState>({
    series: [{ data: [] }],
  });
  const options: ApexOptions = {
    colors: barColor,
    chart: {
      fontFamily: "sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 2600,
    //     options: {
    //       chart: {
    //         width: 1000,
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 640,
    //     options: {
    //       chart: {
    //         width: 1000,
    //       },
    //     },
    //   },
    // ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: shownDates,
      floating: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",
      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
    }
  };

  const fetchApexData = async () => {
    const response = await getDataFromAPI("get", `api/chart?type=${category}&selectType=date&year=${selectData?.year}&month=${selectData?.month}`);
    const arry = getSampleArray(moment(`${selectData?.year}-${selectData?.month}`, 'YYYY-MM').daysInMonth());
    response.data.map((res: any) => {
      arry[res.date - 1] = res.price
    })
    setBarState({
      series: [{ data: arry }],
    })
  }

  useMemo(() => {
    const dateArray = getDateArray(selectData?.month, selectData?.year);
    setShownDates(dateArray);
    fetchApexData();
  }, [selectData?.month, selectData?.year, IsApiCall])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-black dark:text-white">
          {title}
        </div>
        <div className="flex gap-2">
          <div className="text-sm font-semibold text-black dark:text-white">
            <select className="relative w-full appearance-none rounded border border-stroke bg-transparent px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary cursor-pointer" onChange={(e) => setSelectData({ year: selectData?.year, month: Number(e?.target?.value) })}>
              {
                monthList.map((mth) => (
                  <option value={mth?.id} selected={moment().month() + 1 === mth?.id} key={mth?.id}>{mth?.name}</option>
                ))
              }
            </select>
          </div>
          <div className="text-sm font-semibold text-black dark:text-white">
            <select className="relative w-full appearance-none rounded border border-stroke bg-transparent px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary cursor-pointer" onChange={(e) => setSelectData({ year: Number(e?.target?.value), month: selectData?.month })}>
              {
                yearList.map((yr) => (
                  <option value={yr} selected={moment().year() === yr} key={yr}>{yr}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="ChartDaily" className="-ml-5">
          <ApexCharts
            options={options}
            series={barState.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartDaily;
