import moment from "moment";
import Dropdown from "../SVG/Dropdown";
import DetailsPopup from "../Modal/DetailsPopup";
import Pagination from "../Pagination";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";
import Warnings from "../Alert/Warning";

const TableWithIcon = ({ header, type, IsApiCall, setIsApiCall=()=>{} }: any) => {
  const [viewPopup, setViewPopup] = useState(false);
  const { setShowAlert } = useContext(UserContext) as any;
  const [clickItem, setClickItem] = useState();
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
      setIsApiCall(true);
      setIsWarnings({ ...isWarnings, status: false });
    }
    setShowAlert({ title: response.message, status: response.status, isOpen: true });
  }

  // Define an asynchronous function
  const fetchDatas = async () => {
    try {
      const response = await getDataFromAPI('get', 'api/details', selectData);
      if (response.status) {
        setTableData(response.data);
        setIsApiCall(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [selectData, IsApiCall]);


  return (
    <div className={`rounded-sm border border-stroke bg-white ${!isWarnings?.status ? "pt-4":"h-[600px] flex justify-center items-center"} shadow-default dark:border-strokedark dark:bg-boxdark`}>
      {
        isWarnings?.status ?
          <Warnings onCancel={() => setIsWarnings({ ...isWarnings, status: false })} onClick={handleDelete} />
          :
          <>
            <div className="sm:flex justify-between items-center px-8">
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
                  <div className="relative z-20 bg-white w-1/2 sm:w-full dark:bg-form-input">
                    <select className={`relative z-20  w-full sm:w-fit appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                      onChange={(e) => setSelectData({ ...selectData, type: e?.target?.value })}
                    >
                      <option value="">Select Type</option>
                      <option value="income">Income</option>
                      <option value="savings">Savings</option>
                      <option value="expense">Expense</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <Dropdown />
                    </span>
                  </div>
                }
                <div className="relative z-20 bg-white w-1/2 sm:w-full dark:bg-form-input">
                  <select className={`relative z-20 w-full sm:w-fit appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                    onChange={(e) => setSelectData({ ...selectData, status: e?.target?.value })}
                  >
                    <option value="">All</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <Dropdown />
                  </span>
                </div>

              </div>
            </div>
            <div className={`max-w-full overflow-x-auto ${!viewPopup && "min-h-[58vh]"} h-[63vh] pt-4 overflow-auto`}>
              {
                viewPopup ?
                  <DetailsPopup clickItem={clickItem} setViewPopup={setViewPopup} setIsApiCall={setIsApiCall} /> :
                  tableData?.length ?
                    <table className="w-full py-4 ">
                      <thead>
                        <tr className="bg-primary bg-opacity-10 dark:bg-meta-4">
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
                                  <p className={`capitalize w-[160px] ${packageItem?.type === "savings" ? "text-success" : packageItem?.type === "expense" ? "text-danger" : "text-warning"}`}>
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
                              <p className="text-black w-[160px] dark:text-white capitalize">
                                {packageItem.category}
                              </p>
                            </td>
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                              <p
                                className={`inline-flex rounded-full justify-center py-1 text-[12px] font-bold ${packageItem.paymentStatus
                                  ? "text-success"
                                  : "text-warning"
                                  }`}
                              >
                                {packageItem.paymentStatus ? "Paid" : "Unpaid"}
                              </p>
                            </td>
                            <td className="border-b w-[160px] border-[#eee] h-8 py-[11px] dark:border-strokedark">
                              <div className="flex w-[160px] items-center space-x-3.5">
                                <button className="hover:text-primary" onClick={() => handlePopup(packageItem)}>
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                      fill=""
                                    />
                                    <path
                                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                      fill=""
                                    />
                                  </svg>
                                </button>
                                <button className="hover:text-primary" onClick={() => setIsWarnings({ status: true, id: packageItem._id })}>
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                      fill=""
                                    />
                                    <path
                                      d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                      fill=""
                                    />
                                    <path
                                      d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                      fill=""
                                    />
                                    <path
                                      d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                      fill=""
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> :
                    <div className="flex justify-center items-center h-[58vh]">No Data Present</div>
              }
            </div>
            <div className="flex w-full gap-2 justify-end px-8 items-center  bg-success font-medium text-bodydark1 h-12 dark:text-white">
              <Pagination pagination={pagination} setPagination={setPagination} tableData={tableData} numberOfPages={numberOfPages} />
            </div>
          </>
      }


    </div >
  );
};

export default TableWithIcon;
