import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { BookmarkX, History, Search } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: 'bookmark' | 'history' | 'search';
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const renderIcon = () => {
    const size = 64;
    const color = colorScheme.secondaryText;

    switch (icon) {
      case 'bookmark':
        return <BookmarkX size={size} color={color} />;
      case 'history':
        return <History size={size} color={color} />;
      case 'search':
        return <Search size={size} color={color} />;
      default:
        return <BookmarkX size={size} color={color} />;
    }
  };

  return (
    <Animated.View 
      entering={FadeIn.delay(300).duration(800)}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={[styles.title, { color: colorScheme.text }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: colorScheme.secondaryText }]}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
});