export interface Column {
  name: string;
  propTarget: string;
  format: "number" | "currency" | "date" | "datetime" | "default";
}
