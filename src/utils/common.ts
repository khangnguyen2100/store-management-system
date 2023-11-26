const getImage = (fileName: string) => {
  if (!fileName) return '';
  return `${process.env.REACT_APP_API_URL}/${fileName}`;
};
export { getImage };
