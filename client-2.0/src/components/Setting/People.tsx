import Delete from "@src/components/Svg/Delete";
import Pagination from "@src/components/Pagination";
import Breadcrumb from "@src/components/Breadcrumbs/Breadcrumb";
import Warnings from "@src/components/Alert/Warning";
import Extend from "@src/components/Svg/Extend";
import PlusSvg from "@src/components/Svg/PlusSvg";
import SaveSvg from "@src/components/Svg/SaveSvg";
import Edit from "@src/components/Svg/Edit";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI, getRandomColor } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";

export default function People() {
    const [budget, setBudget] = useState({
        income: "",
        savings: "",
        expense: ""
    });

    const [newCategory, setNewCategory] = useState([{ name: "", categoryType: "friend" }]);
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({ start: 0, end: 5 });
    const [error, setError] = useState("");
    const { setShowAlert } = useContext(UserContext) as any;

    // Handle Budget Input
    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        setBudget({ ...budget, [name]: value });
    };

    // Validate and Save Budget
    const saveBudget = () => {
        const { income, savings, expense } = budget;
        if (!income || !savings || !expense) {
            setShowAlert({ title: "Please fill all the fields for the budget.", status: false, isOpen: true })
            return;
        }
        if (parseFloat(income) < 0 || parseFloat(savings) < 0 || parseFloat(expense) < 0) {
            setShowAlert({ title: "Values cannot be negative.", status: false, isOpen: true })
            return;
        }
        console.log("Budget Saved:", budget);
        // Save budget to state/API
    };

    // Add New Person Category Logic
    const addNewPerson = () => {
        if (newCategory.length >= 5) {
            setShowAlert({ title: "You can only add up to 5 people.", status: false, isOpen: true })
            return;
        }else if (newCategory[newCategory?.length - 1]['name'] === "") {
            setShowAlert({ title: "Please enter value before adding new", status: false, isOpen: true })
        }else{
            setNewCategory([...newCategory, { name: "", categoryType: "friend" }]);
        }
    };

    // Handle Person Change
    const handlePersonChange = (index, data) => {
        const updatedCategory = [...newCategory];
        updatedCategory[index] = { ...updatedCategory[index], ...data };
        setNewCategory(updatedCategory);
    };

    // Validate and Save People
    const saveCategory = () => {
        if (newCategory.some(person => !person.name || !person.categoryType)) {
            setShowAlert({ title: "Please ensure all people have a name and category.", status: false, isOpen: true })
            return;
        }
        setTableData([...tableData, ...newCategory]);
        setNewCategory([]);
        console.log("People saved:", newCategory);
    };

    // Pagination for people in the table
    const numberOfPages = 5;

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 pb-2">

                {/* Set Monthly Budget */}
                <div className="flex flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col">
                        <div className="h-16 border-b border-stroke dark:border-strokedark flex justify-between items-center px-4 font-medium text-black dark:text-white">
                            <p>Set Monthly Budget</p>
                        </div>
                        <div className="h-auto min-h-[300px] p-4 overflow-auto">
                            <div className="flex flex-col gap-2 overflow-auto">
                                <p className="text-sm">Income: </p>
                                <input
                                    type="number"
                                    name="income"
                                    placeholder="Income"
                                    value={budget.income}
                                    onChange={handleBudgetChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none mb-4"
                                />
                                <p className="text-sm">Savings: </p>
                                <input
                                    type="number"
                                    name="savings"
                                    placeholder="Savings"
                                    value={budget.savings}
                                    onChange={handleBudgetChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none mb-4"
                                />
                                <p className="text-sm">Expense: </p>
                                <input
                                    type="number"
                                    name="expense"
                                    placeholder="Expense"
                                    value={budget.expense}
                                    onChange={handleBudgetChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none mb-4"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-center bg-primary font-medium cursor-pointer h-12 text-white" onClick={saveBudget}>
                        Save Budget
                    </div>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </div>

                {/* Add People Section */}
                <div className="flex flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col">
                        <div className="h-16 border-b border-stroke dark:border-strokedark flex justify-between items-center px-8 font-medium text-black dark:text-white">
                            <p>Add People</p>
                            <p className="cursor-pointer" onClick={addNewPerson}>
                                <PlusSvg height={25} />
                            </p>
                        </div>
                        <div className="h-auto min-h-[300px] p-2 overflow-auto">
                            <div className="flex flex-col gap-2 overflow-auto">
                                {newCategory.map((person, index) => (
                                    <div className="flex gap-2" key={index}>
                                        <input
                                            type="text"
                                            placeholder="Person Name"
                                            value={person.name}
                                            onChange={(e) => handlePersonChange(index, { name: e.target.value })}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none"
                                        />
                                        <div className="relative bg-white dark:bg-form-input">
                                            <select
                                                className="w-fit appearance-none rounded border border-stroke bg-transparent py-3 pl-4 pr-10 outline-none cursor-pointer"
                                                value={person.categoryType}
                                                onChange={(e) => handlePersonChange(index, { categoryType: e.target.value })}
                                            >
                                                {['Friend', 'Relative', 'Other'].map((op) => (
                                                    <option value={op.toLowerCase()} key={op}>{op}</option>
                                                ))}
                                            </select>
                                            <span className="absolute top-1/2 right-4 -translate-y-1/2">
                                                <Extend />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-center bg-primary font-medium cursor-pointer h-12 text-white" onClick={saveCategory}>
                        Save People
                    </div>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </div>

                {/* Table Section */}
                <div className="flex flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-[435px]">
                    <div className="flex flex-col">
                        <div className="h-16 border-b border-stroke dark:border-strokedark flex justify-between items-center px-8 font-medium text-black dark:text-white">
                            <p>All People</p>
                        </div>
                        <div className="h-auto min-h-[300px] p-2 overflow-auto">
                            {tableData.length ? (
                                <table className="w-full py-4">
                                    <thead>
                                        <tr className="bg-primary bg-opacity-10 dark:bg-meta-3">
                                            <th className="w-[160px] py-2 text-left font-medium text-black dark:text-white">Name</th>
                                            <th className="w-[160px] py-2 text-left font-medium text-black dark:text-white">Category</th>
                                            <th className="w-[160px] py-2 text-left font-medium text-black dark:text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.slice(pagination.start, pagination.end).map((person, index) => (
                                            <tr key={index}>
                                                <td className="w-[160px] py-2 text-left font-medium text-black dark:text-white">{person.name}</td>
                                                <td className="w-[160px] py-2 text-left font-medium text-black dark:text-white">{person.categoryType}</td>
                                                <td className="w-[160px] py-2 text-left font-medium text-black dark:text-white">
                                                    <button className="mx-2">
                                                        <Edit />
                                                    </button>
                                                    <button className="mx-2">
                                                        <Delete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">No People Added</p>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full gap-2 justify-end px-8 items-center  bg-primary dark:bg-primarydark font-medium text-bodydark1 h-12 dark:text-white">
                       <Pagination pagination={pagination} setPagination={setPagination} tableData={tableData} numberOfPages={numberOfPages} />
                     </div>
                </div>
            </div>
        </>
    );
}
