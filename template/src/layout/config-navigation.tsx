import * as FlatColor from "react-icons/fc";

export type NavElement = {
  title: string;
  elements: {
    title: string;
    path: string;
    icon: React.ReactNode;
    onItemClick: () => void;
  }[];
};

export const navConfig: NavElement[] = [
  {
    title: "Department",
    elements: [
      {
        title: "Example",
        path: "/example",
        icon: <FlatColor.FcSettings />,
        onItemClick: () => {},
      },
    ],
  },
];
