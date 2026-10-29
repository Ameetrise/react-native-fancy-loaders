import type { ReactNode } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import type { LoaderProps } from '../types/loader';
import { loaderDefaults } from '../styles/tokens';
import { normalizeProgress, positiveNumber } from '../utils/numbers';
import { styles } from './LoaderContainer.styles';

interface LoaderContainerProps extends LoaderProps {
  artwork: ReactNode;
}

export function LoaderContainer({
  loading,
  artwork,
  label = loaderDefaults.label,
  description,
  progress,
  showProgress = true,
  size = loaderDefaults.size,
  backgroundColor = 'transparent',
  textColor = loaderDefaults.textColor,
  fullScreen = false,
  presentation,
  overlayOpacity = 0.65,
  overlayColor = '#FFFFFF',
  onRequestClose,
  style,
  textStyle,
  descriptionStyle,
  accessibilityLabel,
  testID,
  children,
}: LoaderContainerProps) {
  if (!loading) return null;

  const percentage = normalizeProgress(progress);
  const artworkSize = positiveNumber(size, loaderDefaults.size);
  const spokenLabel = description ? `${label}. ${description}` : label;
  const textColorStyle = { color: textColor };

  const mode = presentation ?? (fullScreen ? 'fullscreen' : 'inline');
  const opacity = Number.isFinite(overlayOpacity)
    ? Math.min(1, Math.max(0, overlayOpacity))
    : 0.65;

  const content = (
    <View
      testID={testID}
      style={[
        styles.container,
        mode === 'fullscreen' && styles.fullScreen,
        { backgroundColor },
        style,
      ]}
    >
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={accessibilityLabel ?? spokenLabel}
        aria-busy
        aria-valuemin={percentage === undefined ? undefined : 0}
        aria-valuemax={percentage === undefined ? undefined : 100}
        aria-valuenow={percentage}
        style={styles.content}
      >
        <View
          aria-hidden
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[styles.artwork, { width: artworkSize }]}
        >
          {artwork}
        </View>
        {label !== '' && (
          <Text style={[styles.label, textColorStyle, textStyle]}>{label}</Text>
        )}
        {description && (
          <Text style={[styles.description, textColorStyle, descriptionStyle]}>
            {description}
          </Text>
        )}
        {showProgress && percentage !== undefined && (
          <Text style={[styles.progress, textColorStyle, textStyle]}>
            {Math.round(percentage)}%
          </Text>
        )}
      </View>
      {children}
    </View>
  );

  if (mode !== 'overlay') return content;

  return (
    <Modal
      transparent
      visible
      animationType="none"
      onRequestClose={onRequestClose}
      statusBarTranslucent
      navigationBarTranslucent
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.overlay} accessibilityViewIsModal>
        <View
          pointerEvents="none"
          style={[styles.backdrop, { backgroundColor: overlayColor, opacity }]}
        />
        <ScrollView
          contentContainerStyle={styles.overlayContent}
          bounces={false}
        >
          {content}
        </ScrollView>
      </View>
    </Modal>
  );
}
