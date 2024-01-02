import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Column } from "./column";
import moment from "moment";

type TableFeatureProps = {
  tableTitle?: string;
  columns: Column[];
  data: any[];
};

const useTableFeature = ({ tableTitle, columns, data }: TableFeatureProps) => {
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [importModalVisibility, setImportModalVisibility] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File>();

  const showAddModal = () => setAddModalVisibility(true);
  const hideAddModal = () => setAddModalVisibility(false);
  const showImportModal = () => setImportModalVisibility(true);
  const hideImportModal = () => setImportModalVisibility(false);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const docTitle = tableTitle ? tableTitle : "Report";
    const headers = [columns.map((column) => column.name)];

    const dataToExport = data.map((item) =>
      columns.map((column) =>
        column.format === "date"
          ? moment(item[column.propTarget]).format("DD/MM/YYYY")
          : item[column.propTarget]
      )
    );

    let content = {
      startY: 50,
      head: headers,
      body: dataToExport,
    };

    doc.text(docTitle, marginLeft, 40);
    autoTable(doc, content);
    doc.save(`${docTitle}.pdf`);
  };

  return {
    addModalVisibility,
    hideAddModal,
    showAddModal,
    importModalVisibility,
    hideImportModal,
    showImportModal,
    uploadingFile,
    setUploadingFile,
    exportPDF,
  };
};

export default useTableFeature;
