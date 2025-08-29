import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { Calendar, Trash2, Copy, Bookmark, BookmarkCheck } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { formatDate } from '@/utils/dateUtils';

interface PromptCardProps {
  item: {
    id: string;
    content: string;
    createdAt: string;
    saved: boolean;
  };
  index: number;
  onRemove: () => void;
  onToggleSave: () => void;
  onCopy: () => void;
}

export default function PromptCard({ 
  item, 
  index, 
  onRemove, 
  onToggleSave, 
  onCopy 
}: PromptCardProps) {
  const { theme } = useThemeStore();
  
  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;
  
  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(300)}
      style={[
        styles.promptItem, 
        { 
          backgroundColor: colorScheme.cardBackground,
          borderColor: colorScheme.border 
        }
      ]}
    >
      <View style={styles.promptHeader}>
        <View style={styles.promptDateContainer}>
          <Calendar size={14} color={colorScheme.secondaryText} />
          <Text style={[styles.promptDate, { color: colorScheme.secondaryText }]}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
        <View style={styles.promptActions}>
          <TouchableOpacity 
            style={styles.promptAction} 
            onPress={onToggleSave}
          >
            {item.saved ? (
              <BookmarkCheck size={18} color={colorScheme.primary} />
            ) : (
              <Bookmark size={18} color={colorScheme.secondaryText} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.promptAction} 
            onPress={onCopy}
          >
            <Copy size={18} color={colorScheme.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.promptAction} 
            onPress={onRemove}
          >
            <Trash2 size={18} color={colorScheme.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.promptContent, { color: colorScheme.text }]}>
        {item.content}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  promptItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promptDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  promptActions: {
    flexDirection: 'row',
  },
  promptAction: {
    marginLeft: 12,
  },
  promptContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});