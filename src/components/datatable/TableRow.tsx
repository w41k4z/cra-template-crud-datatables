/* COMPONENTS */
import { BiEditAlt, BiTrash } from "react-icons/bi";
import moment from "moment";

interface TableRowProps {
  hasAction?: boolean;
  columns: any[];
  data: any;
  indexedRow?: boolean;
  index: number;
}

const TableRow = ({
  hasAction = false,
  columns,
  data,
  indexedRow = false,
  index,
}: TableRowProps) => {
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
            className={column.format === "number" ? "text-end" : ""}
          >
            {column.format === "date"
              ? moment(data[column.propTarget]).format("DD/MM/YYYY")
              : data[column.propTarget]}
          </td>
        );
      })}
      {hasAction && (
        <td className="btn-group w-100">
          <button
            className="btn btn-outline-warning"
            // onClick={() => {
            //   showUpdateModal();
            // }}
          >
            <BiEditAlt />
          </button>
          {/* {updateModalVisibility && updateModal(data)} */}
          <button
            className="btn btn-outline-danger"
            onClick={(event) => {
              event.preventDefault();
              // showDeleteModal();
            }}
          >
            <BiTrash />
          </button>
          {/* {deleteModalVisibility && deleteModal(data)} */}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
