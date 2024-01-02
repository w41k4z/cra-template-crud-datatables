import { TableActionType } from "../../components/datatable/GenericTable";

export const tableAction: TableActionType = {
  addAction: {
    formTitle: "Add new example",
    fields: [
      {
        name: "fullName",
        type: "text",
        label: "Full name",
        options: {
          required: true,
        },
      },
      {
        name: "birthDate",
        type: "datetime-local",
        label: "Birth date",
        step: 1,
      },
      {
        name: "kids",
        type: "number",
        label: "Number of child",
        options: {
          required: true,
          min: {
            value: 0,
            message: "Number of child must be greater than 0",
          },
        },
      },
    ],
    onSubmit: async (data) => {
      console.log(data);
    },
  },
  deleteAction: (data) => {
    console.log(data);
  },
  updateAction: (data) => {
    return {
      formTitle: "Update example",
      fields: [
        {
          name: "fullName",
          type: "text",
          label: "Full name",
          options: {
            required: true,
          },
          defaultValue: data.fullName,
        },
        {
          name: "kids",
          type: "number",
          label: "Number of child",
          options: {
            required: true,
            min: {
              value: 0,
              message: "Number of child must be greater than 0",
            },
          },
          defaultValue: data.kids,
        },
      ],
      onSubmit: async (data) => {
        console.log(data);
      },
      title: "Update example",
    };
  },
  hasFeature: {
    hasExportPdf: true,
  },
};
