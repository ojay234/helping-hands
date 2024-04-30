import { useRouter, useSearchParams } from "next/navigation";
import Header from "@components/page-sections/header";
import CustomerTable from "@/app/components/page-sections/customers/customer-order-table";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useGetCustomerOrdersQuery } from "@/app/api/apiSlice";
import { useEffect } from "react";

function Orders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");

  const { data, isLoading } = useGetCustomerOrdersQuery(userId);

  const handleRowClick = () => {
    router.push(`/admin/customers`);
  };

  useEffect(() => {
    if (!userId) {
      router.push(`/admin/customers`);
    }
  }, [userId]);

  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Customers" />
      <div className="bg-white py-5 rounded-lg">
        <div className="flex items-center justify-between my-3 px-3">
          <p className="text-gray_600 flex gap-3 items-center">
            <span onClick={handleRowClick}>
              <IoIosArrowRoundBack size="1.2rem" />
            </span>
            <span>{userName}</span>
          </p>
          <p className="font-bold">
            <span>Total Orders</span>{" "}
            <span className="text-blue_400 ml-2">{data?.data?.length}</span>
          </p>
        </div>
        <CustomerTable data={data} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default Orders;
