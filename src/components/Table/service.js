
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const monthAbbreviation = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${day} ${monthAbbreviation} ${year}`;
};
