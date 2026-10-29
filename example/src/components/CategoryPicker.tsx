import { ScrollView, StyleSheet } from 'react-native';
import { loaderCategories, type LoaderCategory } from '../data/categories';
import { loaderExamples } from '../data/loaders';
import { Button } from './Button';

interface CategoryPickerProps {
  selected: LoaderCategory;
  onSelect: (category: LoaderCategory) => void;
}

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      contentContainerStyle={styles.content}
    >
      {loaderCategories.map((category) => {
        const available =
          category === 'All' ||
          loaderExamples.some((item) => item.category === category);
        return (
          <Button
            key={category}
            label={available ? category : `${category} · planned`}
            selected={selected === category}
            onPress={() => onSelect(category)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
});
