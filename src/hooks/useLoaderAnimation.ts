import { loaderDefaults } from '../styles/tokens';
import { positiveNumber } from '../utils/numbers';
import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Easing,
  Platform,
} from 'react-native';

export function useLoaderAnimation(
  loading: boolean,
  duration: number,
  reduceMotion: boolean,
) {
  const cycleDuration = positiveNumber(duration, loaderDefaults.duration);
  const value = useRef(new Animated.Value(0)).current;
  // Stay still until the accessibility preference has been read.
  const [systemReducedMotion, setSystemReducedMotion] = useState(true);
  const [active, setActive] = useState(AppState.currentState === 'active');

  useEffect(() => {
    let mounted = true;
    let changed = false;
    const motion = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => {
        changed = true;
        setSystemReducedMotion(enabled);
      },
    );
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted && !changed) setSystemReducedMotion(enabled);
      })
      .catch(() => {
        /* Keep the accessible, static fallback. */
      });
    const appState = AppState.addEventListener('change', (state) =>
      setActive(state === 'active'),
    );
    return () => {
      mounted = false;
      motion.remove();
      appState.remove();
    };
  }, []);

  useEffect(() => {
    value.setValue(0);
    if (!loading || reduceMotion || systemReducedMotion || !active) return;
    const animation = Animated.loop(
      Animated.timing(value, {
        toValue: 1,
        duration: cycleDuration,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
        isInteraction: false,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [
    active,
    cycleDuration,
    loading,
    reduceMotion,
    systemReducedMotion,
    value,
  ]);

  return value;
}
