const { it } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { registerHooks } = require('node:module');
const ts = require('typescript');

// Exercise the actual example source, including its loader imports, rather than
// only testing the library's generated exports.
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    module._compile(outputText, filename);
  };
}
registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(
      specifier === 'react-native'
        ? require.resolve('react-native-web')
        : specifier === 'react-native-fancy-loaders'
          ? require.resolve('../src/index.ts')
          : specifier,
      context,
    );
  },
});
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const {
  LoaderPreview,
} = require('../example/src/components/LoaderPreview.tsx');
const {
  ExampleLoader,
} = require('../example/src/components/ExampleLoader.tsx');
const { loaderExamples } = require('../example/src/data/loaders.ts');

for (const item of loaderExamples) {
  it(`LoaderPreview renders ${item.id} from the actual catalog`, () => {
    const html = renderToStaticMarkup(
      React.createElement(LoaderPreview, {
        item,
        loading: true,
        progress: 50,
        reduceMotion: true,
        size: 80,
      }),
    );
    assert.match(html, /role="progressbar"/);
    assert.match(html, /aria-valuenow="50"/);
    assert.ok(html.includes(item.name));
  });
  it(`the overlay renderer resolves ${item.id} when loading is off`, () => {
    assert.equal(
      renderToStaticMarkup(
        React.createElement(ExampleLoader, {
          id: item.id,
          loading: false,
          presentation: 'overlay',
        }),
      ),
      '',
    );
  });
}
