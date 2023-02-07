export function generateFormData(body) {
  const newFormData = new FormData();
  Object.keys(body).forEach((key) => {
    const value = body[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        newFormData.append(key, v);
      });
    } else {
      newFormData.append(key, value);
    }
  });
  return newFormData;
}
