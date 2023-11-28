const getImage = (fileName: string) => {
  if (!fileName) return '';
  return `${process.env.REACT_APP_API_URL}/${fileName}`;
};
const getIdCh = () =>
  localStorage.getItem('idCh')
    ? (localStorage.getItem('idCh') as string)
    : ('4' as string);
export { getImage, getIdCh };
