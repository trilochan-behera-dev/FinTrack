import DashboardLayout from "@pages/DashboardLayout";
import Forms from "@src/components/Forms";
import TableWithIcon from "@src/components/Tables/TableWithIcon";
import { useState } from "react";

export default function Future() {
    const header = [
        'Start Date', 'End Date', 'Price', 'Next Payment', 'Payment Interval', 'Type', 'Status', 'Action'
    ]
    const [IsApiCall, setIsApiCall] = useState(false);

    return (
        <DashboardLayout IsApiCall={IsApiCall}>
            <div className="col-span-12 rounded-sm shadow-default">
                <Forms type="future" setIsApiCall={setIsApiCall} />
            </div>
            <div className="col-span-12 rounded-sm shadow-default">
                <TableWithIcon header={header} type="expense" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall} />
            </div>
        </DashboardLayout >
    )
}