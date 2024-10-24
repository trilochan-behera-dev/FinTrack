import Delete from "@src/components/Svg/Delete";
import Pagination from "@src/components/Pagination";
import Warnings from "@src/components/Alert/Warning";
import Extend from "@src/components/Svg/Extend";
import PlusSvg from "@src/components/Svg/PlusSvg";
import SaveSvg from "@src/components/Svg/SaveSvg";
import Edit from "@src/components/Svg/Edit";
import { useContext, useEffect, useState } from "react";
import { getDataFromAPI, getRandomColor } from "@src/services/getAllServices";
import { UserContext } from "@pages/_app";

export default function Category() {
    const { setShowAlert } = useContext(UserContext) as any;
    const header = [
        'Category Name', 'Type', 'Color code', 'Action'
    ]
    const [fetchData, setFetchData] = useState(true);
    const numberOfPages = 5;
    const [pagination, setPagination] = useState({
        start: 0,
        end: numberOfPages
    })
    const [tableData, setTableData] = useState([]) as any;

    const catData = {
        categoryName: "",
        colorCode: getRandomColor(),
        categoryType: "expense"
    };
    const [newCategory, setnewCategory] = useState([catData]) as any;
    const [updatecatData, setUpdatecatData] = useState({}) as any;
    const [isWarnings, setIsWarnings] = useState({
        status: false,
        id: "",
    })
    const [category, setCategory] = useState(catData);
    const addNewCategory = () => {
        if (!newCategory?.length) {
            setnewCategory([category]);
        } else if (newCategory?.length > 4) {
            setShowAlert({ title: "You can't add more than 5 values at a time ", status: false, isOpen: true })
        } else if (newCategory[newCategory?.length - 1]['categoryName'] === "") {
            setShowAlert({ title: "Please enter value before adding new", status: false, isOpen: true })
        } else {
            setnewCategory([...newCategory, catData]);
            setCategory(catData);
        }
    }

    const addCategory = (cat: any) => {
        setCategory(cat);
        newCategory[cat?.index] = cat;
        setnewCategory(newCategory);
    }

    const saveCategory = async () => {
        try {
            if (newCategory?.length) {
                const response = await getDataFromAPI('post', 'api/category', newCategory);
                if (response.status) {
                    setnewCategory([]);
                    setFetchData(true);
                }
                setShowAlert({ title: response.message, status: response.status, isOpen: true })
            }
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };

    const handleDelete = async () => {
        const response = await getDataFromAPI('delete', `api/category/${isWarnings.id}`);
        if (response.status) {
            const updateCat = tableData.filter((data: any) => data._id != isWarnings.id)
            setTableData(updateCat);
            setIsWarnings({ ...isWarnings, status: false });
        }
        setShowAlert({ title: response.message, status: response.status, isOpen: true });
    }

    const handleUpdate = (data: any) => {
        const update = {
            _id: data._id,
            categoryName: data?.categoryName,
            colorCode: data?.colorCode,
            categoryType: data?.categoryType
        }

        setUpdatecatData(update)
    }

    const updateCategory = async () => {
        const response = await getDataFromAPI('put', `api/category/${updatecatData._id}`, updatecatData);
        if (response.status) {
            const updatedData = tableData.map((data: any) => {
                if (data._id === updatecatData._id) {
                    return response.data
                }
                return data
            })
            setTableData(updatedData);
            setUpdatecatData({});
        }
        setShowAlert({ title: response.message, status: response.status, isOpen: true })
    }
    // Define an asynchronous function
    const fetchDatas = async () => {
        try {
            const response = await getDataFromAPI('get', 'api/category');
            if (response.status) {
                setTableData(response.data);
            }
            setFetchData(false);
        } catch (error) {
            setShowAlert({ title: "Something Went Wrong !", status: false, isOpen: true })
            console.error('Error fetching data:', error);
        }
    };

    // Call the async function within useEffect
    useEffect(() => {
        if (fetchData) {
            fetchDatas();
        }
    }, [fetchData]);

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 pb-2">
                <div className="flex flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col">
                        <div className="h-16 border-b border-stroke dark:border-strokedark flex justify-between items-center px-8 font-medium text-black dark:text-white">
                            <p>Add Categories</p>
                            <p className="cursor-pointer" onClick={addNewCategory}>
                                <PlusSvg height={25} />
                            </p>
                        </div>
                        <div className="h-auto min-h-[300px] p-2 overflow-auto">
                            <div className="flex flex-col gap-2 overflow-auto">
                                {newCategory.map((newCat: any, index: number) => (
                                    <div className="flex gap-2" key={index}>
                                        <input
                                            type="text"
                                            placeholder="New Category name"
                                            value={newCat?.name}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={(e) => {
                                                const data = {
                                                    index: index,
                                                    categoryName: e?.target?.value.toLowerCase(),
                                                    colorCode: category?.colorCode,
                                                    categoryType: category?.categoryType
                                                }
                                                addCategory(data)
                                            }}
                                        />
                                        <input
                                            type="color"
                                            value={newCat?.colorCode}
                                            placeholder="color code"
                                            className="w-12 h-12 rounded border-[1.5px] border-stroke bg-transparent py-1 px-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={(e) => {
                                                const data = {
                                                    index: index,
                                                    categoryName: category?.categoryName,
                                                    colorCode: e?.target?.value,
                                                    categoryType: category?.categoryType
                                                }
                                                addCategory(data)
                                            }}
                                        />
                                        <div className="relative bg-white dark:bg-form-input cursor-pointer">
                                            <select
                                                className="relative w-fit cursor-pointer appearance-none rounded border border-stroke bg-transparent py-3 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input capitalize"
                                                onChange={(e) => {
                                                    const data = {
                                                        index: index,
                                                        categoryName: category?.categoryName,
                                                        colorCode: category?.colorCode,
                                                        categoryType: e?.target?.value
                                                    }
                                                    addCategory(data)
                                                }}
                                            >
                                                {['expense', 'savings', 'income'].map((op: any, index: any) => (
                                                    <option value={op} selected={newCat?.categoryType === op} className="capitalize" key={index} >{op}</option>
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
                    <div className={`flex w-full justify-center items-center bg-primary dark:bg-primarydark font-medium   cursor-pointer h-12  ${newCategory?.length ? "text-bodydark1 dark:text-white" : "text-graydark"}`} onClick={saveCategory}>
                        Save
                    </div>
                </div>
                <div className={`xl:col-span-2 flex flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-[435px] ${isWarnings?.status && "min-h-[435px] flex justify-center items-center"}`}>
                    {
                        isWarnings?.status ?
                            <Warnings onCancel={() => setIsWarnings({ ...isWarnings, status: false })} onClick={handleDelete} /> :
                            <>
                                <div className="flex flex-col">
                                    <div className="h-16 border-b border-stroke dark:border-strokedark flex justify-between items-center px-8 font-medium text-black dark:text-white">
                                        <p>All Categories</p>
                                    </div>
                                    <div className="h-auto min-h-[300px] p-2 overflow-auto">
                                    {
                                        tableData?.length ?
                                            <div className="overflow-auto">
                                                <table className="w-full py-4">
                                                    <thead>
                                                        <tr className="bg-primary bg-opacity-10 dark:bg-meta-3">
                                                            {header.map((h: any, i: any) => (
                                                                <th className={`w-[160px] py-2 text-left font-medium text-black dark:text-white ${i == 0 && "pl-9"} `} key={i}>
                                                                    {h}
                                                                </th>
                                                            ))}
                                                        </tr >
                                                    </thead >
                                                    <tbody>
                                                        {tableData?.slice(pagination.start, pagination?.end)?.map((packageItem: any, key: string) => (
                                                            <tr key={key} className="hover:bg-gray-2 h-auto dark:hover:bg-bodydark2 dark:hover:bg-opacity-25 cursor-pointer">
                                                                <td className="border-b border-[#eee] p-2 pl-9 dark:border-strokedark ">
                                                                    {
                                                                        updatecatData?._id && packageItem?._id === updatecatData?._id ?
                                                                            <>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="New Category name"
                                                                                    value={updatecatData?.categoryName}
                                                                                    className="w-[155px] rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                                    onChange={(e) => setUpdatecatData({ ...updatecatData, categoryName: e?.target?.value.toLowerCase() })}
                                                                                />
                                                                            </>
                                                                            :
                                                                            <h5 className="font-medium w-[160px] text-black dark:text-white truncate">
                                                                                {packageItem.categoryName}
                                                                            </h5>
                                                                    }
                                                                </td>
                                                                <td className="border-b border-[#eee] h-8 p-2 dark:border-strokedark relative cursor-pointer">
                                                                    {
                                                                        updatecatData?._id && packageItem?._id === updatecatData?._id ?
                                                                            <>
                                                                                <select
                                                                                    className=" w-[155px] appearance-none rounded border border-stroke bg-transparent py-1 pl-4 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input capitalize cursor-pointer"
                                                                                    onChange={(e) => setUpdatecatData({ ...updatecatData, categoryType: e?.target?.value })}
                                                                                >
                                                                                    {['expense', 'savings', 'income'].map((op: any, i: any) => (
                                                                                        <option value={op} selected={packageItem?.categoryType === op} className="capitalize" key={i}>{op}</option>
                                                                                    ))}
                                                                                </select>
                                                                                <span className="absolute top-1/2 right-[80px] -translate-y-1/2">
                                                                                    <Extend />
                                                                                </span>
                                                                            </>
                                                                            :
                                                                            <p className={`capitalize font-medium w-[160px] ${packageItem?.categoryType === "savings" ? "text-success" : packageItem?.categoryType === "expense" ? "text-danger" : "text-warning"}`}>
                                                                                {packageItem.categoryType}
                                                                            </p>
                                                                    }
                                                                </td>
                                                                <td className="border-b border-[#eee] h-8 p-2 dark:border-strokedark">
                                                                    <input
                                                                        type="color"
                                                                        value={(updatecatData?._id && packageItem?._id === updatecatData?._id) ? updatecatData?.colorCode : packageItem?.colorCode}
                                                                        placeholder="color code"
                                                                        className="w-20 h-8 rounded border-[1.5px] border-stroke bg-transparent py-1 px-1 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary cursor-pointer"
                                                                        disabled={!updatecatData?._id}
                                                                        onChange={(e) => setUpdatecatData({ ...updatecatData, colorCode: e?.target?.value })}
                                                                    />
                                                                </td>
                                                                <td className="border-b border-[#eee] h-8 p-2 dark:border-strokedark">
                                                                    <div className="flex items-center space-x-3.5 w-[160px]">
                                                                        {
                                                                            updatecatData?._id && packageItem?._id === updatecatData?._id ?
                                                                                <div className="hover:text-primary" onClick={updateCategory}>
                                                                                    <SaveSvg />
                                                                                </div>
                                                                                :
                                                                                <div className="hover:text-primary" onClick={() => handleUpdate(packageItem)}>
                                                                                    <Edit />
                                                                                </div>
                                                                        }

                                                                        <div className="hover:text-primary" onClick={() => setIsWarnings({ status: true, id: packageItem._id })}>
                                                                            <Delete height={20} weight={20} />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table >
                                            </div >
                                            :
                                            <div className="flex justify-center items-center h-full font-bold">No Categories Present</div>
                                    }
                                    </div>
                                </div >
                                <div className="flex w-full gap-2 justify-end px-8 items-center  bg-primary dark:bg-primarydark font-medium text-bodydark1 h-12 dark:text-white">
                                    <Pagination pagination={pagination} setPagination={setPagination} tableData={tableData} numberOfPages={numberOfPages} />
                                </div>
                            </>
                    }
                </div >
            </div >
        </>
    )
}