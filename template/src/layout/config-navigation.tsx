import {
  RxActivityLog,
  RxBorderWidth,
  RxClock,
  RxColumns,
  RxDashboard,
  RxPaperPlane,
} from "react-icons/rx";

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
    title: "Table",
    elements: [
      {
        title: "Activité",
        path: "/activité",
        icon: <RxActivityLog />,
        onItemClick: () => {},
      },
      {
        title: "Bouquet",
        path: "/bouquet",
        icon: <RxDashboard />,
        onItemClick: () => {},
      },
      {
        title: "Activité de bouquet",
        path: "/activités-bouquet",
        icon: <RxDashboard />,
        onItemClick: () => {},
      },
      {
        title: "Durée",
        path: "/durée",
        icon: <RxClock />,
        onItemClick: () => {},
      },
      {
        title: "Catégorie",
        path: "/catégorie",
        icon: <RxColumns />,
        onItemClick: () => {},
      },
      {
        title: "Voyage",
        path: "/voyage",
        icon: <RxPaperPlane />,
        onItemClick: () => {},
      },
      {
        title: "Activité de voyage",
        path: "/activités-voyage",
        icon: <RxBorderWidth />,
        onItemClick: () => {},
      },
    ],
  },
];
