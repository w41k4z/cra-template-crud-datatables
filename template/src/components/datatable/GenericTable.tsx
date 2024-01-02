import { FaTable } from "react-icons/fa";
import { Column } from "./column";
import TableRow from "./TableRow";

import { filterData } from "./filter";
import TableHeader from "./TableHeader";

import "./datatable.css";
import useDatatable from "./useDatatable";
import TableFeature, {
  type TableFeatureType,
  type AddActionType,
} from "./TableFeature";
import EmptyRow from "./EmptyRow";
import TablePagination from "./TablePagination";
import { type UpdateActionType } from "./TableRow";

export type TableActionType = {
  addAction?: AddActionType;
  updateAction?: UpdateActionType;
  deleteAction?: (data: any) => void;
  hasFeature?: TableFeatureType;
};

type GenericTableProps = {
  title?: string;
  columns: Column[];
  data: any[];
  indexedRow?: boolean;
  itemsPerPage?: string[];
  hasAction?: TableActionType;
};

const GenericTable = ({
  title,
  columns,
  data,
  indexedRow = false,
  hasAction,
  itemsPerPage = ["5", "10", "15", "*"],
}: GenericTableProps) => {
  const {
    navigate,
    setFilteredData,
    setItemsPerPageValue,
    filters,
    setFilters,
    paginatedData,
    currentPage,
    itemsCount,
    pagesCount,
    start,
  } = useDatatable({ columns, data, itemsPerPage, filterData });

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center">
        <FaTable style={{ fontSize: "20px" }} />
        <span className="ms-2">{title}</span>
      </div>
      <div className="card-body bg-white">
        <TableFeature
          columns={columns}
          setData={setFilteredData}
          data={paginatedData}
          tableTitle={title}
          setItemsPerPageValue={setItemsPerPageValue}
          hasAddAction={hasAction?.addAction}
          hasFeature={hasAction?.hasFeature}
        />
        <div className="table-responsive datatable">
          <table className="table table-striped">
            <TableHeader
              indexedRow={indexedRow}
              hasAction={
                hasAction &&
                (hasAction.updateAction || hasAction.deleteAction) &&
                true
              }
              columns={columns}
              filters={filters}
              setFilters={setFilters}
            />
            <tbody className="px-2">
              {paginatedData.length === 0 && <EmptyRow />}
              {paginatedData.map((data, index) => (
                <TableRow
                  key={"Table-row-" + index}
                  columns={columns}
                  data={data}
                  hasUpdateAction={hasAction?.updateAction}
                  hasDeleteAction={hasAction?.deleteAction}
                  indexedRow={indexedRow}
                  index={start + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          start={start}
          itemsCount={itemsCount}
          paginatedData={paginatedData}
          pagesCount={pagesCount}
          currentPage={currentPage}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default GenericTable;
