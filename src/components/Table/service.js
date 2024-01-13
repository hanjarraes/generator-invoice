import XLSX from "xlsx";

export const exportData = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${day} ${monthAbbreviation} ${year}`;
};
