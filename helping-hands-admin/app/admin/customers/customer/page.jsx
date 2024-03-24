"use client";
import { useRouter } from "next/navigation";
import Header from "@components/page-sections/header";
import CustomerTable from "@/app/components/page-sections/customers/customer-table";
import { IoIosArrowRoundBack } from "react-icons/io";

function Customer() {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/admin/customers`);
  };
  return (
    <section className="flex flex-col w-[92%] mx-auto gap-4 ">
      <Header title="Customers" />
      <div className="bg-white py-5 rounded-lg">
        <div className="flex items-center justify-between my-3 px-3">
          <p className="text-gray_600 flex gap-3 items-center">
            <span onClick={handleRowClick}>
              <IoIosArrowRoundBack size="1.2rem" />
            </span>
            <span>Isaac Adenuga</span>
          </p>
          <p className="font-bold">
        
            <span>Total Orders</span> <span className="text-blue_400 ml-2">50</span>
          </p>
        </div>
        <CustomerTable />
      </div>
    </section>
  );
}

export default Customer;
