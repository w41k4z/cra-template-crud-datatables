import GenericTable from "../../../components/datatable/GenericTable";

import { tableAction } from "../table-action";
import { tableColumns } from "../table-column";
import { testData } from "../mock";

const ExampleView = () => {
  return (
    <GenericTable
      hasAction={tableAction}
      indexedRow
      title="Example table"
      columns={tableColumns}
      data={testData}
    />
  );
};

export default ExampleView;
