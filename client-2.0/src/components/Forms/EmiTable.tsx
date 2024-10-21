import moment from "moment";
import { useContext, useState } from "react";
import { UserContext } from "@pages/_app";
import Button from "../Button";
import PlusSvg from "../Svg/PlusSvg";
import useApiCall from "@src/hooks/useApiCall";
import { title } from "process";

export default function EmiForm() {
    const { setShowAlert } = useContext(UserContext) as any;

    // Initial data structure for each EMI entry
    const initialData = {
        title: '',
        totalAmount: '',
        paymentFrequency: '', // default monthly
        startDate: moment().format("YYYY-MM-DD"),
        totalInstallments: 0,
        installmentDate: moment().format("YYYY-MM-DD"),
        companyName: '',
    };

    // State to hold multiple EMI entries
    const [formEntries, setFormEntries] = useState([{ ...initialData }]);

    const { loading, makeApiCall } = useApiCall();

    // Handle form input changes for each EMI entry
    const handleInputChange = (index: number, key: string, value: any) => {
        const updatedEntries: any = [...formEntries];
        updatedEntries[index][key] = value;
        setFormEntries(updatedEntries);
    };

    // Add a new empty EMI entry
    const handleAddEntry = () => {
        const lastEntry = formEntries[formEntries.length - 1];
        if (!lastEntry?.title.trim() || !lastEntry?.totalAmount) {
            setShowAlert({ title: "Please fill all required fields in the current entry.", status: false, isOpen: true });
        } else {
            setFormEntries([...formEntries, { ...initialData }]);
        }
    };

    // Save all EMI entries
    const handleSave = () => {
        const incompleteEntry = formEntries.find((entry) => !entry?.title.trim() || !entry?.totalAmount);

        if (incompleteEntry) {
            setShowAlert({ title: "Please fill all required fields in each entry.", status: false, isOpen: true });
            return;
        }

        // Make API call to save data
        makeApiCall('POST', '/api/createEmiData', { data: formEntries });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                    <h3 className="font-medium text-black dark:text-white text-lg">
                        Add EMI Details
                    </h3>
                    <Button
                        label={"Save"}
                        type={"submit"}
                        className="flex w-40 h-8 justify-center cursor-pointer rounded bg-primary p-1 font-medium text-gray capitalize"
                        handleClick={handleSave}
                        loading={loading}
                    />
                </div>

                <div className="py-5">
                    {formEntries.map((formData, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-6.5 gap-4 mb-4 ">
                            {/* Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={formData?.title}
                                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Payment Frequency */}
                            <div className="relative bg-white dark:bg-form-input">
                                <select
                                    value={formData?.paymentFrequency}
                                    onChange={(e) => handleInputChange(index, "paymentFrequency", e.target.value)}
                                    className="relative w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                >   
                                    <option value="">Payment Frequency ?</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            {/* Start Date */}
                            <div>
                                <input
                                    type="date"
                                    placeholder="Start Date"
                                    value={formData?.startDate}
                                    onChange={(e) => handleInputChange(index, "startDate", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Total Installments */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Total Installments"
                                    value={formData?.totalInstallments}
                                    onChange={(e) => handleInputChange(index, "totalInstallments", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Installment Date */}
                            <div>
                                <input
                                    type="date"
                                    placeholder="Installment Date"
                                    value={formData?.installmentDate}
                                    onChange={(e) => handleInputChange(index, "installmentDate", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Company Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={formData?.companyName}
                                    onChange={(e) => handleInputChange(index, "companyName", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Total Amount */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Total Amount"
                                    value={formData?.totalAmount}
                                    onChange={(e) => handleInputChange(index, "totalAmount", e.target.value)}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                            {/* Add Entry Button */}
                            <div className="flex justify-center items-center gap-4">
                                <p className="cursor-pointer" onClick={handleAddEntry}>
                                    <PlusSvg height={25} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
