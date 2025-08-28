import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { usePromptStore } from '@/store/promptStore';
import { colors } from '@/constants/Colors';
import { statusBarHeight } from '@/constants/Layout';
import { Search } from 'lucide-react-native';
import EmptyState from '@/components/EmptyState';
import PromptCard from '@/components/PromptCard';

export default function SavedScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const { theme } = useThemeStore();
  const { prompts, removePrompt, toggleSavePrompt } = usePromptStore();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const savedPrompts = prompts
    .filter((prompt) => prompt.saved)
    .filter((prompt) =>
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleRemovePrompt = (id: string) => {
    removePrompt(id);
  };

  const handleToggleSave = (id: string) => {
    toggleSavePrompt(id);
  };

  const handleCopyPrompt = (content: string) => {
    // In a real app, implement clipboard functionality
    alert('Prompt copied to clipboard!');
  };

  const renderPromptItem = ({ item, index }: { item: any; index: number }) => (
    <PromptCard
      item={item}
      index={index}
      onRemove={() => handleRemovePrompt(item.id)}
      onToggleSave={() => handleToggleSave(item.id)}
      onCopy={() => handleCopyPrompt(item.content)}
    />
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colorScheme.cardBackground,
              borderColor: colorScheme.border,
            },
          ]}
        >
          <Search size={20} color={colorScheme.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: colorScheme.text }]}
            placeholder="Search saved prompts..."
            placeholderTextColor={colorScheme.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {savedPrompts.length > 0 ? (
          <FlatList
            data={savedPrompts}
            renderItem={renderPromptItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState
            title="No saved prompts"
            message={
              searchQuery
                ? 'Try a different search term'
                : 'Save some prompts to see them here'
            }
            icon="bookmark"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});
