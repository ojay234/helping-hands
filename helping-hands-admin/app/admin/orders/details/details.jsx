import { useRouter, useSearchParams } from "next/navigation";
import Header from "@components/page-sections/header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useGetOrderDetailsQuery } from "@/app/api/apiSlice";
import { useEffect } from "react";
import OrderDetailsTable from "@/app/components/page-sections/orders/order-details-table";

function OrderDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data, isLoading } = useGetOrderDetailsQuery(orderId);

  const handleRowClick = () => {
    router.push(`/admin/orders`);
  };

  useEffect(() => {
    if (!orderId) {
      router.push(`/admin/orders`);
    }
  }, [orderId]);

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Orders" />
      <div className="bg-white py-5 rounded-lg">
        <div className="flex items-center justify-between my-3 px-3">
          {data && (
            <p className="text-gray_600 flex gap-3 items-center">
              <span onClick={handleRowClick}>
                <IoIosArrowRoundBack size="1.2rem" />
              </span>
              <span>{data?.data?.orderCustomer}</span>
            </p>
          )}
        </div>

        <OrderDetailsTable data={data} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default OrderDetails;
