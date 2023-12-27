import DashboardLayout from "@pages/DashboardLayout";
import ChartDonut from "@src/components/Charts/ChartDonut";
import ChartMonthly from "@src/components/Charts/ChartMonthly";
import Forms from "@src/components/Forms";
import TableWithIcon from "@src/components/Tables/TableWithIcon";
import { useState } from "react";

export default function Income() {
    const header = [
        'Date', 'Price', 'Details', 'Category', 'Status', 'Action'
    ]
    const [IsApiCall, setIsApiCall] = useState(false);
    return (
        <DashboardLayout IsApiCall={IsApiCall}>
            <div className="col-span-12 rounded-sm shadow-default">
                <Forms type="income" setIsApiCall={setIsApiCall} />
            </div>
            <ChartMonthly title={"Monthly Incomes"} category="income" barColor={["#22B3FF"]} IsApiCall={IsApiCall} />
            <ChartDonut title={"Category Wise"} category="income" IsApiCall={IsApiCall} />
            <div className="col-span-12 rounded-sm shadow-default">
                <TableWithIcon header={header} type="income" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall} />
            </div>
        </DashboardLayout>
    )
}