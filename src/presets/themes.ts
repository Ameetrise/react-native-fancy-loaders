import type { LoaderTheme, LoaderVariant } from '../types/loader';

export const loaderThemes = {
  general: { color: '#6366F1', variant: 'orbit', label: 'Loading' },
  medical: { color: '#0891B2', variant: 'pill', label: 'Preparing your care' },
  transportation: {
    color: '#D97706',
    variant: 'orbit',
    label: 'Getting ready to go',
  },
  navigation: {
    color: '#2563EB',
    variant: 'orbit',
    label: 'Finding your route',
  },
  crypto: { color: '#7C3AED', variant: 'orbit', label: 'Syncing your wallet' },
  healthcare: {
    color: '#059669',
    variant: 'ecg',
    label: 'Loading your health overview',
  },
  audio: { color: '#DB2777', variant: 'wave', label: 'Tuning in' },
  video: { color: '#E11D48', variant: 'wave', label: 'Preparing playback' },
  chat: {
    color: '#4F46E5',
    variant: 'pulse',
    label: 'Connecting your conversations',
  },
  shopping: {
    color: '#EA580C',
    variant: 'orbit',
    label: 'Finding something good',
  },
  gaming: {
    color: '#9333EA',
    variant: 'pulse',
    label: 'Preparing your next adventure',
  },
  education: {
    color: '#0284C7',
    variant: 'wave',
    label: 'Getting your lesson ready',
  },
} satisfies Record<
  LoaderTheme,
  { color: string; variant: LoaderVariant; label: string }
>;
