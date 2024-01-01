export interface Column {
  name: string;
  propTarget: string;
  format: "number" | "date" | "default";
}
