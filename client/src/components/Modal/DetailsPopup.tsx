import Checkbox from "../Checkboxes/Checkbox";
import { UserContext } from "@pages/_app";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";

export default function DetailsPopup({ clickItem, setViewPopup, setIsApiCall }: any) {
    const { setShowAlert } = useContext(UserContext) as any;
    const [isClick, setIsClick] = useState(false);
    const [category, setCategory] = useState([]);
    const [updateData, setUpdateData] = useState(clickItem)
    const fetchDatas = async () => {
        try {
            const response = await getDataFromAPI('get', `api/category/${updateData?.type}`);
            if (response.status) {
                setCategory(response?.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDate = (e: any) => {
        const value = e?.target?.value;
        const date = value.split('-');
        setUpdateData({ ...updateData, year: date[0], month: date[1], date: date[2] })
    }
    const handleUpdate = async () => {
        const response = await getDataFromAPI('patch', `api/details/${updateData?._id}`, updateData);
        setShowAlert({ title: response.message, status: response.status, isOpen: true });
        setIsApiCall(true);
        setIsClick(false);
        setViewPopup(false);
    }

    // Call the async function within useEffect
    useEffect(() => {
        fetchDatas();
    }, [updateData?.type]); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className="grid gap-8 min-h-[58vh] h-[59.5vh]">
            <div className="rounded-sm border py-6 xl:py-0 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke p-4 dark:border-strokedark">
                    <div className="font-medium text-black dark:text-white capitalize">
                        {updateData?.type} Information ( {updateData?.date.toString().length === 1 ? `0${updateData?.date}` : updateData?.date}/{updateData?.month}/{updateData?.year} )
                    </div>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                                {updateData?.type} Name
                            </label>
                            <input
                                type="text"
                                value={updateData?.name}
                                disabled={!isClick}
                                onChange={(e) => setUpdateData({ ...updateData, name: e?.target?.value })}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                                {updateData?.type} Type
                            </label>
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
                                <select className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${!isClick && "bg-form-strokedark bg-opacity-10"}`} disabled={!isClick} onChange={(e) => setUpdateData({ ...updateData, type: e?.target?.value })}>
                                    <option value="income" selected={updateData?.type === "income"}>Income</option>
                                    <option value="savings" selected={updateData?.type === "savings"}>Savings</option>
                                    <option value="expense" selected={updateData?.type === "expense"}>Expense</option>
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                                {updateData?.type} Category
                            </label>
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
                                <select className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${!isClick && "bg-form-strokedark bg-opacity-10"}`} disabled={!isClick}
                                    onChange={(e) => setUpdateData({ ...updateData, category: e?.target?.value })}>
                                    {category.map((cat: any, i:any) => (
                                        <option value={cat?.categoryName?.toLowerCase()} selected={updateData?.category?.toLowerCase() === cat?.categoryName?.toLowerCase()} key={i}>{cat?.categoryName}</option>
                                    ))}
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                                {updateData?.type} Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={`${updateData?.year}-${updateData?.month}-${updateData?.date.toString().length === 1 ? `0${updateData?.date}` : updateData?.date}`}
                                    disabled={!isClick}
                                    onChange={handleDate}
                                    className={`custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${!isClick && "bg-form-input bg-opacity-5"}`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                                {updateData?.type} Price
                            </label>
                            <input
                                type="text"
                                value={updateData?.price}
                                disabled={!isClick}
                                onChange={(e) => setUpdateData({ ...updateData, price: Number(e?.target?.value) })}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white">
                                Mode of payment
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <Checkbox status={updateData?.paymentStatus} setStatus={(status: any) => setUpdateData({ ...updateData, paymentStatus: status })} />
                                </span>
                                <select className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${!isClick && "bg-form-strokedark bg-opacity-10"}`} disabled={!isClick}
                                    onChange={(e) => setUpdateData({ ...updateData, modeOfPayment: e?.target?.value })}>
                                    <option value="cash" selected={updateData?.modeOfPayment === "cash"}>Cash</option>
                                    <option value="upi" selected={updateData?.modeOfPayment === "upi"}>UPI</option>
                                    <option value="debit card" selected={updateData?.modeOfPayment === "debit card"}>Debit Card</option>
                                    <option value="credit card" selected={updateData?.modeOfPayment === "credit card"}>Credit Card</option>
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="flex justify-start items-center gap-3 px-4">
                                <div className="flex items-center gap-1">
                                    <div
                                        className="box flex h-2 w-2 items-center justify-center rounded border bg-success"
                                    >
                                    </div>
                                    <span className="text-xs">Paid</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div
                                        className="box flex h-2 w-2 items-center justify-center rounded border bg-warning"
                                    >
                                    </div>
                                    <span className="text-xs">Not Paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 block font-medium text-black dark:text-white capitalize">
                            {updateData?.type} Details
                        </label>
                        <textarea
                            rows={6}
                            value={updateData?.details}
                            disabled={!isClick}
                            onChange={(e) => setUpdateData({ ...updateData, details: e?.target?.value })}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-end gap-4.5 px-8">
                    <div
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white cursor-pointer"
                        onClick={() => setViewPopup(false)}
                    >
                        Cancel
                    </div>
                    {
                        isClick ?
                            <div
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 cursor-pointer w-28"
                                onClick={handleUpdate}
                            >
                                Save
                            </div>
                            :
                            <div
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 cursor-pointer w-28"
                                onClick={() => setIsClick(true)}
                            >
                                Update
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}