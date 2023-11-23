const getImage = (fileName: string) => {
  if (!fileName) return '';
  return `https://admin.beesmart.io.vn/${fileName}`;
};
const getIdCh = () =>
  localStorage.getItem('idCh')
    ? (localStorage.getItem('idCh') as string)
    : ('4' as string);
export { getImage, getIdCh };

