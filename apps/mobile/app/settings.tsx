import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { colors } from '@/constants/Colors';
import { statusBarHeight } from '@/constants/Layout';
import {
  Moon,
  Sun,
  Bell,
  Lock,
  Trash2,
  HelpCircle,
  Info,
  User,
  History,
  Bookmark,
  Edit,
} from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { usePromptStore } from '@/store/promptStore';

export default function SettingsScreen() {
  const { theme, setTheme } = useThemeStore();
  const { clearAllPrompts } = usePromptStore();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveHistoryEnabled, setSaveHistoryEnabled] = useState(true);

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleClearHistory = () => {
    // Show an alert to confirm
    if (
      confirm(
        'Are you sure you want to clear all prompts? This action cannot be undone.'
      )
    ) {
      clearAllPrompts();
    }
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    control: React.ReactNode
  ) => (
    <View
      style={[styles.settingItem, { borderBottomColor: colorScheme.border }]}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
          {title}
        </Text>
        <Text
          style={[styles.settingSubtitle, { color: colorScheme.secondaryText }]}
        >
          {subtitle}
        </Text>
      </View>
      <View style={styles.settingControl}>{control}</View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.delay(300).duration(1000)}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
            Profile
          </Text>

          {renderSettingItem(
            <User size={24} color={colorScheme.primary} />,
            'View Profile',
            'See your profile information',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('View Profile not implemented')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}

          {renderSettingItem(
            <Edit size={24} color={colorScheme.primary} />,
            'Edit Profile',
            'Update your profile information',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('Edit Profile not implemented')}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}

          {renderSettingItem(
            <History size={24} color={colorScheme.primary} />,
            'History',
            'View your prompt history',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('History not implemented')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}

          {renderSettingItem(
            <Bookmark size={24} color={colorScheme.primary} />,
            'Saved Prompts',
            'Access your saved prompts',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('Saved Prompts not implemented')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}

          <Text
            style={[
              styles.sectionTitle,
              { color: colorScheme.text, marginTop: 24 },
            ]}
          >
            Appearance
          </Text>

          {renderSettingItem(
            isDark ? (
              <Moon size={24} color={colorScheme.primary} />
            ) : (
              <Sun size={24} color={colorScheme.primary} />
            ),
            'Dark Mode',
            'Switch between light and dark theme',
            <Switch
              value={isDark}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: colorScheme.primary }}
              thumbColor="#FFFFFF"
            />
          )}

          <Text
            style={[
              styles.sectionTitle,
              { color: colorScheme.text, marginTop: 24 },
            ]}
          >
            Notifications
          </Text>

          {renderSettingItem(
            <Bell size={24} color={colorScheme.primary} />,
            'Push Notifications',
            'Get notified about new features and updates',
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: colorScheme.primary }}
              thumbColor="#FFFFFF"
            />
          )}

          <Text
            style={[
              styles.sectionTitle,
              { color: colorScheme.text, marginTop: 24 },
            ]}
          >
            Privacy & Data
          </Text>

          {renderSettingItem(
            <Lock size={24} color={colorScheme.primary} />,
            'Save History',
            'Store your generated prompts locally',
            <Switch
              value={saveHistoryEnabled}
              onValueChange={setSaveHistoryEnabled}
              trackColor={{ false: '#767577', true: colorScheme.primary }}
              thumbColor="#FFFFFF"
            />
          )}

          {renderSettingItem(
            <Trash2 size={24} color={colorScheme.error} />,
            'Clear History',
            'Delete all your prompts and history',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.error },
              ]}
              onPress={handleClearHistory}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          )}

          <Text
            style={[
              styles.sectionTitle,
              { color: colorScheme.text, marginTop: 24 },
            ]}
          >
            Support
          </Text>

          {renderSettingItem(
            <HelpCircle size={24} color={colorScheme.primary} />,
            'Help & Support',
            'Get help with using the app',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('Help & Support not implemented')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}

          {renderSettingItem(
            <Info size={24} color={colorScheme.primary} />,
            'About',
            'About this app and its developers',
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { backgroundColor: colorScheme.primary },
              ]}
              onPress={() => alert('About not implemented')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <View style={styles.versionContainer}>
          <Text
            style={[styles.versionText, { color: colorScheme.secondaryText }]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  settingControl: {
    marginLeft: 8,
  },
  buttonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  versionContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
