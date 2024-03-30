import React from "react";
import CardInfo from "./card-info";

function DashboardInfo({ statistic }) {
  const {
    totalDistanceTravelledStatistic,
    totalRatingStatistic,
    totalRevenueStatistic,
    totalReviewStatistic,
  } = statistic || {};

  return (
    <div className="flex flex-wrap justify-between w-full gap-4">
      <CardInfo
        title="Total Dist. Traveled"
        figure={
          totalDistanceTravelledStatistic
            ? `${totalDistanceTravelledStatistic?.totalDistance}km`
            : `_`
        }
        percentage={
          totalDistanceTravelledStatistic
            ? `${totalDistanceTravelledStatistic?.percentageDifference}%`
            : `_`
        }
        date="This month"
      />
      <CardInfo
        title="Total Delivery Time"
        figure={
          totalRevenueStatistic ? `${totalRevenueStatistic?.totalRevenue}` : `_`
        }
        percentage={
          totalRevenueStatistic
            ? `${totalRevenueStatistic?.percentageDifference}%`
            : `_`
        }
        date="This month"
      />
      <CardInfo
        title="Total Review"
        figure={
          totalReviewStatistic ? `${totalReviewStatistic?.totalReviews}` : `_`
        }
        percentage={
          totalReviewStatistic
            ? `${totalReviewStatistic?.percentageDifference}%`
            : `_`
        }
        date="This month"
      />
      <CardInfo
        title="Total Rating"
        figure={
          totalRatingStatistic ? `${totalRatingStatistic?.totalRating}` : `_`
        }
        percentage={
          totalRatingStatistic
            ? `${totalRatingStatistic?.percentageDifference}%`
            : `_`
        }
        date="This month"
      />
    </div>
  );
}

export default DashboardInfo;
