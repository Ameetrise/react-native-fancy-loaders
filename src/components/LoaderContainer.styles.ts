import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: { flex: 1 },
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  overlayContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 48,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    alignSelf: 'stretch',
  },
  fullScreen: { flex: 1 },
  content: { alignItems: 'center', gap: 12, width: '100%' },
  artwork: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    maxWidth: '100%',
    aspectRatio: 1,
  },
  label: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  description: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    opacity: 0.75,
  },
  progress: {
    fontSize: 14,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
});
