import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, commonStyles } from '../styles/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
}

export function Button({ label, onPress, selected }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.selected,
        pressed && commonStyles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  selected: { backgroundColor: colors.accent },
  label: { color: colors.text, fontWeight: '500' },
  selectedLabel: { color: colors.surface },
});
