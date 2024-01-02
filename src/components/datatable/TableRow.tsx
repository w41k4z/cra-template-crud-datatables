import { BiEditAlt, BiTrash } from "react-icons/bi";
import moment from "moment";
import { formatNumberToCurrency } from "../../helpers/NumberHelper";
import useRowAction from "./useRowAction";
import { Modal } from "react-bootstrap";
import GenericForm from "../form/GenericForm";
import { FormField } from "../form/FormField";
import { FieldValues } from "react-hook-form";

export type UpdateActionType = (data: any) => {
  fields: FormField[];
  title: string;
  onSubmit: (data: FieldValues) => Promise<void>;
};

type TableRowProps = {
  hasUpdateAction?: UpdateActionType;
  hasDeleteAction?: (row: any) => void;
  columns: any[];
  data: any;
  indexedRow?: boolean;
  index: number;
};

const displayColumnValue = (column: any, data: any) => {
  switch (column.format) {
    case "currency":
      return formatNumberToCurrency(data[column.propTarget]);
    case "date":
      return moment(data[column.propTarget]).format("DD/MM/YYYY");
    default:
      return data[column.propTarget];
  }
};

const TableRow = ({
  hasUpdateAction,
  hasDeleteAction,
  columns,
  data,
  indexedRow = false,
  index,
}: TableRowProps) => {
  const {
    deleteModalVisibility,
    showDeleteModal,
    hideDeleteModal,
    updateModalVisibility,
    showUpdateModal,
    hideUpdateModal,
  } = useRowAction();

  const deleteModal = (row: any) => (
    <Modal show onHide={hideDeleteModal} centered>
      <Modal.Body
        className="text-center"
        style={{ fontStyle: "bold", fontSize: "25px" }}
      >
        Are you sure you want to delete this ?
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={hideDeleteModal}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              hasDeleteAction && hasDeleteAction(row);
              hideDeleteModal();
            }}
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );

  const updateModal = (row: any) => {
    return (
      <Modal show onHide={hideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GenericForm
            submitButtonValue="Update"
            fields={row.fields}
            title={row.formTitle}
            onSubmit={(data) => {
              hideUpdateModal();
              return row.onSubmit(data);
            }}
          />
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <tr>
      {indexedRow && (
        <th scope="row" className="mt-auto">
          {index}.
        </th>
      )}
      {columns.map((column, index2) => {
        return (
          <td
            key={"table-row-" + index + "-" + index2}
            className={
              column.format === "number" || column.format === "currency"
                ? "text-end"
                : ""
            }
          >
            {displayColumnValue(column, data)}
          </td>
        );
      })}
      {(hasUpdateAction || hasDeleteAction) && (
        <td className="btn-group w-100">
          {hasUpdateAction && (
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                showUpdateModal();
              }}
            >
              <BiEditAlt />
            </button>
          )}
          {updateModalVisibility &&
            hasUpdateAction &&
            updateModal(hasUpdateAction(data))}
          {hasDeleteAction && (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                showDeleteModal();
              }}
            >
              <BiTrash />
            </button>
          )}
          {deleteModalVisibility && deleteModal(data)}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
