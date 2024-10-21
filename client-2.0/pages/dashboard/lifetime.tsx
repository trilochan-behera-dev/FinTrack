import DashboardLayout from "@pages/DashboardLayout";
import { useState } from "react";

export default function Lifetime() {
    const [IsApiCall, setIsApiCall] = useState(false);

    return(
        <DashboardLayout IsApiCall={IsApiCall} purpose="lifetime">
            <p>Lifetime</p>
       
    </DashboardLayout >
    )
}