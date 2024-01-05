import { BiPlus } from "react-icons/bi";
import useTableFeature from "./useTableFeature";
import { Column } from "./column";
import { Modal } from "react-bootstrap";
import GenericForm from "../form/GenericForm";
import { FieldValues } from "react-hook-form";
import { FormField } from "../form/FormField";
import { BsDownload } from "react-icons/bs";

export type AddActionType = {
  formTitle: string;
  fields: FormField[];
  onSubmit: (data: FieldValues) => Promise<void>;
};

export type TableFeatureType = {
  hasExportPdf?: boolean;
};

type TableFeatureProps = {
  columns: Column[];
  data: any[];
  displayedData: any[];
  tableTitle?: string;
  setData: (data: any[]) => void;
  setItemsPerPageValue: (value: string) => void;
  hasAddAction?: AddActionType;
  hasFeature?: TableFeatureType;
  itemsPerPage?: string[];
};

const TableFeature = ({
  columns,
  setData,
  data,
  displayedData,
  tableTitle,
  setItemsPerPageValue,
  hasAddAction,
  hasFeature,
  itemsPerPage = ["5", "10", "15", "*"],
}: TableFeatureProps) => {
  const { addModalVisibility, showAddModal, hideAddModal, exportPDF } =
    useTableFeature({
      tableTitle,
      columns,
      displayedData,
    });

  return (
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
      <div className="action d-flex">
        {hasFeature && hasFeature.hasExportPdf && (
          <button
            className="btn btn-outline-dark d-flex align-items-center"
            onClick={exportPDF}
          >
            <BsDownload style={{ fontSize: "20px" }} className="me-2" /> Export
            pdf
          </button>
        )}
        {hasAddAction && (
          <button
            className="mx-1 btn btn-outline-primary"
            onClick={showAddModal}
          >
            <BiPlus style={{ fontSize: "20px" }} />
          </button>
        )}
        {addModalVisibility && hasAddAction && (
          <Modal show onHide={hideAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add new</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GenericForm
                fields={hasAddAction.fields}
                title={hasAddAction.formTitle}
                onSubmit={(insertedData) => {
                  return hasAddAction.onSubmit(insertedData).then(() => {
                    const newData = [...data];
                    newData.push(insertedData);
                    setData(newData);
                    hideAddModal();
                  });
                }}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TableFeature;
