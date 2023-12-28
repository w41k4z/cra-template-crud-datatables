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
    title: "",
    elements: [
      {
        title: "",
        path: "",
        icon: null,
        onItemClick: () => {},
      },
    ],
  },
];
