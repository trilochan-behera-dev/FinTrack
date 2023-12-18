"use client";
import React, { useState } from "react";
import ChartBar from "../Charts/ChartBar";
import DashboardLayout from "@pages/DashboardLayout";
import TableWithIcon from "../Tables/TableWithIcon";

const Dashboard: React.FC = () => {
  const header = [
    'Date', 'Price', 'Type', 'Category', 'Status', 'Action'
  ]
  const [IsApiCall, setIsApiCall] = useState(false);

  return (
    <DashboardLayout IsApiCall={IsApiCall}>
      <ChartBar title={"Total Report"} barColor={["#135E46", '#821432', "#007BBB"]} />
      <div className="col-span-12 rounded-sm shadow-default">
        <TableWithIcon header={header} type="all" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall}/>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
