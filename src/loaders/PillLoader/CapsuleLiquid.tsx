import { Animated } from 'react-native';
import { liquidBounds, rotationSamples } from './liquidGeometry';
import { styles } from './PillLoader.styles';

interface CapsuleLiquidProps {
  animation: Animated.Value;
  width: number;
  height: number;
  color: string;
  progress?: number;
}

export function CapsuleLiquid({
  animation,
  width,
  height,
  color,
  progress,
}: CapsuleLiquidProps) {
  const side = Math.hypot(width, height) * 2;
  const counterRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['35deg', '-325deg'],
  });
  const bounds = animation.interpolate({
    inputRange: rotationSamples,
    outputRange: rotationSamples.map((phase) =>
      liquidBounds(width, height, -35 + phase * 360),
    ),
  });
  const level =
    progress === undefined
      ? animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.25, -0.25, 0.25],
        })
      : 0.5 - progress / 100;
  const translateY = Animated.multiply(bounds, level);
  const curve = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0.35, 1, 0.35, 1, 0.35],
  });
  const showSurface = progress !== 0 && progress !== 100;

  if (progress === 0) return null;

  return (
    <Animated.View
      style={[
        styles.liquidPlane,
        {
          width: side,
          height: side,
          left: (width - side) / 2,
          top: (height - side) / 2,
          transform: [{ rotate: counterRotation }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.water,
          { backgroundColor: color, transform: [{ translateY }] },
        ]}
      >
        {showSurface && (
          <Animated.View
            style={[
              styles.surface,
              { backgroundColor: color, transform: [{ scaleY: curve }] },
            ]}
          />
        )}
        {showSurface && (
          <Animated.View
            style={[styles.surfaceShine, { transform: [{ scaleY: curve }] }]}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
}
