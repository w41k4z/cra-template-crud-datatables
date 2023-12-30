import * as FlatColor from "react-icons/fc";

export interface NavElement {
  title: string;
  elements: {
    title: string;
    path: string;
    icon: React.ReactNode;
    onItemClick: () => void;
  }[];
}

export const navConfig: NavElement[] = [
  {
    title: "Department",
    elements: [
      {
        title: "Need Approval",
        path: "",
        icon: <FlatColor.FcSettings />,
        onItemClick: () => {},
      },
    ],
  },
];
