import {
  EcgLoader,
  PillLoader,
  FitnessLoader,
  OrbitLoader,
  PulseLoader,
  AudioWaveLoader,
  type LoaderProps,
} from 'react-native-fancy-loaders';
import type { LoaderId } from '../data/loaders';

interface ExampleLoaderProps extends LoaderProps {
  id: LoaderId;
}

export function ExampleLoader({ id, ...props }: ExampleLoaderProps) {
  switch (id) {
    case 'ecg':
      return <EcgLoader {...props} />;
    case 'pill':
      return <PillLoader {...props} />;
    case 'fitness':
      return <FitnessLoader {...props} />;
    case 'orbit':
      return <OrbitLoader {...props} />;
    case 'pulse':
      return <PulseLoader {...props} />;
    case 'audio-wave':
      return <AudioWaveLoader {...props} />;
  }
}
