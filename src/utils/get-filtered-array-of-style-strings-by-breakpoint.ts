const DEFAULT_BREAKPOINTS: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const getFilteredArrayOfStyleStringsByBreakpoint = (
  arrayOfStyleStrings: string[],
  width: number,
  customBreakpoints?: Record<string, number>,
): string[] => {
  const breakpoints = customBreakpoints ?? DEFAULT_BREAKPOINTS;
  const breakpointPrefixes = Object.keys(breakpoints);

  return arrayOfStyleStrings
    .map(styleString => {
      for (let i = 0; i < breakpointPrefixes.length; i++) {
        const bp = breakpointPrefixes[i];
        if (styleString.startsWith(`${bp}:`)) {
          return width >= breakpoints[bp]
            ? styleString.slice(bp.length + 1)
            : null;
        }
      }
      return styleString;
    })
    .filter((s): s is string => s !== null);
};

export default getFilteredArrayOfStyleStringsByBreakpoint;
