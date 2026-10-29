import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExampleLoader } from './ExampleLoader';
import type { LoaderExample } from '../data/loaders';
import { colors, commonStyles } from '../styles/theme';

interface LoaderPreviewProps {
  item: LoaderExample;
  progress?: number;
  loading: boolean;
  reduceMotion: boolean;
  size: number;
}

export function LoaderPreview({
  item,
  progress,
  loading,
  reduceMotion,
  size,
}: LoaderPreviewProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.category}>{item.category.toUpperCase()}</Text>
      <Text accessibilityRole="header" style={commonStyles.title}>
        {item.name}
      </Text>
      <View style={styles.artwork}>
        <ExampleLoader
          id={item.id}
          loading={loading}
          color={item.color}
          progress={progress}
          reduceMotion={reduceMotion}
          size={size}
        />
        {!loading && <Text style={commonStyles.body}>Loading is off.</Text>}
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  category: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
  },
  artwork: { width: '100%' },
  description: { color: colors.muted, textAlign: 'center', fontSize: 14 },
});
