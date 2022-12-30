function getPropByString(obj, propString) {
  console.log(obj.white)
  if (!propString || typeof propString !== 'string')
    return undefined;

  var prop, props = propString.split('.');

  for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    var candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  const result = obj[props[i]];
  console.log(result)
  return result;
}

export default getPropByString;
