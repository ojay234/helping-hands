import { useRouter, useParams } from "next/navigation";
import Header from "@components/page-sections/header";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  useGetCustomerOrderDetailsQuery,
  useGetDeliveryManOrdersQuery,
  useGetDeliveryManQuery,
  useGetOrderDetailsQuery,
} from "@/app/api/apiSlice";
import { useEffect } from "react";

import DeliveryManOrderDetailsTable from "@/app/components/page-sections/delivery-man/DeliveryManOrderTable";
import { FaStar } from "react-icons/fa";

function DeliveryManOrderDetails() {
  const router = useRouter();

  const { id } = useParams();

  const { data, isLoading, isError } = useGetDeliveryManOrdersQuery(id);
  const { data: deliveryManDetails, isError: deliveryManDetailsError } =
    useGetDeliveryManQuery(id);

  const handleRowClick = () => {
    router.push(`/admin/orders`);
  };

  useEffect(() => {
    if (!id || deliveryManDetailsError) {
      router.push(`/admin/delivery-man`);
    }
  }, [id, deliveryManDetailsError]);

  const { avatar, role, name, emailAddress, phoneNumber, rating, status } =
    deliveryManDetails?.data || {};

  console.log(avatar);

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Delivery Man" />
      <div className="w-[60%] flex  bg-white rounded-md my-4 p-3 gap-4">
        <div className="w-24 h-24">
          <img src={avatar} alt="" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex gap-4">
            <p>
              <span className="text-gray-500">Name:</span> {name}
            </p>
            <p>
              <span className="text-gray-500">Role:</span> {role}
            </p>
          </div>
          <div className="flex gap-4">
            <p>
              <span className="text-gray-500">Email:</span> {emailAddress}
            </p>
            <p>
              <span className="text-gray-500">Phone:</span> {phoneNumber}
            </p>
          </div>
          <div className="flex gap-4">
            <p className="flex gap-4">
              <span className="text-gray-500">Rating:</span>
              <span className="flex items-center m-auto w-fit text-xs  gap-1">
                {Array.from({ length: rating }, (_, i) => (
                  <FaStar key={i} color="#ffd700" />
                ))}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span
                className={`font-bold ${
                  status === "active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <DeliveryManOrderDetailsTable data={data} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default DeliveryManOrderDetails;
