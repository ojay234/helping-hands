import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import { faqColumns } from "@/app/data";
import {
  formatAmount,
  formatLongText,
  formatStatus,
} from "../../common/table-items";

function FaqTable({ data, isLoading, onPageChange }) {


  console.log(data);
  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      id: item.id,
      category: item.category,
      question: formatLongText(item.question),
      answer: formatLongText(item.answer),
    }));
  }, [data]);


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
