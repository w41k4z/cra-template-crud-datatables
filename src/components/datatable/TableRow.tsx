/* COMPONENTS */
import { ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";

/* HELPER */
import { formatNumberToCurrency } from "../../helpers/NumberHelper";

interface TableRowProps {
  hasAction?: boolean;
  columns: any[];
  data: any;
  indexedRow: boolean;
  index: number;
  updateModalFormInputs: { input: ReactNode; label?: ReactNode }[];
  onUpdate: (row: any) => void;
  onDelete: (row: any) => void;
  dataPropIDName: string;
}

const TableRow = ({
  hasAction = false,
  columns,
  data,
  indexedRow,
  index,
  updateModalFormInputs,
  onUpdate,
  onDelete,
  dataPropIDName,
}: TableRowProps) => {
  /* HOOKS */
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  /* LOGIC */
  const showUpdateModal = () => setUpdateModalVisibility(true);
  const hideUpdateModal = () => setUpdateModalVisibility(false);
  const showDeleteModal = () => setDeleteModalVisibility(true);
  const hideDeleteModal = () => setDeleteModalVisibility(false);

  /* ELEMENT */
  const updateModal = (row: any) => {
    return (
      <Modal show onHide={hideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update general chart of account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {updateModalFormInputs.map((input, index) => {
              return (
                <div className="mb-3" key={"update-modal-input-" + index}>
                  {input.label}
                  {input.input}
                </div>
              );
            })}
            <div className="d-flex justify-content-end">
              <div className="btn-group">
                <button
                  className="btn btn-secondary"
                  onClick={(event) => {
                    event.preventDefault();
                    hideUpdateModal();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning"
                  onClick={(event) => {
                    event.preventDefault();
                    onUpdate(row);
                    setUpdateModalVisibility(false);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };
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
              onDelete(row);
              hideDeleteModal();
            }}
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );

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
            className={column.format === "currency" ? "text-end" : ""}
          >
            {column.format === "currency"
              ? formatNumberToCurrency(data[column.propTarget])
              : data[column.propTarget]}
          </td>
        );
      })}
      {hasAction && (
        <td className="btn-group w-100">
          <button
            className="btn btn-outline-warning"
            onClick={() => {
              showUpdateModal();
            }}
          >
            <BiEditAlt />
          </button>
          {updateModalVisibility && updateModal(data)}
          <button
            className="btn btn-outline-danger"
            onClick={(event) => {
              event.preventDefault();
              showDeleteModal();
            }}
          >
            <BiTrash />
          </button>
          {deleteModalVisibility && deleteModal(data)}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
