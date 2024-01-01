import { useEffect, useState } from "react";

import { BiPlus } from "react-icons/bi";
import { FaTable } from "react-icons/fa";
import { Column } from "./column";
import TableRow from "./TableRow";

import { filterData } from "./filter";
import TableHeader from "./TableHeader";

import "./datatable.css";
import { set } from "react-hook-form";

interface GenericTableProps {
  title?: string;
  columns: Column[];
  data: any[];
  indexedRow?: boolean;
  hasAction?: boolean;
  itemsPerPage?: string[];
}

const GenericTable = ({
  title,
  columns,
  data,
  indexedRow = false,
  hasAction = false,
  itemsPerPage = ["5", "10", "15", "*"],
}: GenericTableProps) => {
  console.log("Rendering...");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage[0]);
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

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center">
        <FaTable style={{ fontSize: "20px" }} />
        <span className="ms-2">{title}</span>
      </div>
      <div className="card-body bg-white">
        <div className="datatable-top mt-sm-3 mt-md-0 mb-2">
          <div>
            <select
              className="form-select-sm me-2"
              onChange={(e) => {
                setItemsPerPageValue(e.target.value);
              }}
            >
              {itemsPerPage.map((item, index) => (
                <option key={"items-per-page-" + index}>{item}</option>
              ))}
            </select>
            entries per page
          </div>
          {hasAction && (
            <button className="mx-1 btn btn-outline-primary">
              <BiPlus style={{ fontSize: "20px" }} />
            </button>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <TableHeader
              indexedRow={indexedRow}
              hasAction={hasAction}
              columns={columns}
              filters={filters}
              setFilters={setFilters}
            />
            <tbody className="px-2">
              {filteredData.length === 0 && (
                <tr>
                  {indexedRow && <td>0</td>}
                  {columns.map((column, index) => {
                    return (
                      <td
                        key={"table-row-null-" + index}
                        style={{
                          fontStyle: "italic",
                        }}
                      >
                        null
                      </td>
                    );
                  })}
                </tr>
              )}
              {paginatedData.map((data, index) => (
                <TableRow
                  key={"Table-row-" + index}
                  columns={columns}
                  data={data}
                  hasAction={hasAction}
                  indexedRow={indexedRow}
                  index={start + index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="datatable-bottom">
          <p>Showing 1 to 6 of 6 entries</p>
          {pagesCount > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className="page-item page-link"
                  onClick={() => {
                    navigate(currentPage - 1);
                  }}
                >
                  Previous
                </li>
                {pagesCount > 8 && (
                  <>
                    <li
                      className={
                        "page-item page-link" +
                        (currentPage === 1 ? " active" : "")
                      }
                      onClick={() => navigate(1)}
                    >
                      1
                    </li>
                    <li
                      className={
                        "page-item page-link" +
                        (currentPage === 2 ? " active" : "")
                      }
                      onClick={() => navigate(2)}
                    >
                      2
                    </li>
                    {(currentPage < 3 || currentPage > pagesCount - 2) && (
                      <li className="page-item page-link">...</li>
                    )}
                    {currentPage >= 3 && currentPage <= pagesCount - 2 && (
                      <li className="page-item active page-link">
                        {currentPage}
                      </li>
                    )}
                    <li
                      className={
                        "page-item page-link" +
                        (currentPage === pagesCount - 1 ? " active" : "")
                      }
                      onClick={() => navigate(pagesCount - 1)}
                    >
                      {pagesCount - 1}
                    </li>
                    <li
                      className={
                        "page-item page-link" +
                        (currentPage === pagesCount ? " active" : "")
                      }
                      onClick={() => navigate(pagesCount)}
                    >
                      {pagesCount}
                    </li>
                  </>
                )}
                {pagesCount <= 8 && (
                  <>
                    {Array.from(Array(pagesCount).keys()).map((page, index) => (
                      <li
                        key={"page-item-" + index}
                        className={
                          "page-item page-link" +
                          (currentPage === page + 1 ? " active" : "")
                        }
                        onClick={() => navigate(page + 1)}
                      >
                        {page + 1}
                      </li>
                    ))}
                  </>
                )}
                <li
                  className="page-item page-link"
                  onClick={() => navigate(currentPage + 1)}
                >
                  Next
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
