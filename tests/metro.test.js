const { it } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const path = require('node:path');
const config = require('../example/metro.config.cjs');

for (const platform of ['ios', 'android', 'web']) {
  it(`Metro resolves library source on ${platform} from any importer`, () => {
    for (const originModulePath of [
      'example/App.tsx',
      'example/src/components/ExampleLoader.tsx',
    ]) {
      const result = config.resolver.resolveRequest(
        { originModulePath },
        'react-native-fancy-loaders',
        platform,
      );
      assert.equal(result.type, 'sourceFile');
      assert.equal(result.filePath, path.resolve(__dirname, '../src/index.ts'));
      assert.ok(existsSync(result.filePath));
    }
  });
}
it('Metro delegates other modules to its default resolver', () => {
  const result = config.resolver.resolveRequest(
    {
      resolveRequest: (_context, name, platform) => ({ name, platform }),
    },
    'react-native',
    'ios',
  );
  assert.deepEqual(result, { name: 'react-native', platform: 'ios' });
});
