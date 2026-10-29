const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Always preview the current source, never an older lib/ build.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-fancy-loaders') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, '../src/index.ts'),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
