import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type LoaderVariant =
  'orbit' | 'pulse' | 'wave' | 'ecg' | 'pill' | 'fitness';
export type LoaderPresentation = 'inline' | 'fullscreen' | 'overlay';
export type LoaderTheme =
  | 'general'
  | 'medical'
  | 'transportation'
  | 'navigation'
  | 'crypto'
  | 'healthcare'
  | 'audio'
  | 'video'
  | 'chat'
  | 'shopping'
  | 'gaming'
  | 'education';

export interface LoaderProps {
  /** Whether the loader is visible and animating. */
  loading: boolean;
  /** Progress from 0 to 100. Omit for indeterminate loading. */
  progress?: number;
  showProgress?: boolean;
  color?: string;
  trackColor?: string;
  backgroundColor?: string;
  textColor?: string;
  /** Artwork diameter in logical pixels. Defaults to 80. */
  size?: number;
  /** One animation cycle in milliseconds. Defaults to 1400. */
  duration?: number;
  /** Optional text below the artwork. */
  label?: string;
  description?: string;
  /** Explicitly disable motion. The system preference is always respected. */
  reduceMotion?: boolean;
  /** Fill the parent using flex: 1. Safe areas are managed by the host app. */
  fullScreen?: boolean;
  /** Inline, fill the parent, or cover the app using a native Modal. */
  presentation?: LoaderPresentation;
  /** Overlay backdrop opacity: 0 is transparent, 1 is opaque. Default 0.65. */
  overlayOpacity?: number;
  overlayColor?: string;
  /** Called by Android Back in overlay mode. Parent controls loading. */
  onRequestClose?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  testID?: string;
  /** Extra content below the progress, such as a cancel button. */
  children?: ReactNode;
}

export interface FancyLoaderProps extends LoaderProps {
  theme?: LoaderTheme;
  variant?: LoaderVariant;
}
