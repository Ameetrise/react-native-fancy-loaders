import { EcgLoader } from './loaders/EcgLoader/EcgLoader';
import { PillLoader } from './loaders/PillLoader/PillLoader';
import { FitnessLoader } from './loaders/FitnessLoader/FitnessLoader';
import { OrbitLoader } from './loaders/OrbitLoader/OrbitLoader';
import { PulseLoader } from './loaders/PulseLoader/PulseLoader';
import { AudioWaveLoader } from './loaders/AudioWaveLoader/AudioWaveLoader';
import { loaderThemes } from './presets/themes';
import type { FancyLoaderProps } from './types/loader';

const loaders = {
  ecg: EcgLoader,
  pill: PillLoader,
  fitness: FitnessLoader,
  orbit: OrbitLoader,
  pulse: PulseLoader,
  wave: AudioWaveLoader,
};

/** Convenience component for choosing an animation with a themed preset. */
export function FancyLoader({
  theme = 'general',
  variant,
  color,
  label,
  ...props
}: FancyLoaderProps) {
  const preset = loaderThemes[theme];
  const Loader = loaders[variant ?? preset.variant];

  return (
    <Loader
      {...props}
      color={color ?? preset.color}
      label={label ?? preset.label}
    />
  );
}
