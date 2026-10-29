import { Animated, View } from 'react-native';
import { styles } from './FitnessLoader.styles';

interface JackArmProps {
  color: string;
  side: 'left' | 'right';
  shoulder: Animated.AnimatedInterpolation<string>;
  elbow: Animated.AnimatedInterpolation<string>;
}

export function JackArm({ color, side, shoulder, elbow }: JackArmProps) {
  const paint = { backgroundColor: color };
  return (
    <Animated.View
      style={[
        styles.arm,
        side === 'left' ? styles.leftArm : styles.rightArm,
        paint,
        { transform: [{ rotate: shoulder }] },
      ]}
    >
      <View style={styles.sleeve} />
      <Animated.View
        style={[styles.forearm, paint, { transform: [{ rotate: elbow }] }]}
      >
        <View style={[styles.hand, paint]} />
      </Animated.View>
    </Animated.View>
  );
}
