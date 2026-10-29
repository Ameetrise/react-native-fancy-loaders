import { CategoryPicker } from '../components/CategoryPicker';
import type { LoaderCategory } from '../data/categories';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoaderListItem } from '../components/LoaderListItem';
import { LoaderPreview } from '../components/LoaderPreview';
import { Button } from '../components/Button';
import { ExampleLoader } from '../components/ExampleLoader';
import { loaderExamples, type LoaderId } from '../data/loaders';
import { colors, commonStyles } from '../styles/theme';

export function LoaderGalleryScreen() {
  const [category, setCategory] = useState<LoaderCategory>('All');
  const [selectedId, setSelectedId] = useState<LoaderId>('ecg');
  const [progress, setProgress] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [opacity, setOpacity] = useState(0.65);
  const { width, height } = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const visibleLoaders = loaderExamples.filter(
    (item) => category === 'All' || item.category === category,
  );
  const selected =
    visibleLoaders.find((item) => item.id === selectedId) ?? visibleLoaders[0];

  function selectCategory(value: LoaderCategory) {
    setCategory(value);
    setOverlay(false);
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={styles.header}>
        <Text style={commonStyles.heading}>Fancy Loaders</Text>
        <Text style={styles.subtitle}>LOADER COLLECTION</Text>
      </View>
      <View style={styles.preview}>
        {selected ? (
          <LoaderPreview
            item={selected}
            loading={loading}
            progress={progress}
            reduceMotion={reduceMotion}
            size={height < 700 ? 72 : 112}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={commonStyles.title}>{category}</Text>
            <Text style={commonStyles.body}>Category planned</Text>
            <Text style={styles.plannedText}>
              Dedicated loaders for this category are not built yet. Choose
              Healthcare, Medicine, or Fitness to try the current collection.
            </Text>
          </View>
        )}
      </View>
      <View>
        <CategoryPicker selected={category} onSelect={selectCategory} />
      </View>
      <View style={styles.library}>
        <FlatList
          key={columns}
          numColumns={columns}
          data={visibleLoaders}
          extraData={selectedId}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.grid}
          ListHeaderComponent={
            <Text style={commonStyles.heading}>Choose a loader</Text>
          }
          ListEmptyComponent={
            <Text style={commonStyles.body}>
              No loaders available in this category yet.
            </Text>
          }
          ListFooterComponent={
            selected ? (
              <View style={styles.controls}>
                <View style={commonStyles.row}>
                  <Text style={commonStyles.heading}>Explore loaders</Text>
                  <Switch
                    accessibilityLabel="Loading"
                    value={loading}
                    onValueChange={setLoading}
                  />
                </View>
                <View style={commonStyles.wrap}>
                  {[undefined, 0, 50, 100].map((value) => (
                    <Button
                      key={String(value)}
                      label={value === undefined ? 'Auto' : `${value}%`}
                      selected={progress === value}
                      onPress={() => setProgress(value)}
                    />
                  ))}
                </View>
                <View style={commonStyles.row}>
                  <Text style={commonStyles.body}>Reduce motion</Text>
                  <Switch
                    accessibilityLabel="Reduce motion"
                    value={reduceMotion}
                    onValueChange={setReduceMotion}
                  />
                </View>
                <Text style={commonStyles.body}>Overlay opacity</Text>
                <View style={commonStyles.wrap}>
                  {[0.25, 0.65, 1].map((value) => (
                    <Button
                      key={value}
                      label={`${Math.round(value * 100)}% opacity`}
                      selected={opacity === value}
                      onPress={() => setOpacity(value)}
                    />
                  ))}
                  <Button
                    label="Try full-screen overlay"
                    onPress={() => setOverlay(true)}
                  />
                </View>
              </View>
            ) : undefined
          }
          renderItem={({ item }) => (
            <LoaderListItem
              item={item}
              selected={selected?.id === item.id}
              onPress={() => setSelectedId(item.id)}
            />
          )}
        />
      </View>
      {overlay && selected && (
        <ExampleLoader
          id={selected.id}
          loading
          color={selected.color}
          size={112}
          progress={progress}
          reduceMotion={reduceMotion}
          presentation="overlay"
          overlayOpacity={opacity}
          onRequestClose={() => setOverlay(false)}
        >
          <Button label="Close overlay" onPress={() => setOverlay(false)} />
        </ExampleLoader>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  plannedText: {
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 22,
  },
  header: { paddingHorizontal: 20, paddingVertical: 12, gap: 4 },
  subtitle: { fontSize: 10, letterSpacing: 2, color: colors.muted },
  preview: {
    flex: 1,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  library: { flex: 1 },
  grid: {
    padding: 16,
    gap: 12,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  gridRow: { gap: 12 },
  controls: { gap: 12, paddingBottom: 4 },
});
