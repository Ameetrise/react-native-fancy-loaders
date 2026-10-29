import type { LoaderCategory } from './categories';

export type LoaderId =
  'ecg' | 'pill' | 'fitness' | 'orbit' | 'pulse' | 'audio-wave';

export interface LoaderExample {
  id: LoaderId;
  name: string;
  category: Exclude<LoaderCategory, 'All'>;
  description: string;
  color: string;
}

export const loaderExamples: LoaderExample[] = [
  {
    id: 'ecg',
    name: 'ECG rhythm',
    category: 'Healthcare',
    description: 'A moving heartbeat trace with a beat every two seconds.',
    color: '#0D9488',
  },
  {
    id: 'pill',
    name: 'Capsule',
    category: 'Medicine',
    description:
      'A rotating capsule with a level liquid surface and curved meniscus.',
    color: '#7C3AED',
  },
  {
    id: 'fitness',
    name: 'Jumping jacks',
    category: 'Fitness',
    description: 'Smooth, synchronized jumping jacks with eased transitions.',
    color: '#EA580C',
  },
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'Essentials',
    description: 'A rotating arc with a quiet center.',
    color: '#6366F1',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    category: 'Essentials',
    description: 'A soft, expanding pulse.',
    color: '#DB2777',
  },
  {
    id: 'audio-wave',
    name: 'Audio wave',
    category: 'Essentials',
    description: 'Five bars moving in alternating rhythm.',
    color: '#2563EB',
  },
];
