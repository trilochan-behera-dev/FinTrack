import DashboardLayout from "@pages/DashboardLayout";
import { useState } from "react";

export default function Yearly() {
    const [IsApiCall, setIsApiCall] = useState(false);

    return(
        <DashboardLayout IsApiCall={IsApiCall} purpose="year">
            <p>Yearly</p>
       
    </DashboardLayout >
    )
}