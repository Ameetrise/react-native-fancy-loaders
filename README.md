# React Native Fancy Loaders

Customizable loading experiences for iOS and Android, written in TypeScript with React Native's built-in animation API. No additional runtime dependencies.

## Install

```sh
npm install react-native-fancy-loaders
```

Use it in an existing React Native or Expo app. No extra native modules, CocoaPods setup, Reanimated, or SVG dependency is required. React and React Native come from your app.

```tsx
import { FitnessLoader } from 'react-native-fancy-loaders';

export function WorkoutLoading({ loading }: { loading: boolean }) {
  return (
    <FitnessLoader
      loading={loading}
      size={120}
      color="#EA580C"
      label="Preparing your workout"
      description="Your next session is on its way."
    />
  );
}
```

`loading` is the only required prop. Set it to `false` when your work finishes; the loader then renders nothing. Your app controls the data fetching and loaded content.

See the [usage guide](docs/USAGE.md) for complete screen, overlay, progress, dark-mode, and TypeScript examples. See [release notes](CHANGELOG.md) for changes.

## Compatibility

- Intended peer range: React 18.2–19.x and React Native 0.76+. Older versions are not supported.
- This release was developed with React 19.3 and React Native 0.88.1 / Expo SDK 58. Earlier supported peer versions have not been device-tested.
- iOS and Android are the primary targets. React Native Web is used by the browser playground and render tests.
- Reduced motion and background/foreground behavior are built in. Default colors target light backgrounds; customize colors for dark themes.

## Run the example

The example belongs to the source workspace and is not included in the npm tarball.

Use Node.js 24, then run from the repository root:

```sh
npm install
npm run example
```

The example uses Expo SDK 58. Scan the QR code with a compatible Expo Go app, press `i` for an iOS simulator, `a` for an Android emulator, or `w` for web. Xcode is required for the iOS simulator and Android Studio for the Android emulator.

The selected loader stays in the top half; a scrollable grid occupies the bottom half. Select a tile to switch animations. Below the tiles are progress, reduced motion, and overlay opacity controls.

The playground's `ExampleLoader` imports the library by its package name and selects loaders by ID. Metro resolves that package name to an absolute source path, so imports do not depend on a component's folder depth. Catalog entries contain only display data, never captured component references. The Metro configuration also resolves package-name imports to `src/index.ts`. Startup clears Metro's cache. If an existing dev server was open before the exports changed, stop it and run `npm run example` again. A new export cannot be recovered by reloading an old bundle alone.

## Available loaders

| Component         | Artwork                                                           | Progress behavior                |
| ----------------- | ----------------------------------------------------------------- | -------------------------------- |
| `EcgLoader`       | Scrolling ECG trace and beat indicator on a two-second cycle      | Text percentage                  |
| `PillLoader`      | Slowly rotating capsule with level liquid and a curved meniscus   | Capsule fill and text percentage |
| `FitnessLoader`   | Jumping jacks with articulated arms, two jumps, and soft landings | Text percentage                  |
| `OrbitLoader`     | Rotating arc                                                      | Text percentage                  |
| `PulseLoader`     | Expanding circles                                                 | Text percentage                  |
| `AudioWaveLoader` | Alternating audio bars                                            | Text percentage                  |

These are native animated shapes, not GIFs. Colors and sizes remain configurable. ECG artwork is decorative, not a live medical reading.

```tsx
import { PillLoader } from 'react-native-fancy-loaders';

<PillLoader
  loading={isLoading}
  progress={42}
  color="#7C3AED"
  label="Preparing your care"
/>;
```

For local development, run `npm pack` and install the generated `.tgz` in another app.

## Presentation modes

All loaders accept `presentation`:

- `inline` (default): renders in normal layout.
- `fullscreen`: fills a bounded parent using `flex: 1`. The host manages safe areas.
- `overlay`: uses a transparent native Modal above the app and blocks interaction underneath.

```tsx
<PillLoader
  loading={isLoading}
  presentation="overlay"
  overlayColor="#FFFFFF"
  overlayOpacity={0.75}
  onRequestClose={() => setIsLoading(false)}
/>
```

`overlayOpacity` affects only the backdrop, not the loader. `0` is fully transparent (still blocks touches); `1` is opaque. Values are clamped to 0–1; non-finite values use 0.65. `onRequestClose` handles Android Back; set `loading={false}` in your callback to close the overlay. Without it, the overlay stays until the parent changes `loading`. Pass a close/cancel button as `children` when users should be able to dismiss it on either platform.

The older `fullScreen` boolean still means fill the parent. An explicit `presentation` takes priority.

## Shared props

| Prop                 | Default             | Meaning                                                       |
| -------------------- | ------------------- | ------------------------------------------------------------- |
| `loading`            | **Required**        | Show and animate; false renders nothing                       |
| `progress`           | Unset               | Percentage from 0–100, clamped; non-finite values ignored     |
| `showProgress`       | `true`              | Show the percentage text                                      |
| `color`              | Loader default      | Main artwork color                                            |
| `trackColor`         | Loader default      | Track/background color where supported                        |
| `backgroundColor`    | `transparent`       | Content container background                                  |
| `textColor`          | `#0F172A`           | Text color                                                    |
| `size`               | `80`                | Artwork size in logical pixels                                |
| `duration`           | Loader default      | Animation cycle in milliseconds                               |
| `label`              | Loader default      | Primary text; empty string hides it                           |
| `description`        | Unset               | Supporting text                                               |
| `reduceMotion`       | `false`             | Force static artwork; system preference always takes priority |
| `presentation`       | `inline`            | Inline, parent-filling, or modal overlay                      |
| `fullScreen`         | `false`             | Legacy parent-filling option                                  |
| `overlayOpacity`     | `0.65`              | Backdrop opacity, overlay only                                |
| `overlayColor`       | `#FFFFFF`           | Backdrop color, overlay only                                  |
| `onRequestClose`     | Unset               | Android Back callback, overlay only                           |
| `style`              | Unset               | Container style                                               |
| `textStyle`          | Unset               | Label and percentage style                                    |
| `descriptionStyle`   | Unset               | Supporting text style                                         |
| `accessibilityLabel` | Label + description | Screen-reader description                                     |
| `testID`             | Unset               | Container test identifier                                     |
| `children`           | Unset               | Extra content beneath the loader                              |

Invalid sizes use 80; invalid durations use 1400. Default cycles are 2000 ms for ECG, 4200 ms for the capsule, 2400 ms for fitness, and 1400 ms for the essentials. Progress is controlled by the app and never advances automatically. A value of 100 does not hide a loader.

`FancyLoader` remains a convenience selector, with additional `theme` and `variant` props. Variants: `ecg`, `pill`, `fitness`, `orbit`, `pulse`, `wave`. Existing industry presets remain available through `loaderThemes`; medical uses the capsule and healthcare uses ECG. Presets are color/text defaults, not additional unique artworks.

## Structure and development

```text
src/
  loaders/       # Named loader folders, each with component + stylesheet
  components/    # Shared content layout and modal presentation
  hooks/         # Animation lifecycle and reduced-motion handling
  styles/        # Shared artwork styles and defaults
  presets/       # Industry colors, labels, and animation choices
  types/         # Public props
  utils/         # Input normalization
  FancyLoader.tsx
  index.ts       # Public exports
example/src/
  screens/       # Split preview/grid screen
  components/    # Preview, tile, reusable button
  data/          # Loader catalog
  styles/        # Shared example colors/layout
```

Related loader files stay together following [React's colocation guidance](https://legacy.reactjs.org/docs/faq-structure.html). Add a named loader folder, reuse `LoaderContainer` and `useLoaderAnimation`, export it from `src/index.ts`, add its entry to the example catalog, and add its explicit render case to `ExampleLoader`. Fixed styles live in stylesheets; prop-dependent colors and animated transforms remain dynamic.

```sh
npm run check       # Formatting, ESLint, TypeScript, tests, build
npm run format
npm run lint:fix
npm pack --dry-run
```

Animations use native-driver transforms/opacity on mobile, pause when the app is inactive, respect reduced motion, and stop on cleanup. Text wraps and supports font scaling. The overlay's content scrolls on small displays.

Tests render through React Native Web and cover the public exports, visibility, accessible progress, presets, and numeric input handling. Metro exports verify bundling, not native device behavior. Validate on real iOS/Android devices, large text, landscape, VoiceOver/TalkBack, and background transitions before publishing.

At initial setup, npm reported eight transitive advisories in Expo tooling, rooted in `deepmerge` and `zod`. Its suggested major Expo downgrade was not applied. The library itself only has React and React Native peer dependencies. MIT licensed.

## Category catalog

The example includes a category selector above the loader grid. Available categories filter the working loaders; other choices display a planned state without rendering a substitute animation. These are example navigation options, not new `theme` values in the library API.

The catalog draws on [Apple's app categories](https://developer.apple.com/app-store/categories/) and [Google Play's category guidance](https://support.google.com/googleplay/android-developer/answer/9859673), with additional domains such as crypto, delivery, AI, sleep, and smart home. It is an expandable starting catalog, not a claim to cover every possible app domain. Edit `example/src/data/categories.ts` to add options.

The capsule liquid counter-rotates against the shell so the surface stays horizontal. Its meniscus is a stylized rotation effect, not a fluid simulation. Progress controls the liquid level within the rotated capsule bounds; it is not an exact volumetric measurement. ECG `duration` overrides the default two-second beat interval. Reduced-motion preferences stop these animations.
