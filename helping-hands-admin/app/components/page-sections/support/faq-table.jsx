import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import { faqColumns } from "@/app/data";
import {
  formatAmount,
  formatLongText,
  formatStatus,
} from "../../common/table-items";
import { useGetFaqQuery } from "@/app/api/apiSlice";

function FaqTable() {
  const [pageIndex, setPageIndex] = useState();
  const { data, isLoading } = useGetFaqQuery(pageIndex);

  console.log(data);
  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      id: item.id,
      category: item.category,
      question: formatLongText(item.question),
      answer: formatLongText(item.answer),
    }));
  }, [data]);

  const onPageChange = (label) => {
   
    setPageIndex(label);
  };
  return (
    <div className="bg-white">
      <Table
        columns={faqColumns}
        data={rowData || []}
        styledHeader
        pagination
        paginationData={data?.meta}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default FaqTable;
