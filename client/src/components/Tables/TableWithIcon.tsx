import moment from "moment";
import Dropdown from "../Svg/Dropdown";
import DetailsPopup from "../Modal/DetailsPopup";
import Pagination from "../Pagination";
import Warnings from "../Alert/Warning";
import EyeSvg from "../Svg/EyeSvg";
import Trash from "../Svg/Trash";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";

const TableWithIcon = ({ header, type, IsApiCall, setIsApiCall = () => { } }: any) => {
  const [viewPopup, setViewPopup] = useState(false);
  const { setShowAlert } = useContext(UserContext) as any;
  const [clickItem, setClickItem] = useState();
  const [allData, setAllData] = useState([]) as any;
  const [tableData, setTableData] = useState([]) as any;
  const numberOfPages = 10;
  const [selectData, setSelectData] = useState({
    "type": type === "all" ? "" : type,
    "status": "",
    "date": moment().format("YYYY-MM")
  });
  const [isWarnings, setIsWarnings] = useState({
    status: false,
    id: "",
  })
  const [pagination, setPagination] = useState({
    start: 0,
    end: numberOfPages
  })

  const handlePopup = (packageItem: any) => {
    setViewPopup(true);
    setClickItem(packageItem);
  }

  const handleDelete = async (id: any) => {
    const response = await getDataFromAPI('delete', `api/details/${isWarnings?.id}`);
    if (response.status) {
      const updateDetails = tableData.filter((data: any) => data._id != isWarnings?.id)
      setTableData(updateDetails);
      setAllData(updateDetails);
      setIsApiCall(true);
      setIsWarnings({ ...isWarnings, status: false });
    }
    setShowAlert({ title: response.message, status: response.status, isOpen: true });
  }

  const handleStatus = (e: any) => {
    if (!e?.target?.value) {
      setTableData(allData)
    } else {
      const newdata = allData.filter((data: any) => +e?.target?.value ? data.paymentStatus : !data.paymentStatus)
      setTableData(newdata);
    }
    setPagination({ start: 0, end: numberOfPages })
  }

  // Define an asynchronous function
  const fetchDatas = async () => {
    try {
      const response = await getDataFromAPI('get', 'api/details', selectData);
      if (response.status) {
        setTableData(response.data);
        setAllData(response.data);
        setIsApiCall(false);
        setPagination({ start: 0, end: numberOfPages })
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [IsApiCall,selectData]);


  return (
    <div className={`rounded-sm border border-stroke bg-white ${!isWarnings?.status ? "pt-4" : "h-[600px] flex justify-center items-center"} shadow-default dark:border-strokedark dark:bg-boxdark`}>
      {
        isWarnings?.status ?
          <Warnings onCancel={() => setIsWarnings({ ...isWarnings, status: false })} onClick={handleDelete} />
          :
          <>
            {
              viewPopup ?
                <p className="text-xl font-medium px-4">Edit Details</p>
                :
                <div className={`sm:flex justify-between items-center px-8`}>
                  <div className="relative">
                    <input
                      type="month"
                      value={selectData?.date}
                      onChange={(e) => setSelectData({ ...selectData, date: e?.target?.value })}
                      className={`custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                  </div>
                  <div className="flex gap-2 pt-2 sm:pt-0 justify-end">
                    {
                      type === "all" &&
                      <div className="relative bg-white w-1/2 sm:w-full dark:bg-form-input">
                        <select className={`relative  w-full sm:w-fit appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                          onChange={(e) => setSelectData({ ...selectData, type: e?.target?.value })}
                        >
                          <option value="">Select Type</option>
                          <option value="income">Income</option>
                          <option value="savings">Savings</option>
                          <option value="expense">Expense</option>
                        </select>
                        <span className="absolute top-1/2 right-4 -translate-y-1/2">
                          <Dropdown />
                        </span>
                      </div>
                    }
                  </div>
                </div>
            }
            <div className={`max-w-full overflow-x-auto ${!viewPopup && "min-h-[600px]"} pt-4 overflow-auto`}>
              {
                viewPopup ?
                  <DetailsPopup clickItem={clickItem} setViewPopup={setViewPopup} setIsApiCall={setIsApiCall} /> :
                  tableData?.length ?
                    <table className="w-full py-4 ">
                      <thead>
                        <tr className="bg-primary bg-opacity-20 dark:bg-meta-3">
                          {header.map((h: any, i: any) => (
                            <th className={`w-[160px] py-3 text-left font-medium text-black dark:text-white ${i == 0 && "pl-9"} `} key={i}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData?.slice(pagination.start, pagination?.end)?.map((packageItem: any, key: string) => (
                          <tr key={key} className="hover:bg-gray-2 h-auto  dark:hover:bg-bodydark2 dark:hover:bg-opacity-25 cursor-pointer">
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark pl-9">
                              <h5 className="w-[160px] font-medium text-black dark:text-white">
                                {moment(`${packageItem.date}/${packageItem.month}/${packageItem.year}`, 'DD/MM/YYYY').format('Do MMM, YYYY')}
                              </h5>
                            </td>
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                              <p className="w-[160px] text-black dark:text-white capitalize">
                                {packageItem.price}
                              </p>
                            </td>
                            {
                              type === "all" ?
                                <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                                  <p className={`capitalize w-[160px] font-medium ${packageItem?.type === "savings" ? "text-success" : packageItem?.type === "expense" ? "text-danger" : "text-warning"}`}>
                                    {packageItem.type}
                                  </p>
                                </td>
                                :
                                <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                                  <p className="text-black w-[160px] dark:text-white capitalize truncate	">
                                    {packageItem.name}
                                  </p>
                                </td>
                            }
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                              <p className="text-black w-[160px] dark:text-white">
                                {packageItem.category}
                              </p>
                            </td>
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                              <div className="flex w-[160px] items-center space-x-3.5">
                                <div className="hover:text-primary" onClick={() => handlePopup(packageItem)}>
                                  <EyeSvg />
                                </div>
                                <div className="hover:text-danger" onClick={() => setIsWarnings({ status: true, id: packageItem._id })}>
                                  <Trash />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> :
                    <div className="flex justify-center flex-col items-center gap-2 h-[58vh] text-primary font-bold text-xl">
                      <p className="text-6xl">😢</p>
                      <p>No Data Present</p>
                    </div>
              }
            </div>
            <div className={`flex w-full gap-2 justify-end px-8 items-center  bg-primary font-medium text-primarydark h-12 dark:text-white ${viewPopup && "invisible"}`}>
              <Pagination pagination={pagination} setPagination={setPagination} tableData={tableData} numberOfPages={numberOfPages} />
            </div>
          </>
      }
    </div >
  );
};

export default TableWithIcon;
