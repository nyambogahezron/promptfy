import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Briefcase, Palette, Camera } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface PromptCategoryProps {
  title: string;
  icon: 'sparkles' | 'briefcase' | 'palette' | 'camera';
  colorStart: string;
  colorEnd: string;
  onPress: () => void;
}

export default function PromptCategory({
  title,
  icon,
  colorStart,
  colorEnd,
  onPress,
}: PromptCategoryProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'sparkles':
        return <Sparkles size={24} color="#FFFFFF" />;
      case 'briefcase':
        return <Briefcase size={24} color="#FFFFFF" />;
      case 'palette':
        return <Palette size={24} color="#FFFFFF" />;
      case 'camera':
        return <Camera size={24} color="#FFFFFF" />;
      default:
        return <Sparkles size={24} color="#FFFFFF" />;
    }
  };

  return (
    <Animated.View entering={FadeInRight.delay(200).duration(500)}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={[colorStart, colorEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          {renderIcon()}
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});