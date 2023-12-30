import moment from "moment";
import Dropdown from "../Svg/Dropdown";
import DashboardSvg from "../Svg/DashboardSvg";
import SavingSideSvg from "../Svg/SavingSideSvg";
import { UserContext } from "@pages/_app";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";
import Button from "../Button";

export default function Forms({ type, setIsApiCall }: any) {
    const { setShowAlert } = useContext(UserContext) as any;
    const initialData = { name: "", type: type, category: "", selectedDate: moment().format("YYYY-MM-DD"), price: 0, modeOfPayment: "cash", paymentStatus: true, details: "" }
    const [details, setDetails] = useState(initialData);
    const [category, setCategory] = useState() as any;
    const [loading, setLoading] = useState(false)


    const handleSave = async () => {
        setLoading(true)
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
        setLoading(false)
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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white text-lg">
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
                            value={details?.price || ""}
                            onChange={(e) => setDetails({ ...details, price: Number(e?.target?.value) })}
                        />
                    </div>
                    <div className="relative bg-white dark:bg-form-input">
                        <span className="absolute top-[60%] left-4 -translate-y-1/2">
                            <DashboardSvg />
                        </span>
                        <select className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`} onChange={(e) => setDetails({ ...details, category: e?.target?.value })}>
                            <option>Select Category</option>
                            {category?.map((cat: any, i: any) => (
                                <option value={cat?.categoryName} selected={cat.categoryName === details?.category} key={i}>{cat?.categoryName}</option>
                            ))}
                        </select>
                        <span className="absolute top-1/2 right-4 -translate-y-1/2">
                            <Dropdown />
                        </span>
                    </div>
                    <div className="relative py-2 md:py-0 ">
                        <div className="relative bg-white dark:bg-form-input">
                            <span className="absolute top-[50%] left-4 -translate-y-1/2">
                                <SavingSideSvg />
                            </span>
                            <select className={`relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`} onChange={(e) => setDetails({ ...details, paymentStatus: e?.target?.value === "1" ? true : false })}>
                                <option value={"1"} selected={details?.paymentStatus}>Paid</option>
                                <option value={"0"} selected={!details?.paymentStatus}>UnPaid</option>
                            </select>
                            <span className="absolute top-1/2 right-4 -translate-y-1/2">
                                <Dropdown />
                            </span>
                        </div>
                    </div>
                    <Button
                        label={"Save"}
                        type={"submit"}
                        className="flex w-full justify-center cursor-pointer rounded bg-primary p-3 font-medium text-gray capitalize"
                        handleClick={handleSave}
                        loading={loading}
                    />
                </div>
            </div>
        </div >
    )
}