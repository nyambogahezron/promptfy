import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { usePromptStore } from '@/store/promptStore';
import { colors } from '@/constants/Colors';
import { statusBarHeight } from '@/constants/Layout';
import {
  ArrowLeft,
  Calendar,
  Copy,
  Bookmark,
  BookmarkCheck,
  Tag,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { formatDate } from '@/utils/dateUtils';
import Animated, { FadeIn } from 'react-native-reanimated';
import EmptyState from '@/components/EmptyState';

export default function PromptDetailsScreen() {
  const { theme } = useThemeStore();
  const { prompts, toggleSavePrompt } = usePromptStore();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  // Find the prompt by id
  const prompt = prompts.find((p) => p.id === id);

  const copyToClipboard = (content: string) => {
    // In a real app, implement clipboard functionality
    alert('Prompt copied to clipboard!');
  };

  const toggleSave = (id: string) => {
    toggleSavePrompt(id);
  };

  if (!prompt) {
    return (
      <View
        style={[styles.container, { backgroundColor: colorScheme.background }]}
      >
        <EmptyState
          title="Prompt not found"
          message="The prompt you're looking for could not be found"
          icon="search"
        />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <View
        style={[styles.header, { backgroundColor: colorScheme.cardBackground }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colorScheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colorScheme.text }]}>
          Prompt Details
        </Text>
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleSave(prompt.id)}
          >
            {prompt.saved ? (
              <BookmarkCheck size={24} color={colorScheme.primary} />
            ) : (
              <Bookmark size={24} color={colorScheme.secondaryText} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => copyToClipboard(prompt.content)}
          >
            <Copy size={24} color={colorScheme.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeIn.duration(500)}
          style={[
            styles.promptCard,
            {
              backgroundColor: colorScheme.cardBackground,
              borderColor: colorScheme.border,
            },
          ]}
        >
          <View style={styles.promptMeta}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={colorScheme.secondaryText} />
              <Text
                style={[styles.metaText, { color: colorScheme.secondaryText }]}
              >
                {formatDate(prompt.createdAt)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Tag size={16} color={colorScheme.secondaryText} />
              <Text
                style={[styles.metaText, { color: colorScheme.secondaryText }]}
              >
                {prompt.category}
              </Text>
            </View>
          </View>

          <Text style={[styles.promptContent, { color: colorScheme.text }]}>
            {prompt.content}
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  backButton: {
    padding: 8,
  },
  rightActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  promptCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  promptMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 6,
  },
  promptContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
});
