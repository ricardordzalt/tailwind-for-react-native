const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const extraNodeModules = {
  node_modules: path.resolve(`${__dirname}/../src`),
};
const config = {
  watchFolders: [path.resolve(`${__dirname}/../src`)],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
