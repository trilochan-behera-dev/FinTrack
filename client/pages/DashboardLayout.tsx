import moment from "moment";
import Breadcrumb from "@src/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@src/components/CardDataStats";
import ClosingBalSvg from "@src/components/Svg/ClosingBalSvg";
import IncomeSvg from "@src/components/Svg/IncomeSvg";
import TotalExpenseSvg from "@src/components/Svg/TotalExpenseSvg";
import TotalSavingSvg from "@src/components/Svg/TotalSavingSvg";
import { getDataFromAPI } from "@src/services/getAllServices";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
    IsApiCall
}: {
    children: React.ReactNode;
    IsApiCall: Boolean
}) {
    const year = moment().year();
    const pathname = usePathname();
    const [data, setData] = useState({
        income: 0,
        expense: 0,
        savings: 0,
        balance: 0
    });
    const cardProps = [
        {
            title: "Total Income",
            total: data?.income,
            icon: ClosingBalSvg
        },
        {
            title: "Total Expense",
            total: data?.expense,
            icon: IncomeSvg
        },
        {
            title: "Total Savings",
            total: data?.savings,
            icon: TotalExpenseSvg
        },
        {
            title: "Closing Balance",
            total: data?.balance,
            icon: TotalSavingSvg
        }
    ];

    const fetchDatas = async () => {
        try {
            const response = await getDataFromAPI("get", `api/chart-overview?year=${year}`);
            if (response?.data?.length) {
                response?.data.map((res: any, i: any) => {
                    setData((prevData: any) => {
                        if (res.type === "expense") {
                            return { ...prevData, expense: res.totalPrice };
                        } else if (res.type === "income") {
                            return { ...prevData, income: res.totalPrice };
                        } else if (res.type === "savings") {
                            return { ...prevData, savings: res.totalPrice };
                        }
                    });
                })
            } else {
                setData({
                    income: 0,
                    expense: 0,
                    savings: 0,
                    balance: 0
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [year, IsApiCall])
    return (
        <>
            <Breadcrumb pageName={pathname.split("/")[1]} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
                {
                    cardProps.map((card, i) => (
                        <CardDataStats cardData={card} key={i}>
                            <card.icon />
                        </CardDataStats>
                    ))
                }
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                {children}
            </div>
        </>
    )
}