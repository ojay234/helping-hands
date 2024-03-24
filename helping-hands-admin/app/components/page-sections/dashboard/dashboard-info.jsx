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
        title="Total Delivery Time"
        figure="36h 45m"
        percentage="-15%"
        date="This month"
      />
      <CardInfo
        title="Total Review"
        figure="210"
        percentage="+2%"
        date="This month"
      />
      <CardInfo
        title="Total Rating"
        figure="4.75"
        percentage="-1.5%"
        date="This month"
      />
    </div>
  );
}

export default DashboardInfo;
