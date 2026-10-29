import { Animated } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import { artworkStyles } from '../../styles/artwork';
import { loaderDefaults } from '../../styles/tokens';
import type { LoaderProps } from '../../types/loader';
import { styles } from './PulseLoader.styles';

export function PulseLoader(props: LoaderProps) {
  const {
    loading,
    color = loaderDefaults.color,
    duration = loaderDefaults.duration,
    reduceMotion = false,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.65, 1, 0.65],
  });
  const pulseStyle = { backgroundColor: color, transform: [{ scale }] };

  return (
    <LoaderContainer
      {...props}
      artwork={
        <>
          <Animated.View
            style={[
              artworkStyles.fill,
              artworkStyles.circle,
              styles.halo,
              pulseStyle,
            ]}
          />
          <Animated.View
            style={[artworkStyles.circle, styles.center, pulseStyle]}
          />
        </>
      }
    />
  );
}
