import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface StatisticCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorStart: string;
  colorEnd: string;
  delay?: number;
}

export default function StatisticCard({
  title,
  value,
  icon,
  colorStart,
  colorEnd,
  delay = 0,
}: StatisticCardProps) {
  const { theme } = useThemeStore();
  
  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;
  
  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).duration(600)}
      style={styles.cardWrapper}
    >
      <LinearGradient
        colors={[colorStart, colorEnd]}
        style={[
          styles.container,
          { 
            borderColor: colorScheme.border,
          }
        ]}
      >
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={[styles.value, { color: colorScheme.text }]}>
          {value}
        </Text>
        <Text style={[styles.title, { color: colorScheme.secondaryText }]}>
          {title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 12,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});