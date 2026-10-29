import { useState } from 'react';
import { Animated, View } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import type { LoaderProps } from '../../types/loader';
import { styles } from './EcgLoader.styles';

// Coordinates on a 100 × 100 canvas. Each pair forms one ECG segment.
const points = [
  [0, 50],
  [25, 50],
  [34, 40],
  [43, 62],
  [53, 18],
  [63, 80],
  [72, 50],
  [100, 50],
] as const;
const segments = points.slice(1).map(([x, y], index) => {
  const [previousX, previousY] = points[index]!;
  const dx = x - previousX;
  const dy = y - previousY;
  const length = Math.hypot(dx, dy);
  return {
    left: `${(x + previousX - length) / 2}%` as const,
    top: `${(y + previousY) / 2}%` as const,
    width: `${length}%` as const,
    transform: [{ rotate: `${Math.atan2(dy, dx)}rad` }],
  };
});

export function EcgLoader(props: LoaderProps) {
  const {
    loading,
    color = '#0D9488',
    trackColor = '#CCFBF1',
    duration = 2000,
    reduceMotion = false,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const beatScale = animation.interpolate({
    inputRange: [0, 0.08, 0.18, 1],
    outputRange: [1, 1.5, 1, 1],
  });
  const beatOpacity = animation.interpolate({
    inputRange: [0, 0.08, 0.18, 1],
    outputRange: [0.5, 1, 0.5, 0.5],
  });
  const [width, setWidth] = useState(0);
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  return (
    <LoaderContainer
      label="Finding your rhythm"
      {...props}
      artwork={
        <View
          onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
          style={[styles.monitor, { backgroundColor: trackColor }]}
        >
          {[25, 50, 75].map((position) => (
            <View
              key={position}
              style={[
                styles.gridLine,
                { top: `${position}%`, backgroundColor: color },
              ]}
            />
          ))}
          {[25, 50, 75].map((position) => (
            <View
              key={position}
              style={[
                styles.verticalGrid,
                { left: `${position}%`, backgroundColor: color },
              ]}
            />
          ))}
          <Animated.View
            style={[styles.strip, { transform: [{ translateX }] }]}
          >
            {[0, 1].map((copy) => (
              <View key={copy} style={styles.trace}>
                {segments.map((segment, index) => (
                  <View
                    key={index}
                    style={[
                      styles.segment,
                      segment,
                      { backgroundColor: color },
                    ]}
                  />
                ))}
              </View>
            ))}
          </Animated.View>
          <Animated.View
            style={[
              styles.statusLight,
              {
                backgroundColor: color,
                opacity: beatOpacity,
                transform: [{ scale: beatScale }],
              },
            ]}
          />
        </View>
      }
    />
  );
}
