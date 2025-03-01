const fs = require('fs');
const path = require('path');

const properties = [
  "backgroundColor", "opacity", "overlayColor", "borderBottomColor", "borderBottomEndRadius",
  "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStartRadius", "borderBottomWidth",
  "borderColor", "borderCurve", "borderEndColor", "borderEndWidth", "borderLeftColor", "borderLeftWidth",
  "borderRadius", "borderRightColor", "borderRightWidth", "borderStartColor", "borderStartEndRadius",
  "borderStartStartRadius", "borderStyle", "borderTopColor", "borderTopEndRadius", "borderTopLeftRadius",
  "borderTopRightRadius", "borderTopStartRadius", "borderTopWidth", "borderWidth", "boxShadow", "dropShadow",
  "shadowColor", "shadowOffset", "shadowOpacity", "shadowRadius", "elevation", "aspectRatio", "bottom",
  "end", "height", "left", "maxHeight", "maxWidth", "minHeight", "minWidth", "position", "right", "start",
  "top", "width", "zIndex", "alignContent", "alignItems", "alignSelf", "columnGap", "direction", "display",
  "flex", "flexBasis", "flexDirection", "flexGrow", "flexShrink", "flexWrap", "gap", "justifyContent",
  "rowGap", "margin", "marginBottom", "marginEnd", "marginHorizontal", "marginLeft", "marginRight",
  "marginStart", "marginTop", "marginVertical", "padding", "paddingBottom", "paddingEnd", "paddingHorizontal",
  "paddingLeft", "paddingRight", "paddingStart", "paddingTop", "paddingVertical", "color", "fontFamily",
  "fontSize", "fontStyle", "fontVariant", "fontWeight", "includeFontPadding", "letterSpacing", "lineHeight",
  "textAlign", "textAlignVertical", "textDecorationColor", "textDecorationLine", "textDecorationStyle",
  "textShadowColor", "textShadowOffset", "textShadowRadius", "textTransform", "verticalAlign", "writingDirection",
  "resizeMode", "objectFit", "tintColor", "backfaceVisibility", "cursor", "filter", "outlineColor", "outlineOffset",
  "outlineStyle", "outlineWidth", "overflow", "pointerEvents", "userSelect", 'borderEndEndRadius',
  'borderEndStartRadius',
  'borderStartWidth',
  'boxSizing',
];

const baseDir = path.join(__dirname, 'properties');

// Crear carpeta base
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

properties.forEach(property => {
  const dirPath = path.join(baseDir, property);
  const filePath = path.join(dirPath, 'index.ts');

  // Crear carpeta de la propiedad
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Crear archivo index.ts dentro de la carpeta
  fs.writeFileSync(filePath, ``, 'utf8');
});