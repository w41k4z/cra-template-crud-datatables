import React from "react";
import { Column } from "./column";
import { AiOutlineClose } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { clearFilter, handleFilter, FilterAction } from "./filter";

type TableHeaderProps = {
  indexedRow?: boolean;
  columns: Column[];
  filters: { [key: string]: string[] } | undefined;
  setFilters: (filters: { [key: string]: string[] }) => void;
  hasAction?: boolean;
};

const filterContainerStyle = {
  height: "30px",
  width: "fit-content",
  borderBottom: "1px outset",
  paddingBottom: "5px",
  display: "flex",
  alignItems: "center",
};
const filterStyle = {
  outline: "none",
  border: "unset",
};

const TableHeader = ({
  indexedRow = false,
  columns,
  filters,
  setFilters,
  hasAction = false,
}: TableHeaderProps) => {
  return (
    <thead className="px-2 table-bordered table-dark">
      <tr
        style={{
          color: "#000",
          fontSize: "1rem",
          fontWeight: "bold",
          borderBottom: "1px solid #959090",
        }}
        className="text-white"
      >
        {indexedRow && (
          <th scope="col">
            <div>#.</div>
          </th>
        )}
        {columns.map((column, index) => {
          return (
            <th scope="col" key={"table-header-" + index}>
              <div className="mb-1">{column.name}</div>
              {column.format === "default" && (
                <>
                  <div style={filterContainerStyle}>
                    <BsFilter
                      className="me-1 d-none d-md-block"
                      style={{ fontSize: "23px" }}
                    />
                    <input
                      className="bg-dark text-white"
                      style={filterStyle}
                      placeholder={"Filter by '" + column.name + "'"}
                      type="text"
                      value={filters ? filters[column.propTarget][0] : ""}
                      onChange={(event) => {
                        handleFilter(
                          filters,
                          column.propTarget,
                          event.target.value,
                          FilterAction.HANDLE_TEXT_FILTER,
                          setFilters
                        );
                      }}
                    />
                    <AiOutlineClose
                      onClick={() => {
                        clearFilter(
                          filters,
                          column.propTarget,
                          FilterAction.CLEAR_TEXT_FILTER,
                          setFilters
                        );
                      }}
                    />
                  </div>
                </>
              )}
              {column.format === "number" && (
                <div className="d-flex">
                  <div style={filterContainerStyle}>
                    <BsFilter
                      className="me-1 d-none d-md-block"
                      style={{ fontSize: "23px" }}
                    />
                    <input
                      className="bg-dark text-white"
                      style={{
                        outline: "none",
                        border: "unset",
                        width: "65px",
                      }}
                      placeholder={"Min"}
                      type="text"
                      value={filters ? filters[column.propTarget][0] : ""}
                      onChange={(event) => {
                        handleFilter(
                          filters,
                          column.propTarget,
                          event.target.value,
                          FilterAction.HANDLE_LOWER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                    <AiOutlineClose
                      onClick={() => {
                        clearFilter(
                          filters,
                          column.propTarget,
                          FilterAction.CLEAR_LOWER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                  </div>
                  <div className="ms-2" style={filterContainerStyle}>
                    <input
                      className="bg-dark text-white"
                      style={{
                        outline: "none",
                        border: "unset",
                        width: "85px",
                      }}
                      placeholder={"Max"}
                      type="text"
                      value={filters ? filters[column.propTarget][1] : ""}
                      onChange={(event) => {
                        handleFilter(
                          filters,
                          column.propTarget,
                          event.target.value,
                          FilterAction.HANDLE_UPPER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                    <AiOutlineClose
                      onClick={() => {
                        clearFilter(
                          filters,
                          column.propTarget,
                          FilterAction.CLEAR_UPPER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                  </div>
                </div>
              )}
              {column.format === "date" && (
                <div className="d-flex">
                  <div style={filterContainerStyle}>
                    <input
                      className="bg-dark text-white"
                      style={{
                        outline: "none",
                        border: "unset",
                        width: "125px",
                      }}
                      placeholder={"From"}
                      type="date"
                      value={filters ? filters[column.propTarget][0] : ""}
                      onChange={(event) => {
                        handleFilter(
                          filters,
                          column.propTarget,
                          event.target.value,
                          FilterAction.HANDLE_LOWER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                    <AiOutlineClose
                      className="ms-1"
                      onClick={() => {
                        clearFilter(
                          filters,
                          column.propTarget,
                          FilterAction.CLEAR_LOWER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                  </div>
                  <div className="ms-2" style={filterContainerStyle}>
                    <input
                      className="bg-dark text-white"
                      style={{
                        outline: "none",
                        border: "unset",
                        width: "125px",
                      }}
                      placeholder={"To"}
                      type="date"
                      value={filters ? filters[column.propTarget][1] : ""}
                      onChange={(event) => {
                        handleFilter(
                          filters,
                          column.propTarget,
                          event.target.value,
                          FilterAction.HANDLE_UPPER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                    <AiOutlineClose
                      className="ms-1"
                      onClick={() => {
                        clearFilter(
                          filters,
                          column.propTarget,
                          FilterAction.CLEAR_UPPER_LIMIT_FILTER,
                          setFilters
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </th>
          );
        })}
        {hasAction && (
          <th scope="col" className="text-center">
            <div style={{ height: "30px" }}></div>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
