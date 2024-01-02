type TestDataType = {
  fullName: string;
  birthDate: Date;
  kids: number;
};

export const testData: TestDataType[] = [
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
