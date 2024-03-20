import React from "react";
import CardInfo from "./card-info";

function DashboardInfo() {
  return (
    <div className="flex flex-wrap justify-between w-full gap-4">
      <CardInfo
        title="Total Dist. Traveled"
        figure="250km"
        percentage="+30%"
        date="This month"
      />
      <CardInfo
        title="Total Dist. Traveled"
        figure="250km"
        percentage="-30%"
        date="This month"
      />
      <CardInfo
        title="Total Dist. Traveled"
        figure="250km"
        percentage="+30%"
        date="This month"
      />
      <CardInfo
        title="Total Dist. Traveled"
        figure="250km"
        percentage="+30%"
        date="This month"
      />
    </div>
  );
}

export default DashboardInfo;
