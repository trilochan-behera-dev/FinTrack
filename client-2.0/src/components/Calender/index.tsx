import moment from "moment";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { getDataFromAPI, getDateArray, getWeek } from "@src/services/getAllServices";
import { useEffect, useState } from "react";

const Calendar = () => {
  const [dateArray, setDateArray] = useState([]) as any;
  const [selectDate, setSelectDate] = useState(0)
  const [data, setData] = useState([]) as any;
  const week = getWeek();
  useEffect(() => {
    let dayOfMonth = getDateArray(moment().month() + 1, moment().year());
    // Set the date to the first day of the month
    const currentDate = moment().startOf('month');
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const firstDayIndex = currentDate.day();

    if (firstDayIndex) {
      const firstZero = Array(firstDayIndex).fill(0);
      dayOfMonth.unshift(...firstZero);
    }
    const reminder = dayOfMonth.length % 7;
    if (reminder) {
      const ZeroArray = Array(7 - reminder).fill(0) as any;
      dayOfMonth.push(...ZeroArray);
    }
    const array = dayOfMonth.map(element => {
      return +element;
    });
    setDateArray(array);
    fetchDatas();
  }, []);


  const fetchDatas = async () => {
    try {
      const response = await getDataFromAPI("get", `api/chart?type=calendar`);
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {
                week.map((w, i) => (
                  <th className={`flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5 ${w.dayValue === 0 ? 'rounded-tl-sm' : w.dayValue === 6 ? 'rounded-tr-sm' : ''}`} key={i}>
                    <span className="hidden lg:block"> {w.fullName} </span>
                    <span className="block lg:hidden"> {w.shortName} </span>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            < tr className="grid grid-cols-7" >
              {
                dateArray.map((date: any, i: any) => (
                  <td className={`ease relative h-16 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-3 md:h-25 xl:h-28 `} key={i} onClick={() => setSelectDate(date)}>
                    {date > 0 ?
                      <span className="font-medium text-black dark:text-white">
                        <p className={` dark:bg-primarydark h-6 w-6 rounded-full flex items-center m-auto justify-center text-white text-xs ${moment().date() === date ?  "bg-primary": "bg-graydark"}`}>{date}</p>
                        <div className="text-sm hidden xl:flex flex-col gap-1">
                          {data.map((d: any, i: any) => d?.date === date && (
                            <div key={i}>
                              {d.data?.income && <p> {d.data?.income} (Income) </p>}
                              {d.data?.savings && <p> {d.data?.savings} (Savings) </p>}
                              {d.data?.expense && <p> {d.data?.expense} (Expense) </p>}
                            </div>
                          ))}
                        </div>
                      </span> :
                      <span className="font-medium text-black dark:text-white">
                        <p className={`${date && 'bg-secondary h-8 w-8 rounded-full flex items-center justify-center text-white text-xs'}`} ></p>
                      </span>
                    }
                  </td>
                ))
              }
            </tr>
            {/* <!-- Line 5 --> */}
          </tbody>
        </table>

        {
          data?.map((d: any, i: any) => d.date === selectDate && (
            <div key={i} className="bg-primary dark:bg-primarydark bg-opacity-50  w-full p-4 h-32 mt-4 text-white font-bold xl:hidden">
              <p>Date: {d.date}/{moment().month() + 1}/{moment().year()}</p>
              {d.data?.income && <p> - {d.data?.income} (Income) </p>}
              {d.data?.savings && <p> -  {d.data?.savings} (Savings) </p>}
              {d.data?.expense && <p> - {d.data?.expense} (Expense) </p>}
            </div>
          ))
        }
      </div >
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default Calendar;
