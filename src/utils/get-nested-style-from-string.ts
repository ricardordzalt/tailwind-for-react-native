const getNestedObjectValue = (obj: any, path: string) => {
  if (!path) {
    return;
  }
  const properties = path.split('.');
  return properties.reduce((acc, prop) => acc && acc[prop], obj);
};

export default getNestedObjectValue;
