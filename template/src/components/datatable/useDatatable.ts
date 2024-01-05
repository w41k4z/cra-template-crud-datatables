import { useEffect, useState } from "react";
import { Column } from "./column";

type DatatableProps = {
  columns: Column[];
  data: any[];
  itemsPerPage: string[];
  filterData: (
    data: any[],
    columns: Column[],
    filters: { [key: string]: string[] },
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>
  ) => void;
};

function useDatatable({
  columns,
  data,
  itemsPerPage,
  filterData,
}: DatatableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage[0]);
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPageValue]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>();
  const [filteredData, setFilteredData] = useState<any[]>(data);
  useEffect(() => {
    const arrFilters: { [key: string]: string[] } = {};
    for (const column of columns) {
      arrFilters[column.propTarget] = [""];
    }
    setFilters(arrFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (filters) {
      filterData(data, columns, filters, setFilteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  const itemsCount = filteredData.length;
  const pagesCount = Math.ceil(itemsCount / parseInt(itemsPerPageValue));
  const itemsPerPageNumberValue =
    itemsPerPageValue === "*" ? itemsCount : parseInt(itemsPerPageValue);
  const start = (currentPage - 1) * itemsPerPageNumberValue;
  const end = currentPage * itemsPerPageNumberValue;
  const paginatedData = filteredData.slice(start, end);

  const navigate = (page: number) => {
    page = page > pagesCount ? 1 : page;
    page = page < 1 ? pagesCount : page;
    setCurrentPage(page);
  };

  return {
    navigate,
    setItemsPerPageValue,
    filteredData,
    setFilteredData,
    filters,
    setFilters,
    paginatedData,
    start,
    itemsCount,
    currentPage,
    pagesCount,
  };
}

export default useDatatable;
