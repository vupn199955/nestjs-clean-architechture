export const getFileName = (originalname: string) => {
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  return `${randomName}.${getFileExtension(originalname)}`;
};

function getFileExtension(filename) {
  return filename.split(".").pop();
}
