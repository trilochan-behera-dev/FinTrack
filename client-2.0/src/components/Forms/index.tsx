import moment from "moment";
import Dropdown from "../Svg/Dropdown";
import DashboardSvg from "../Svg/DashboardSvg";
import { UserContext } from "@pages/_app";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI } from "@src/services/getAllServices";
import Button from "../Button";
import { selectType } from "@src/util/Data";
import useApiCall from "@src/hooks/useApiCall";
import PlusSvg from "../Svg/PlusSvg";

export default function Forms({ type }: any) {
    const { setShowAlert } = useContext(UserContext) as any;
    const initialData = { title: "", type: type, category: "", selectedDate: moment().format("YYYY-MM-DD"), price: 0, modeOfPayment: "cash", paymentStatus: true, details: "" };
    
    // This state will hold multiple formData entries
    const [formEntries, setFormEntries] = useState([{ ...initialData }]);
    const [selectedType, setSelectedType] = useState("");
    const [category, setCategory] = useState() as any;

    const { loading, error, data: response, makeApiCall } = useApiCall();

    // Function to handle the change in the form input fields
    const handleInputChange = (index: number, key: string, value: any) => {
        const updatedEntries:any = [...formEntries];
        updatedEntries[index][key] = value;
        setFormEntries(updatedEntries);
    };

    // Function to add new empty form fields
    const handleAddEntry = () => {
        const lastEntry = formEntries[formEntries.length - 1];
        if (!lastEntry?.title.trim() || !lastEntry?.price) {
            setShowAlert({ title: "Please fill all the details in the current entry before adding another.", status: false, isOpen: true });
        } else {
            setFormEntries([...formEntries, { ...initialData }]);
        }
    };

    // Handle save for all form entries
    const handleSave = () => {
        const incompleteEntry = formEntries.find((entry) => !entry?.title.trim() || !entry?.price);

        if (incompleteEntry) {
            setShowAlert({ title: "Please fill all the required fields in each entry.", status: false, isOpen: true });
            return;
        }

        const updatedEntries = formEntries.map((entry) => ({
            ...entry,
            category: "office", // Set a fixed category or customize as needed
            type: type === "all" ? selectedType : type,
        }));

        makeApiCall('POST', '/api/createData', { data: updatedEntries });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                    <h3 className="font-medium text-black dark:text-white text-lg">
                        Add New Data
                    </h3>
                    <div className="flex justify-center items-center gap-8" >
                        <Button
                            label={"Save"}
                            type={"submit"}
                            className="flex w-40 h-8 justify-center cursor-pointer rounded bg-primary p-1 font-medium text-gray capitalize"
                            handleClick={handleSave}
                            loading={loading}
                        />
                    </div>
                </div>

                <div className="py-5">
                {formEntries.map((formData, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 px-6.5 gap-4 mb-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    value={formData?.title}
                                    onChange={(e) => handleInputChange(index, "title", e?.target?.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter price"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={formData?.price || ""}
                                    onChange={(e) => handleInputChange(index, "price", Number(e?.target?.value))}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Enter details"
                                    value={formData?.details}
                                    rows={10}
                                    onChange={(e) => handleInputChange(index, "details", e?.target?.value)}
                                    className="w-full h-12 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {type === "all" && (
                                <div className="relative bg-white dark:bg-form-input">
                                    <span className="absolute top-[60%] left-4 -translate-y-1/2">
                                        <DashboardSvg />
                                    </span>
                                    <select
                                        className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        value={formData?.type}
                                        onChange={(e) => handleInputChange(index, "type", e?.target?.value)}
                                    >
                                        <option>Select Type</option>
                                        {selectType?.map((type: any, i: any) => (
                                            <option value={type} key={i}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute top-1/2 right-4 -translate-y-1/2">
                                        <Dropdown />
                                    </span>
                                </div>
                            )}
                            <div className="relative bg-white dark:bg-form-input">
                                <span className="absolute top-[60%] left-4 -translate-y-1/2">
                                    <DashboardSvg />
                                </span>
                                <select
                                    className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                    value={formData?.category}
                                    onChange={(e) => handleInputChange(index, "category", e?.target?.value)}
                                >
                                    <option>Select Category</option>
                                    {category?.map((cat: any, i: any) => (
                                        <option value={cat?.categoryName} key={i}>
                                            {cat?.categoryName}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute top-1/2 right-4 -translate-y-1/2">
                                    <Dropdown />
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <input
                                    type="date"
                                    value={formData?.selectedDate}
                                    onChange={(e) => handleInputChange(index, "selectedDate", e?.target?.value)}
                                    placeholder="Select Date"
                                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <p className="cursor-pointer" onClick={handleAddEntry}>
                                <PlusSvg height={25}  />
                               </p>
                            </div>
                          </div>
                        // </div>
                    ))}
                </div>
                
            </div>
        </div >
    )
}