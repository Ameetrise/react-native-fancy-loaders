import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { LoaderExample } from '../data/loaders';
import { colors, commonStyles } from '../styles/theme';

interface LoaderListItemProps {
  item: LoaderExample;
  selected: boolean;
  onPress: () => void;
}

export function LoaderListItem({
  item,
  selected,
  onPress,
}: LoaderListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Select ${item.name}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && commonStyles.pressed,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: item.color }]} />
      <Text style={commonStyles.heading}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    gap: 8,
    minHeight: 110,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selected: { borderColor: colors.accent },
  dot: { width: 20, height: 6, borderRadius: 3 },
  category: { color: colors.muted, fontSize: 12 },
});
