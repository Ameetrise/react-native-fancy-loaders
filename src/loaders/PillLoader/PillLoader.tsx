import { useState } from 'react';
import { CapsuleLiquid } from './CapsuleLiquid';
import { Animated, View } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import { normalizeProgress } from '../../utils/numbers';
import type { LoaderProps } from '../../types/loader';
import { styles } from './PillLoader.styles';

export function PillLoader(props: LoaderProps) {
  const {
    loading,
    color = '#7C3AED',
    trackColor = '#EDE9FE',
    duration = 4200,
    reduceMotion = false,
    progress,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const percentage = normalizeProgress(progress);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-35deg', '325deg'],
  });

  return (
    <LoaderContainer
      label="Preparing your care"
      {...props}
      artwork={
        <Animated.View
          onLayout={({ nativeEvent }) =>
            setBounds({
              width: Math.max(0, nativeEvent.layout.width - 6),
              height: Math.max(0, nativeEvent.layout.height - 6),
            })
          }
          style={[
            styles.capsule,
            {
              borderColor: color,
              backgroundColor: trackColor,
              transform: [{ rotate }],
            },
          ]}
        >
          <CapsuleLiquid
            animation={animation}
            width={bounds.width}
            height={bounds.height}
            color={color}
            progress={percentage}
          />
          <View style={styles.capTint} />
          <View style={styles.seam} />
          <View style={styles.medicalMark}>
            <View
              style={[styles.crossHorizontal, { backgroundColor: color }]}
            />
            <View style={[styles.crossVertical, { backgroundColor: color }]} />
          </View>
          <View style={styles.edgeLight} />
          <View style={[styles.divider, { backgroundColor: color }]} />
          <View style={styles.highlight} />
        </Animated.View>
      }
    />
  );
}
