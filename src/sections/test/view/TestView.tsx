import GenericTable from "../../../components/datatable/GenericTable";
import { Column } from "../../../components/datatable/column";

type TestDataType = {
  fullName: string;
  birthDate: Date;
  kids: number;
};

const testData: TestDataType[] = [
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
  {
    fullName: "Rakoto Cyril",
    birthDate: new Date("1989-12-31"),
    kids: 5,
  },
  {
    fullName: "Randria Jean",
    birthDate: new Date("1985-05-26"),
    kids: 3,
  },
  {
    fullName: "Rabe Solofo",
    birthDate: new Date("2000-04-12"),
    kids: 0,
  },
];

const TestView = () => {
  const tableColumns: Column[] = [
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

  return (
    <GenericTable
      indexedRow
      title="Test"
      columns={tableColumns}
      data={testData}
    />
  );
};

export default TestView;
