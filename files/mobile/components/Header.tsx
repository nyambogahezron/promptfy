import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  onBackPress?: () => void;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  rightAction,
  onBackPress
}: HeaderProps) {
  const { theme } = useThemeStore();
  const router = useRouter();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colorScheme.cardBackground,
        borderBottomColor: colorScheme.border 
      }
    ]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
          >
            <ChevronLeft size={24} color={colorScheme.text} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: colorScheme.text }]}>
        {title}
      </Text>

      <View style={styles.rightContainer}>
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  leftContainer: {
    position: 'absolute',
    left: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  rightContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
});