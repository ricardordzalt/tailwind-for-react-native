const getNestedStyleFromString = (
  obj: Record<string, unknown>,
  path: string,
): unknown => {
  if (!path) {
    return undefined;
  }
  const properties = path.split('.');
  return properties.reduce<unknown>(
    (acc, prop) => {
      // Ensure acc is an object before accessing its property.
      return typeof acc === 'object' && acc !== null
        ? (acc as Record<string, unknown>)[prop]
        : undefined;
    },
    obj,
  );
};

export default getNestedStyleFromString;
