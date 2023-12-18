import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../SVG/Dropdown";
import Checkbox from "../Checkboxes/Checkbox";
import { getDataFromAPI } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";

export default function Forms({ type, setIsApiCall }: any) {
    const { setShowAlert } = useContext(UserContext) as any;
    const initialData = { name: "", type: type, category: "", selectedDate: moment().format("YYYY-MM-DD"), price: 0, modeOfPayment: "cash", paymentStatus: true, details: "" }
    const [details, setDetails] = useState(initialData);
    const [category, setCategory] = useState() as any;

    const handleStatus = (status: boolean) => {
        setDetails({ ...details, paymentStatus: status })
    }

    const handleSave = async () => {
        if (!details?.name.trim() || !details?.category || !details?.price) {
            setShowAlert({ title: "Please fill all the details", status: false, isOpen: true })
        } else {
            const response = await getDataFromAPI('post', 'api/details', details);
            if (response.status) {
                setDetails(initialData);
                setIsApiCall(true);
            }
            setShowAlert({ title: response.message, status: response.status, isOpen: true })
        }
    }
    const fetchDatas = async () => {
        try {
            const response = await getDataFromAPI('get', `api/category/${details?.type}`);
            if (response.status) {
                setCategory(response?.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        if (details?.type) {
            fetchDatas();
        }
    }, [details?.type]);

    return (
        <div className="grid grid-cols-1 gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add New Data
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6.5 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter details"
                            value={details?.name}
                            onChange={(e) => setDetails({ ...details, name: e?.target?.value })}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            value={details?.selectedDate}
                            onChange={(e) => setDetails({ ...details, selectedDate: e?.target?.value })}
                            placeholder="Select Date"
                            className={`custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter price"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            value={details?.price}
                            onChange={(e) => setDetails({ ...details, price: Number(e?.target?.value) })}
                        />
                    </div>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.8">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                        fill="#637381"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                        fill="#637381"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                        fill="#637381"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <select className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`} onChange={(e) => setDetails({ ...details, category: e?.target?.value })}>
                            <option>Select Category</option>
                            {category?.map((cat: any) => (
                                <option value={cat?.categoryName} selected={cat.categoryName === details?.category}>{cat?.categoryName}</option>
                            ))}
                        </select>
                        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <Dropdown />
                        </span>
                    </div>
                    <div className="relative z-20 py-2 md:py-0 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-1 z-30 -translate-y-1/2">
                            <Checkbox status={details?.paymentStatus} setStatus={handleStatus} />
                        </span>
                    </div>
                    <div className="flex w-full justify-center cursor-pointer rounded bg-primary p-3 font-medium text-gray capitalize" onClick={handleSave} >
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}