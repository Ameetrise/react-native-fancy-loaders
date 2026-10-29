import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LoaderGalleryScreen } from './src/screens/LoaderGalleryScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LoaderGalleryScreen />
    </SafeAreaProvider>
  );
}
