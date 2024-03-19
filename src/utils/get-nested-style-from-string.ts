type NestedStyleObject = {
  [key: string]: NestedStyleObject | string | number | undefined;
};

const getNestedStyleFromString = (
  obj: NestedStyleObject,
  path: string,
): NestedStyleObject | string | number | undefined => {
  if (!path) {
    return undefined;
  }
  const properties = path.split('.');
  return properties.reduce<NestedStyleObject | string | number | undefined>(
    (acc, prop) => {
      // Ensure acc is an object before accessing its property.
      return typeof acc === 'object' && acc !== null ? acc[prop] : undefined;
    },
    obj,
  );
};

export default getNestedStyleFromString;
