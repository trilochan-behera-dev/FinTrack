"use client";
import dynamic from "next/dynamic";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { getDataFromAPI, getYear } from "@src/services/getAllServices";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface ChartMonthlyState {
  series: {
    name: string;
    data: number[];
  }[];
}
interface ChartMonthlyStatsProps {
  title: string,
  category: string,
  barColor: string[]
  IsApiCall: boolean
}

const ChartMonthly: React.FC<ChartMonthlyStatsProps> = ({
  title,
  category,
  barColor,
  IsApiCall
}) => {
  const yearList = getYear();
  const [selectYear, setSelectYear] = useState(moment().year());
  const [state, setState] = useState<ChartMonthlyState>({
    series: [{ name: category, data: [] }],
  });
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: barColor,
    chart: {
      fontFamily: "sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: Math.max(...state?.series[0].data) + 1000 || 1000,
    },
  };

  const fetchApexData = async () => {
    const response = await getDataFromAPI("get", `api/chart?type=${category}&selectType=month&year=${selectYear}`);
    setState({
      series: [{ name: category, data: response?.data }],
    })
  }

  useMemo(() => {
    fetchApexData();
  }, [category, selectYear, IsApiCall])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-black dark:text-white">
          {title}
        </div>
        <div className="text-sm font-semibold text-black dark:text-white">
          <select className="relative w-full appearance-none rounded border border-stroke bg-transparent px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary cursor-pointer" onChange={(e) => setSelectYear(Number(e?.target?.value))}>
            {
              yearList.map((yr) => (
                <option value={yr} selected={moment().year() === yr} key={yr}>{yr}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div>
        <div id="ChartMonthly" className="-ml-5 h-[355px]">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartMonthly;
