/* MODULES */
import { ReactNode, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* COMPONENT */
import { BiPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BsDownload, BsUpload, BsFilter } from "react-icons/bs";
import { TableColumn } from "./TableColumn";
import { Modal } from "react-bootstrap";
import TableRow from "./TableRow";

interface BasicCRUDTableProps {
  title?: string;
  columns: TableColumn[];
  data: any[];
  dataPropIDName: string;
  indexedRow?: boolean;
  hasImportCsv?: boolean;
  hasExportPdf?: boolean;
  hasAction?: boolean;
  addModalFormInputs: { input: ReactNode; label: ReactNode }[];
  onAdd: () => void;
  onUpdate: (row: any) => void;
  onDelete: (row: any) => void;
  updateModalFormInputs: (
    row: any
  ) => { input: ReactNode; label?: ReactNode }[];
  uploadCall: (file: File) => void;
}

const BasicCRUDTable = ({
  title,
  columns,
  data,
  dataPropIDName,
  indexedRow = false,
  hasImportCsv = false,
  hasExportPdf = false,
  hasAction = true,
  addModalFormInputs,
  onAdd,
  onUpdate,
  onDelete,
  updateModalFormInputs,
  uploadCall,
}: BasicCRUDTableProps) => {
  /* HOOOKS */
  const [filters, setFilters] = useState<{ [key: string]: string[] }>();
  const [filteredData, setFilteredData] = useState<any[]>([]);
  useEffect(() => {
    const arrFilters: { [key: string]: string[] } = {};
    for (const column of columns) {
      arrFilters[column.propTarget] = [""];
    }
    setFilters(arrFilters);
    setFilteredData(data);
  }, [columns, data]);
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [importModalVisibility, setImportModalVisibility] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File>();

  /* STYLES */
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

  /* LOGIC */
  const showAddModal = () => setAddModalVisibility(true);
  const hideAddModal = () => setAddModalVisibility(false);
  const showImportModal = () => setImportModalVisibility(true);
  const hideImportModal = () => setImportModalVisibility(false);

  const filterData = () => {
    let filteredData = data;
    for (const column of columns) {
      filteredData = filteredData.filter((item) => {
        if (column.format === "number" || column.format === "currency") {
          let lowerValue: number =
            filters && filters[column.propTarget][0]
              ? parseFloat(filters[column.propTarget][0])
              : Number.MIN_VALUE;
          let upperValue: number =
            filters && filters[column.propTarget][1]
              ? parseFloat(filters[column.propTarget][1])
              : Number.MAX_VALUE;
          if (
            lowerValue <= item[column.propTarget] &&
            item[column.propTarget] <= upperValue
          ) {
            return item[column.propTarget];
          }
          return null;
        } else {
          return item[column.propTarget]
            .toString()
            .toLowerCase()
            .includes(
              filters ? filters[column.propTarget][0].toLowerCase() : ""
            );
        }
      });
    }
    setFilteredData(filteredData);
  };
  const handleFilter = (filter: string, value: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter][0] = value;
    setFilters({ ...arrFilter });
  };
  const handleUpperNumberFilter = (filter: string, value: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter][1] = value;
    setFilters({ ...arrFilter });
  };
  const clearFilter = (filter: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter][0] = "";
    setFilters({ ...arrFilter });
  };
  const clearUpperNumberFilter = (filter: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter][1] = "";
    setFilters({ ...arrFilter });
  };

  const uploadFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    uploadingFile && uploadCall(uploadingFile);
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const docTitle = title ? title : "Report";
    const headers = [columns.map((column) => column.name)];

    const data = filteredData.map((data) =>
      columns.map((column) => data[column.propTarget])
    );

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(docTitle, marginLeft, 40);
    autoTable(doc, content);
    doc.save(`${docTitle}.pdf`);
  };

  /* ELEMENT */
  const addModal = (
    <Modal show onHide={hideAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new {title && title.toLowerCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          {addModalFormInputs.map((input, index) => (
            <div className="mb-3" key={index}>
              {input.label}
              {input.input}
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                onAdd();
                setAddModalVisibility(false);
              }}
            >
              Add
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
  const importModal = (
    <Modal show onHide={hideImportModal}>
      <Modal.Header closeButton>
        <Modal.Title>Import csv</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data" method="POST">
          <div className="mb-3">
            <label htmlFor="csvFile" className="form-label">
              Select csv file
            </label>
            <input
              type="file"
              className="form-control"
              id="csvFile"
              accept=".csv"
              required
              onChange={(event) => {
                if (event.target.files) {
                  setUploadingFile(event.target.files[0]);
                }
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={async (event) => {
                await uploadFile(event);
                setImportModalVisibility(false);
              }}
            >
              Import
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="m-4 bg-white">
      <div className="d-flex flex-column flex-md-row justify-content-md-between p-3">
        <h3>{title}</h3>
        <div
          className="d-flex align-items-center mt-sm-3 mt-md-0"
          style={{ height: "fit-content" }}
        >
          <div className="action d-flex">
            {hasImportCsv && (
              <>
                <button
                  className="btn btn-outline-success d-flex align-items-center me-2"
                  onClick={showImportModal}
                >
                  <BsUpload style={{ fontSize: "20px" }} className="me-2" />
                  Import csv
                </button>
                {importModalVisibility && importModal}
              </>
            )}
            {hasExportPdf && (
              <button
                className="btn btn-outline-dark d-flex align-items-center"
                onClick={exportPDF}
              >
                <BsDownload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Export pdf
              </button>
            )}
          </div>
          {hasAction && (
            <button
              className="mx-1 btn btn-outline-primary"
              onClick={showAddModal}
            >
              <BiPlus style={{ fontSize: "20px" }} />
            </button>
          )}
          {addModalVisibility && addModal}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
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
                    <div>{column.name}</div>
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
                                column.propTarget,
                                event.target.value
                              );
                            }}
                          />
                          <AiOutlineClose
                            onClick={() => {
                              clearFilter(column.propTarget);
                            }}
                          />
                        </div>
                      </>
                    )}
                    {(column.format === "number" ||
                      column.format === "currency") && (
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
                                column.propTarget,
                                event.target.value
                              );
                            }}
                          />
                          <AiOutlineClose
                            onClick={() => {
                              clearFilter(column.propTarget);
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
                              handleUpperNumberFilter(
                                column.propTarget,
                                event.target.value
                              );
                            }}
                          />
                          <AiOutlineClose
                            onClick={() => {
                              clearUpperNumberFilter(column.propTarget);
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
                  <div></div> <div style={{ height: "30px" }}></div>
                </th>
              )}
            </tr>
          </thead>
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
            {filteredData.map((data, index) => (
              <TableRow
                key={"Table-row-" + index}
                columns={columns}
                data={data}
                hasAction={hasAction}
                dataPropIDName={dataPropIDName}
                indexedRow={indexedRow}
                index={index + 1}
                updateModalFormInputs={updateModalFormInputs(data)}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasicCRUDTable;
