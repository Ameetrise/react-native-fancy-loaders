import { useState } from 'react';
import { Animated, View } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import type { LoaderProps } from '../../types/loader';
import { JackArm } from './JackArm';
import { jackFrames, jackPhases } from './jumpingJackMotion';
import { styles } from './FitnessLoader.styles';

export function FitnessLoader(props: LoaderProps) {
  const {
    loading,
    color = '#EA580C',
    trackColor = '#FFEDD5',
    duration = 2400,
    reduceMotion = false,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const [height, setHeight] = useState(0);
  const leftArm = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${frame.arm}deg`),
  });
  const rightArm = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${-frame.arm}deg`),
  });
  const leftElbow = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${frame.elbow}deg`),
  });
  const rightElbow = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${-frame.elbow}deg`),
  });
  const leftLeg = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${frame.leg}deg`),
  });
  const rightLeg = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => `${-frame.leg}deg`),
  });
  const lift = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => frame.bodyY * height),
  });
  const bodyScale = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => frame.bodyScale),
  });
  const shadowScale = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => frame.shadowScale),
  });
  const shadowOpacity = animation.interpolate({
    inputRange: jackPhases,
    outputRange: jackFrames.map((frame) => frame.shadowOpacity),
  });
  const paint = { backgroundColor: color };

  return (
    <LoaderContainer
      label="Moving together"
      {...props}
      artwork={
        <View
          onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
          style={[styles.background, { backgroundColor: trackColor }]}
        >
          <Animated.View
            style={[
              styles.shadow,
              paint,
              { opacity: shadowOpacity, transform: [{ scaleX: shadowScale }] },
            ]}
          />
          <Animated.View
            style={[
              styles.athlete,
              { transform: [{ translateY: lift }, { scaleY: bodyScale }] },
            ]}
          >
            <View style={[styles.head, paint]}>
              <View style={styles.headband} />
            </View>
            <JackArm
              color={color}
              side="left"
              shoulder={leftArm}
              elbow={leftElbow}
            />
            <JackArm
              color={color}
              side="right"
              shoulder={rightArm}
              elbow={rightElbow}
            />
            <Animated.View
              style={[
                styles.leg,
                styles.leftLeg,
                paint,
                { transform: [{ rotate: leftLeg }] },
              ]}
            >
              <Animated.View
                style={[
                  styles.shoe,
                  paint,
                  { transform: [{ rotate: rightLeg }] },
                ]}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.leg,
                styles.rightLeg,
                paint,
                { transform: [{ rotate: rightLeg }] },
              ]}
            >
              <Animated.View
                style={[
                  styles.shoe,
                  paint,
                  { transform: [{ rotate: leftLeg }] },
                ]}
              />
            </Animated.View>
            <View style={[styles.torso, paint]}>
              <View style={styles.shirtStripe} />
            </View>
            <View style={[styles.shorts, paint]} />
          </Animated.View>
        </View>
      }
    />
  );
}
