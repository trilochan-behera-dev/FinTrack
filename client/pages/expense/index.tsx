import DashboardLayout from "@pages/DashboardLayout";
import ChartDaily from "@src/components/Charts/ChartDaily";
import ChartDonut from "@src/components/Charts/ChartDonut";
import ChartMonthly from "@src/components/Charts/ChartMonthly";
import Forms from "@src/components/Forms";
import TableWithIcon from "@src/components/Tables/TableWithIcon";
import { useState } from "react";

export default function Expense() {
    const header = [
        'Date', 'Price', 'Details', 'Category', 'Status', 'Action'
    ]
    const [IsApiCall, setIsApiCall] = useState(false);

    return (
        <DashboardLayout IsApiCall={IsApiCall}>
            <div className="col-span-12 rounded-sm shadow-default">
                <Forms type="expense" setIsApiCall={setIsApiCall} />
            </div>
            <ChartDaily title={"Daily Expense"} category="expense" barColor={["#3C50E0"]} IsApiCall={IsApiCall} />
            <ChartMonthly title={"Monthly Expense"} category="expense" barColor={["#80CAEE"]} IsApiCall={IsApiCall} />
            <ChartDonut title={"Category Wise"} category="expense" IsApiCall={IsApiCall} />
            <div className="col-span-12 rounded-sm shadow-default">
                <TableWithIcon header={header} type="expense" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall} />
            </div>
        </DashboardLayout >
    )
}