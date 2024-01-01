import moment from "moment";
import { Column } from "./column";

export enum FilterAction {
  CLEAR_TEXT_FILTER = "CLEAR_TEXT_FILTER", // Clear text filter
  HANDLE_TEXT_FILTER = "HANDLE_TEXT_FILTER", // Handle text filter
  CLEAR_UPPER_LIMIT_FILTER = "CLEAR_UPPER_LIMIT_FILTER", // Clear upper limit filter (for number and date columns)
  HANDLE_UPPER_LIMIT_FILTER = "HANDLE_UPPER_LIMIT_FILTER", // Handle upper limit filter
  CLEAR_LOWER_LIMIT_FILTER = "CLEAR_LOWER_LIMIT_FILTER", // Clear lower limit filter
  HANDLE_LOWER_LIMIT_FILTER = "HANDLE_LOWER_LIMIT_FILTER", // Handle lower limit filter
}

export function filterData(
  data: any[],
  columns: Column[],
  filters: { [key: string]: string[] },
  callBack: (data: any[]) => void
) {
  let filteredData = [];
  for (const item of data) {
    let flag = true;
    for (const column of columns) {
      if (column.format === "number") {
        let lowerValue: number = filters[column.propTarget][0]
          ? parseFloat(filters[column.propTarget][0])
          : Number.MAX_VALUE / -1;
        let upperValue: number = filters[column.propTarget][1]
          ? parseFloat(filters[column.propTarget][1])
          : Number.MAX_VALUE;
        if (
          lowerValue > item[column.propTarget] ||
          item[column.propTarget] > upperValue
        ) {
          flag = false;
          break;
        }
      } else if (column.format === "date") {
        let lowerLimit = filters[column.propTarget][0]
          ? new Date(filters[column.propTarget][0])
          : new Date(0);
        let upperLimit = filters[column.propTarget][1]
          ? new Date(filters[column.propTarget][1])
          : new Date();
        if (
          moment(lowerLimit).isAfter(item[column.propTarget]) ||
          moment(item[column.propTarget]).isAfter(upperLimit)
        ) {
          flag = false;
          break;
        }
      } else {
        if (
          !item[column.propTarget]
            .toString()
            .toLowerCase()
            .includes(filters[column.propTarget][0].toLowerCase())
        ) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      filteredData.push(item);
    }
  }
  callBack(filteredData);
}

export function clearFilter(
  filters: { [key: string]: string[] } | undefined,
  property: string,
  action: FilterAction,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  if (!filters) {
    throw new Error("Filters not defined");
  }
  switch (action) {
    case FilterAction.CLEAR_TEXT_FILTER:
      clearTextFilter(filters, property, callBack);
      break;
    case FilterAction.CLEAR_UPPER_LIMIT_FILTER:
      clearUpperLimitFilter(filters, property, callBack);
      break;
    case FilterAction.CLEAR_LOWER_LIMIT_FILTER:
      clearLowerLimitFilter(filters, property, callBack);
      break;
    default:
      throw new Error("Invalid filter action");
  }
}

export function handleFilter(
  filters: { [key: string]: string[] } | undefined,
  property: string,
  value: string,
  action: FilterAction,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  if (!filters) {
    throw new Error("Filters not defined");
  }
  switch (action) {
    case FilterAction.HANDLE_TEXT_FILTER:
      handleTextFilter(filters, property, value, callBack);
      break;
    case FilterAction.HANDLE_UPPER_LIMIT_FILTER:
      handleUpperLimitFilter(filters, property, value, callBack);
      break;
    case FilterAction.HANDLE_LOWER_LIMIT_FILTER:
      handleLowerLimitFilter(filters, property, value, callBack);
      break;
    default:
      throw new Error("Invalid filter action");
  }
}

function clearTextFilter(
  filters: { [key: string]: string[] },
  property: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][0] = "";
  callBack(newFilters);
}

function handleTextFilter(
  filters: { [key: string]: string[] },
  property: string,
  value: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][0] = value;
  callBack(newFilters);
}

function clearUpperLimitFilter(
  filters: { [key: string]: string[] },
  property: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][1] = "";
  callBack(newFilters);
}

function handleUpperLimitFilter(
  filters: { [key: string]: string[] },
  property: string,
  value: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][1] = value;
  callBack(newFilters);
}

function clearLowerLimitFilter(
  filters: { [key: string]: string[] },
  property: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][0] = "";
  callBack(newFilters);
}

function handleLowerLimitFilter(
  filters: { [key: string]: string[] },
  property: string,
  value: string,
  callBack: (filters: { [key: string]: string[] }) => void
) {
  const newFilters = { ...filters };
  newFilters[property][0] = value;
  callBack(newFilters);
}
