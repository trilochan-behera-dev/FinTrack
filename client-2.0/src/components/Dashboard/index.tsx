"use client";
import React, { useState } from "react";
import ChartBar from "../Charts/ChartBar";
import DashboardLayout from "@pages/DashboardLayout";
import TableWithIcon from "../Tables/TableWithIcon";
import Forms from "../Forms";
import { header } from "@src/util/Data";

const Dashboard: React.FC = () => {
  const [IsApiCall, setIsApiCall] = useState(false);
  return (
    <DashboardLayout>
      <ChartBar title={"Total Report"} barColor={["#27C190", '#e13d69', "#22B3FF"]} />
      <div className="col-span-12 rounded-sm shadow-default">
          <Forms  type="all" setIsApiCall={setIsApiCall} />
      </div>
      <div className="col-span-12 rounded-sm shadow-default">
        <TableWithIcon header={header} type="all" IsApiCall={IsApiCall} setIsApiCall={setIsApiCall}/>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
