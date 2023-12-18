"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { getDataFromAPI, getSampleArray, getYear } from "@src/services/getAllServices";
import Dropdown from "../SVG/Dropdown";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartBarState {
  series: {
    name: string;
    data: number[];
  }[];
}
interface ChartBarStatsProps {
  title: string,
  barColor: string[]
}

const ChartBar: React.FC<ChartBarStatsProps> = ({
  title,
  barColor
}) => {
  const yearList = getYear();
  const [year, setYear] = useState(moment().year());
  const [barState, setBarState] = useState<ChartBarState>({
    series: [],
  });


  const options: ApexOptions = {
    colors: barColor,
    chart: {
      fontFamily: "sans-serif",
      type: "bar",
      height: 335,
      width: "100%",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "50%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "sans-serif",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const fetchDatas = async () => {
    try {
      const response = await getDataFromAPI("get", `api/chart?type=all&year=${year}`);
      const dataArray = [
        { name: "Income", data: getSampleArray(12) },
        { name: "Expense", data: getSampleArray(12) },
        { name: "Savings", data: getSampleArray(12) },
      ];

      const propertyMap = {
        income: 0, expense: 1, savings: 2
      } as any;

      response.data?.forEach((res: any) => {
        Object.keys(propertyMap).forEach((property) => {
          if (property in res.data && res.data[property]) {
            const dataIndex = propertyMap[property];
            dataArray[dataIndex].data[res.month - 1] = res.data[property];
          }
        });
      });
      setBarState({ series: dataArray })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [year])



  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-8 h-full shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
        <div>
          <div className="flex items-center px-3 cursor-pointer">
            <select
              className="relative z-20 inline-flex appearance-none cursor-pointer bg-transparent py-1 px-2 text-sm font-medium outline-none"
              onChange={(e) => setYear(Number(e?.target?.value))}
            >
              {
                yearList.map((yr) => (
                  <option value={yr} selected={moment().year() === yr} key={yr}>{yr}</option>
                ))
              }
            </select>
            <Dropdown/>
          </div>
        </div>
      </div>

      <div>
        <div id="ChartBar" className="-ml-5 -mb-9 min-w-[400px] overflow-auto">
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

export default ChartBar;
