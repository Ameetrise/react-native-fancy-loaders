import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  monitor: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    overflow: 'hidden',
  },
  gridLine: { position: 'absolute', width: '100%', height: 1, opacity: 0.12 },
  verticalGrid: {
    position: 'absolute',
    height: '100%',
    width: 1,
    opacity: 0.12,
  },
  strip: {
    position: 'absolute',
    width: '200%',
    height: '100%',
    flexDirection: 'row',
  },
  trace: { width: '50%', height: '100%' },
  statusLight: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '5%',
    height: '5%',
    borderRadius: 10,
  },
  segment: { position: 'absolute', height: '3%', borderRadius: 10 },
});
