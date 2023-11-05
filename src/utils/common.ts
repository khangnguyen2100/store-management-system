const getImage = (fileName: string) => {
  if (!fileName) return '';
  return `https://admin.beesmart.io.vn/upload/${fileName}`;
};
export { getImage };
