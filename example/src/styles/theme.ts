import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F7F8FC',
  surface: '#FFFFFF',
  text: '#172033',
  muted: '#64748B',
  border: '#E2E8F0',
  accent: '#312E81',
};

export const commonStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: {
    padding: 24,
    gap: 16,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  title: { fontSize: 30, fontWeight: '700', color: colors.text },
  heading: { fontSize: 18, fontWeight: '600', color: colors.text },
  body: { fontSize: 16, lineHeight: 24, color: colors.muted },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pressed: { opacity: 0.7 },
});
