# Usage guide

## Installation

In an existing React Native or Expo project:

```sh
npm install react-native-fancy-loaders
```

No additional animation or native dependencies are needed. Import components by name:

```tsx
import {
  EcgLoader,
  PillLoader,
  FitnessLoader,
  OrbitLoader,
  PulseLoader,
  AudioWaveLoader,
} from 'react-native-fancy-loaders';
```

The package has no default export. `loading` is required on every loader.

## Fill a screen

Use a bounded parent. Safe-area padding belongs to your app's screen layout.

```tsx
import { StyleSheet, Text, View } from 'react-native';
import { EcgLoader } from 'react-native-fancy-loaders';

interface HealthScreenProps {
  loading: boolean;
  summary: string;
}

export function HealthScreen({ loading, summary }: HealthScreenProps) {
  return (
    <View style={styles.screen}>
      {loading ? (
        <EcgLoader
          loading={loading}
          presentation="fullscreen"
          label="Loading your health overview"
          size={112}
        />
      ) : (
        <Text>{summary}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
```

`presentation="fullscreen"` fills its parent; it does not open a native modal. The older `fullScreen` boolean has the same parent-filling behavior. Explicit `presentation` takes priority.

## Overlay an existing screen

This complete example lets you open and dismiss an overlay. In a real app, connect `busy` to the operation's state.

```tsx
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PillLoader } from 'react-native-fancy-loaders';

export function OverlayExample() {
  const [busy, setBusy] = useState(false);
  const close = () => setBusy(false);

  return (
    <View style={styles.screen}>
      <Text>Your screen stays underneath the overlay.</Text>
      <Button title="Show loader" onPress={() => setBusy(true)} />
      <PillLoader
        loading={busy}
        presentation="overlay"
        overlayColor="#FFFFFF"
        overlayOpacity={0.8}
        label="Preparing your care"
        size={112}
        onRequestClose={close}
      >
        <Button title="Close preview" onPress={close} />
      </PillLoader>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, padding: 24, gap: 16 } });
```

`overlayOpacity` is 0–1: 0 is transparent and 1 is opaque. It only changes the backdrop; the artwork stays visible. Even a transparent overlay blocks interaction with the screen underneath. `onRequestClose` handles Android Back. Add a child button when users should be able to dismiss the overlay on iOS too.

Changing `loading` only hides the UI. If you provide a Cancel button for a network request, also cancel the underlying operation yourself.

## Show real progress

```tsx
import { PillLoader } from 'react-native-fancy-loaders';

interface TransferProgressProps {
  loading: boolean;
  transferredBytes: number;
  totalBytes?: number;
}

export function TransferProgress({
  loading,
  transferredBytes,
  totalBytes,
}: TransferProgressProps) {
  const progress =
    totalBytes && totalBytes > 0
      ? (transferredBytes / totalBytes) * 100
      : undefined;

  return (
    <PillLoader
      loading={loading}
      progress={progress}
      label="Syncing your files"
    />
  );
}
```

Pass a percentage, not a 0–1 fraction. Zero is valid. Values are clamped to 0–100; NaN and infinity are treated as unknown progress. Omit `progress` for indeterminate loading. Setting it to 100 does not hide the loader: set `loading={false}` when the operation completes.

The capsule uses progress for its liquid level. Other loaders show it as text and an accessible value. `showProgress={false}` hides the percentage text while retaining accessible progress.

## Color, motion, and dark mode

```tsx
import { useColorScheme } from 'react-native';
import { FitnessLoader } from 'react-native-fancy-loaders';

export function WorkoutLoader({ loading }: { loading: boolean }) {
  const dark = useColorScheme() === 'dark';

  return (
    <FitnessLoader
      loading={loading}
      color="#F97316"
      trackColor={dark ? '#431407' : '#FFEDD5'}
      textColor={dark ? '#F8FAFC' : '#0F172A'}
      backgroundColor={dark ? '#0F172A' : '#FFFFFF'}
      size={120}
      duration={2800}
      label="Getting your workout ready"
    />
  );
}
```

`duration` is one complete animation cycle in milliseconds. Defaults: ECG 2000, capsule 4200, fitness 2400, essentials 1400. Increasing it slows the animation. ECG has one beat per cycle.

Set `reduceMotion` to force static artwork. System reduced-motion settings always take priority; the library never overrides them. Animations pause when the app is inactive and stop on unmount.

Use `style` for the container, `textStyle` for the main label/percentage, and `descriptionStyle` for supporting text. Pass `label=""` to hide the label and supply an informative `accessibilityLabel` if needed.

## Choose a preset dynamically

```tsx
import { FancyLoader } from 'react-native-fancy-loaders';

<FancyLoader loading={true} theme="medical" progress={40} />;
<FancyLoader loading={true} variant="fitness" color="#EA580C" />;
```

Variants: `orbit`, `pulse`, `wave`, `ecg`, `pill`, `fitness`.

Themes: `general`, `medical`, `transportation`, `navigation`, `crypto`, `healthcare`, `audio`, `video`, `chat`, `shopping`, `gaming`, `education`.

Themes choose default colors, labels, and an existing animation. The example app's additional planned categories are not public theme values or finished artworks.

## TypeScript wrappers

```tsx
import { FitnessLoader, type LoaderProps } from 'react-native-fancy-loaders';

export function BrandLoader(props: LoaderProps) {
  return <FitnessLoader color="#EA580C" label="Just a moment" {...props} />;
}
```

Public types: `LoaderProps`, `FancyLoaderProps`, `LoaderVariant`, `LoaderTheme`, and `LoaderPresentation`.

## Troubleshooting

- **Invalid element type:** use a named import from `react-native-fancy-loaders`, not a default import. After upgrading the package, restart Metro with a cleared cache (`npx expo start --clear` in Expo).
- **Full-screen loader has no height:** make the parent fill the screen using `flex: 1`, or use `presentation="overlay"`.
- **Artwork does not move:** check the system reduced-motion setting and the `reduceMotion` prop. Animations also pause while the app is inactive.
- **Overlay will not close:** update the parent's `loading` state. `onRequestClose` is a notification, not an automatic state change.
- **Loader keeps showing at 100%:** set `loading={false}` separately.
- **Text is hard to read in dark mode:** provide `textColor`, `trackColor`, and background colors that match your app.

The ECG is decorative, not a medical signal. Capsule liquid is a stylized visual, not a physically exact volume simulation.
