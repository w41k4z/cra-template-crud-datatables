import { FieldValues, RegisterOptions } from "react-hook-form";

// Omitting type and name from the input props to make them required
export type FormField = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "name"
> & {
  type: string; // All input types + textarea and select option
  name: string;
  label?: string;
  options?: RegisterOptions<FieldValues, string> | undefined; // For react-hook-form
  selectValues?: [string, string][]; // For select input only, array of [value, label]
};
