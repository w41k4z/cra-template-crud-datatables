export const formatDate = (date: Date): string => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

export const formatMonthYear = (date: Date): string => {
  return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
};
