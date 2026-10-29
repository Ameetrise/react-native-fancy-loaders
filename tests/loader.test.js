const { it } = require('node:test');
const assert = require('node:assert/strict');
const { registerHooks } = require('node:module');

// Render the actual component with React Native's web host implementation.
// Native animation lifecycle still needs simulator/device coverage.
registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(
      specifier === 'react-native'
        ? require.resolve('react-native-web')
        : specifier,
      context,
    );
  },
});
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const {
  EcgLoader,
  PillLoader,
  FitnessLoader,
  FancyLoader,
  OrbitLoader,
  PulseLoader,
  AudioWaveLoader,
  loaderThemes,
} = require('../lib');
const render = (props) =>
  renderToStaticMarkup(React.createElement(FancyLoader, props));

it('renders nothing, including children, when loading is false', () => {
  assert.equal(render({ loading: false, children: 'Cancel' }), '');
});
it('exposes zero progress without treating it as missing', () => {
  const html = render({ loading: true, progress: 0 });
  assert.match(html, /role="progressbar"/);
  assert.match(html, /aria-valuenow="0"/);
  assert.match(html, />0%</);
});
it('keeps accessible progress when visual percentage is hidden', () => {
  const html = render({ loading: true, progress: 65, showProgress: false });
  assert.match(html, /aria-valuenow="65"/);
  assert.doesNotMatch(html, />65%</);
});
it('does not invent a percentage for indeterminate loading', () => {
  assert.doesNotMatch(render({ loading: true }), /aria-valuenow/);
});
it('clamps progress and stays visible until loading is false', () => {
  assert.match(render({ loading: true, progress: 120 }), /aria-valuenow="100"/);
});
it('supports custom text and separately rendered child actions', () => {
  const html = render({
    loading: true,
    label: 'Fetching files',
    description: 'Please wait',
    children: React.createElement('button', null, 'Cancel'),
  });
  assert.match(html, /Fetching files/);
  assert.match(html, /Please wait/);
  assert.match(html, /<button>Cancel<\/button>/);
});
it('renders every theme and animation variant', () => {
  for (const theme of Object.keys(loaderThemes)) {
    for (const variant of [
      'orbit',
      'pulse',
      'wave',
      'ecg',
      'pill',
      'fitness',
    ]) {
      assert.match(
        render({ loading: true, theme, variant }),
        /role="progressbar"/,
      );
    }
  }
});

for (const Loader of [
  EcgLoader,
  PillLoader,
  FitnessLoader,
  OrbitLoader,
  PulseLoader,
  AudioWaveLoader,
]) {
  it(`${Loader.name} supports the shared loading API`, () => {
    assert.equal(
      renderToStaticMarkup(React.createElement(Loader, { loading: false })),
      '',
    );
    const html = renderToStaticMarkup(
      React.createElement(Loader, {
        loading: true,
        progress: 25,
        label: 'Fetching files',
      }),
    );
    assert.match(html, /aria-valuenow="25"/);
    assert.match(html, /Fetching files/);
  });
}

it('does not mount a modal when an overlay is not loading', () => {
  assert.equal(render({ loading: false, presentation: 'overlay' }), '');
});
it('supports parent-filling presentation without mounting a modal', () => {
  assert.match(
    render({ loading: true, presentation: 'fullscreen' }),
    /role="progressbar"/,
  );
});
