import { Animated, View } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import { artworkStyles } from '../../styles/artwork';
import { loaderDefaults } from '../../styles/tokens';
import type { LoaderProps } from '../../types/loader';
import { positiveNumber } from '../../utils/numbers';
import { styles } from './OrbitLoader.styles';

export function OrbitLoader(props: LoaderProps) {
  const {
    loading,
    color = loaderDefaults.color,
    trackColor = loaderDefaults.trackColor,
    size = loaderDefaults.size,
    duration = loaderDefaults.duration,
    reduceMotion = false,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const borderWidth = positiveNumber(size, loaderDefaults.size) * 0.06;
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const ringStyle = {
    borderWidth,
    borderTopColor: color,
    borderRightColor: color,
    transform: [{ rotate: rotation }],
  };

  return (
    <LoaderContainer
      {...props}
      artwork={
        <>
          <View
            style={[
              artworkStyles.fill,
              artworkStyles.circle,
              { borderWidth, borderColor: trackColor },
            ]}
          />
          <Animated.View
            style={[
              artworkStyles.fill,
              artworkStyles.circle,
              styles.arc,
              ringStyle,
            ]}
          />
          <View
            style={[
              artworkStyles.circle,
              styles.center,
              { backgroundColor: color },
            ]}
          />
        </>
      }
    />
  );
}
