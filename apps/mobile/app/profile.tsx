import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { usePromptStore } from '@/store/promptStore';
import { colors } from '@/constants/Colors';
import { statusBarHeight } from '@/constants/Layout';
import {
  Edit,
  LogOut,
  Clock,
  History,
  Bookmark,
  FileText,
} from 'lucide-react-native';
import StatisticCard from '@/components/StatisticCard';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { theme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { prompts } = usePromptStore();
  const router = useRouter();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  // Calculate prompt statistics
  const totalPrompts = prompts.length;
  const savedPrompts = prompts.filter((prompt) => prompt.saved).length;

  // For demo purposes, we'll calculate average prompt length
  const avgPromptLength =
    prompts.length > 0
      ? Math.round(
          prompts.reduce((acc, prompt) => acc + prompt.content.length, 0) /
            prompts.length
        )
      : 0;

  // Calculate prompts generated today
  const today = new Date().setHours(0, 0, 0, 0);
  const promptsToday = prompts.filter(
    (prompt) => new Date(prompt.createdAt).setHours(0, 0, 0, 0) === today
  ).length;

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colorScheme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeIn.delay(300).duration(1000)}
          style={[
            styles.profileHeader,
            { backgroundColor: colorScheme.cardBackground },
          ]}
        >
          <View style={styles.profileContent}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { backgroundColor: colorScheme.primary },
                ]}
                onPress={() => alert('Edit profile not implemented')}
              >
                <Edit size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.userName, { color: colorScheme.text }]}>
              {user?.name || 'User Name'}
            </Text>
            <Text
              style={[styles.userEmail, { color: colorScheme.secondaryText }]}
            >
              {user?.email || 'user@example.com'}
            </Text>

            <TouchableOpacity
              style={[styles.logoutButton, { borderColor: colorScheme.border }]}
              onPress={handleLogout}
            >
              <LogOut size={16} color={colorScheme.error} />
              <Text style={[styles.logoutText, { color: colorScheme.error }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).duration(800)}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
            Your Stats
          </Text>

          <View style={styles.statsContainer}>
            <StatisticCard
              title="Total Prompts"
              value={totalPrompts.toString()}
              icon={<FileText size={20} color={colorScheme.primary} />}
              colorStart={colorScheme.cardBackground}
              colorEnd={colorScheme.cardBackground}
              delay={0}
            />

            <StatisticCard
              title="Saved Prompts"
              value={savedPrompts.toString()}
              icon={<Bookmark size={20} color="#FF9966" />}
              colorStart={colorScheme.cardBackground}
              colorEnd={colorScheme.cardBackground}
              delay={100}
            />

            <StatisticCard
              title="Prompts Today"
              value={promptsToday.toString()}
              icon={<Clock size={20} color="#4776E6" />}
              colorStart={colorScheme.cardBackground}
              colorEnd={colorScheme.cardBackground}
              delay={200}
            />

            <StatisticCard
              title="Avg. Length"
              value={`${avgPromptLength} chars`}
              icon={<History size={20} color="#38ef7d" />}
              colorStart={colorScheme.cardBackground}
              colorEnd={colorScheme.cardBackground}
              delay={300}
            />
          </View>
        </Animated.View>

        <View style={styles.spacer} />
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
  },
  profileHeader: {
    borderRadius: 16,
    marginBottom: 24,
    padding: 24,
    alignItems: 'center',
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  spacer: {
    height: 100,
  },
});
