import DashboardLayout from "@pages/DashboardLayout";
import ChartDonut from "@src/components/Charts/ChartDonut";
import ChartMonthly from "@src/components/Charts/ChartMonthly";
import Forms from "@src/components/Forms";
import TableWithIcon from "@src/components/Tables/TableWithIcon";
import { header } from "@src/util/Data";
import { useState } from "react";

export default function Savings() {
    const [IsApiCall, setIsApiCall] = useState(false);
    return (
        <DashboardLayout IsApiCall={IsApiCall}>
            <ChartMonthly title={"Monthly Savings"} category="savings" barColor={["#27C190"]} IsApiCall={IsApiCall}/>
            <ChartDonut title={"Category Wise"} category="savings" IsApiCall={IsApiCall}/>
            <div className="col-span-12 rounded-sm shadow-default">
                <Forms type="savings" setIsApiCall={setIsApiCall} />
            </div>
            <div className="col-span-12 rounded-sm shadow-default">
                <TableWithIcon header={header} type="savings" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall} />
            </div>
        </DashboardLayout>
    )
}