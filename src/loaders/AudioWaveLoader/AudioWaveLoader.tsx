import { Animated, View } from 'react-native';
import { LoaderContainer } from '../../components/LoaderContainer';
import { useLoaderAnimation } from '../../hooks/useLoaderAnimation';
import { loaderDefaults } from '../../styles/tokens';
import type { LoaderProps } from '../../types/loader';
import { styles } from './AudioWaveLoader.styles';

const barHeights = ['45%', '65%', '85%', '65%', '45%'] as const;

export function AudioWaveLoader(props: LoaderProps) {
  const {
    loading,
    color = loaderDefaults.color,
    duration = loaderDefaults.duration,
    reduceMotion = false,
  } = props;
  const animation = useLoaderAnimation(loading, duration, reduceMotion);
  const rising = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.35, 1, 0.35],
  });
  const falling = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.35, 1],
  });

  return (
    <LoaderContainer
      {...props}
      artwork={
        <View style={styles.bars}>
          {barHeights.map((height, index) => {
            const scaleY = index % 2 === 0 ? rising : falling;
            const barStyle = {
              height,
              backgroundColor: color,
              transform: [{ scaleY }],
            };
            return <Animated.View key={index} style={[styles.bar, barStyle]} />;
          })}
        </View>
      }
    />
  );
}
