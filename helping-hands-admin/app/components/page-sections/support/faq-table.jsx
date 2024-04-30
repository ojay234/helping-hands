import { useMemo, useState } from "react";
import Table from "@components/common/Table";
import { faqColumns } from "@/app/data";
import {
  formatAmount,
  formatLongText,
  formatStatus,
} from "../../common/table-items";
import ActionButtons from "./table-action";

function FaqTable({ data, isLoading, onPageChange, refetch }) {
  const rowData = useMemo(() => {
    return data?.data?.map((item, index) => ({
      id: item.id,
      category: item.category,
      question: formatLongText(item.question),
      answer: formatLongText(item.answer),
      action: <ActionButtons faqItem={item} refetch={refetch} />,
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
