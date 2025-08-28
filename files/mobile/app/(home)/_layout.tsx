import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { usePromptStore } from '@/store/promptStore';
import { colors } from '@/constants/Colors';
import { History, Bookmark, Settings, User, Clock } from 'lucide-react-native';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

export default function DrawerLayout() {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const { prompts } = usePromptStore();
  const router = useRouter();
  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  // Get the 5 most recent prompts for the drawer
  const recentPrompts = [...prompts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Custom drawer content
  const CustomDrawerContent = (props: any) => {
    return (
      <View
        style={[
          styles.drawerContainer,
          { backgroundColor: colorScheme.cardBackground },
        ]}
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={styles.profileImage}
          />
          <Text style={[styles.userName, { color: colorScheme.text }]}>
            {user?.name || 'User Name'}
          </Text>
          <Text
            style={[styles.userEmail, { color: colorScheme.secondaryText }]}
          >
            {user?.email || 'user@example.com'}
          </Text>
        </View>

        {/* Recent Prompts History */}
        {recentPrompts.length > 0 && (
          <View style={styles.recentPromptsSection}>
            <View style={styles.recentPromptsHeader}>
              <Clock size={16} color={colorScheme.secondaryText} />
              <Text
                style={[styles.recentPromptsTitle, { color: colorScheme.text }]}
              >
                Recent Prompts
              </Text>
            </View>
            <FlatList
              data={recentPrompts}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.promptItem,
                    { borderColor: colorScheme.border },
                  ]}
                  onPress={() => {
                    props.navigation.closeDrawer();
                    router.push({
                      pathname: '/prompt-details',
                      params: { id: item.id },
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.promptText,
                      { color: colorScheme.secondaryText },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.content}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Drawer Items Section */}
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerItemsContainer}
        >
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        {/* Bottom Buttons Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.bottomButton]}
            onPress={() => {
              props.navigation.closeDrawer();
              router.push('/settings');
            }}
          >
            <Settings size={22} color={colorScheme.text} />
            <Text
              style={[styles.bottomButtonText, { color: colorScheme.text }]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme.cardBackground,
        },
        headerTintColor: colorScheme.primary,
        headerTitleStyle: {
          fontFamily: 'Inter-Medium',
        },
        drawerStyle: {
          backgroundColor: colorScheme.cardBackground,
          width: 280,
        },
        drawerActiveTintColor: colorScheme.primary,
        drawerInactiveTintColor: colorScheme.secondaryText,
        drawerLabelStyle: {
          fontFamily: 'Inter-Medium',
          marginLeft: 5,
          fontSize: 13,
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  profileSection: {
    paddingVertical: 20,
    marginTop: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  drawerItemsContainer: {
    paddingTop: 12,
  },
  recentPromptsSection: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  recentPromptsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentPromptsTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  promptItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.2)',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  bottomButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});
