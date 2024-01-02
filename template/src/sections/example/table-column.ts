import { Column } from "../../components/datatable/column";

export const tableColumns: Column[] = [
  {
    name: "Full name",
    propTarget: "fullName",
    format: "default",
  },
  {
    name: "Birth date",
    propTarget: "birthDate",
    format: "date",
  },
  {
    name: "Number of child",
    propTarget: "kids",
    format: "number",
  },
];
