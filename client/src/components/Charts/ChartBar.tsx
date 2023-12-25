"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { getDataFromAPI, getDeviceType, getSampleArray, getYear } from "@src/services/getAllServices";
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
  const deviceType = getDeviceType();
  const [year, setYear] = useState(moment().year());
  const [response, setResponse] = useState() as any
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
      categories: deviceType != "Mobile" ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["Dec"],
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
  const setValue = (data: any) => {
    if (data) {
      const dynamicData = JSON.parse(JSON.stringify(data))

      const dataArray = [
        { name: "Income", data: getSampleArray(deviceType != "Mobile" ? 12 : 1) },
        { name: "Expense", data: getSampleArray(deviceType != "Mobile" ? 12 : 1) },
        { name: "Savings", data: getSampleArray(deviceType != "Mobile" ? 12 : 1) },
      ];

      const propertyMap = {
        income: 0, expense: 1, savings: 2
      } as any;

      // console.log('deviceType: ', deviceType);

      if (deviceType != "Mobile") {
        dynamicData?.forEach((res: any) => {
          Object.keys(propertyMap).forEach((property) => {
            if (property in res.data && res.data[property]) {
              const dataIndex = propertyMap[property];
              dataArray[dataIndex].data[res.month - 1] = res.data[property];
            }
          });
        });
      } else {
        console.log("hii")
        dynamicData?.forEach((res: any) => {
          console.log(res, "hii")
          if (res.month === moment().month() + 1) {
            Object.keys(propertyMap).forEach((prop) => {
              const dataIndex = propertyMap[prop];
              console.log('res.month: ', res.month, prop, res.data[prop], dataIndex);
              dataArray[dataIndex].data = [res.data[prop]]
            })
          }
        });
      }


      setBarState({ series: dataArray })
    }
  }

  const fetchDatas = async () => {
    try {
      const response = await getDataFromAPI("get", `api/chart?type=all&year=${year}`);
      setValue(response?.data);
      setResponse(response?.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [year])

  useEffect(() => {
    setValue(response)
  }, [deviceType])
  


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
              className="relative inline-flex appearance-none cursor-pointer bg-transparent py-1 px-2 text-sm font-medium outline-none"
              onChange={(e) => setYear(Number(e?.target?.value))}
            >
              {
                yearList.map((yr) => (
                  <option value={yr} selected={moment().year() === yr} key={yr}>{yr}</option>
                ))
              }
            </select>
            <Dropdown />
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
