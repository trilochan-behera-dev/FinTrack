"use client";
import dynamic from "next/dynamic";
import moment from "moment";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { getDataFromAPI, getMonth, getYear } from "@src/services/getAllServices";

interface ChartDonutState {
  series: number[];
}
interface ChartDonutStatsProps {
  title: String
  category: string,
  IsApiCall: boolean
}
const ChartDonut: React.FC<ChartDonutStatsProps> = ({
  title,
  category,
  IsApiCall
}): any => {
  const yearList = getYear();
  const monthList = getMonth();
  const [categoryData, setCategoryData] = useState([])
  const [selectData, setSelectData] = useState({ year: moment().year(), month: moment().month() + 1 });
  const [state, setState] = useState<ChartDonutState>({
    series: [100],
  });
  const fetchCategory = async () => {
    try {
      const response = await getDataFromAPI("get", `api/category/${category}`);
      setCategoryData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchDatas = async () => {
    try {
      var seriesArry: number[] = [];
      const response = await getDataFromAPI("get", `api/chart/?type=${category}&selectType=categoryName&year=${selectData?.year}&month=${selectData?.month}`);
      categoryData.map((data: any) => {
        const isPresent = response?.data.find((res: any) => data?.categoryName == res?.categoryName)
        seriesArry.push(isPresent ? isPresent?.price : 0)
      })
      setState({ series: seriesArry })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useLayoutEffect(() => {
    fetchCategory();
  }, [category, IsApiCall])

  // Call the async function within useEffect
  useMemo(() => {
    if (categoryData?.length) fetchDatas();
  }, [categoryData, selectData?.year, selectData?.month]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: categoryData?.length && state.series.find((ser) => ser > 0) ? categoryData.map((item: any) => item.colorCode) : ["#8e8e8e"],
    labels: categoryData?.length && state.series.find((ser) => ser > 0) ? categoryData.map((item: any) => item.categoryName) : [`No ${category}`],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        }
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(Number(val)) + "%"
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 2600,
    //     options: {
    //       chart: {
    //         width: 380,
    //       },
    //     },
    //   },
    //   {
    //     breakpoint: 640,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
        <div>
          <div className="flex">
            <select
              className="relative inline-flex appearance-none bg-transparent py-1 px-2 text-sm font-medium outline-none"
              onChange={(e) => setSelectData({ year: selectData?.year, month: Number(e?.target?.value) })}
            >
              {
                monthList.map((mth) => (
                  <option value={mth?.id} selected={moment().month() + 1 === mth?.id} key={mth?.id} >{mth?.name}</option>
                ))
              }
            </select>
            <select
              className="relative inline-flex appearance-none bg-transparent py-1 px-2 text-sm font-medium outline-none"
              onChange={(e) => setSelectData({ year: Number(e?.target?.value), month: selectData?.month })}
            >
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
        <div id="ChartDonut" className="sm:mx-auto sm:flex sm:justify-center">
          <ReactApexChart
            options={options}
            series={state.series.find((ser) => ser > 0) ? state.series : [100]}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartDonut;