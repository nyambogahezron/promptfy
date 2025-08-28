import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { statusBarHeight } from '@/constants/Layout';
import { colors } from '@/constants/Colors';
import { Lock, Mail, User, ArrowRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuthStore();
  const { theme } = useThemeStore();
  const router = useRouter();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate a successful registration after a short delay
      setTimeout(() => {
        // Success
        register({
          id: '1',
          email,
          name,
          token: 'fake-jwt-token-123456789',
        });

        router.replace('/(home)');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colorScheme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={FadeIn.delay(300).duration(1000)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colorScheme.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colorScheme.secondaryText }]}>
            Sign up to start generating AI prompts
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(500).duration(1000)}
          style={styles.form}
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <User size={20} color={colorScheme.secondaryText} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  color: colorScheme.text,
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border,
                },
              ]}
              placeholder="Full Name"
              placeholderTextColor={colorScheme.secondaryText}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Mail size={20} color={colorScheme.secondaryText} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  color: colorScheme.text,
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={colorScheme.secondaryText}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Lock size={20} color={colorScheme.secondaryText} />
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  color: colorScheme.text,
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={colorScheme.secondaryText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colorScheme.primary }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>Create Account</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text
              style={[styles.signupText, { color: colorScheme.secondaryText }]}
            >
              Already have an account?
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text
                  style={[styles.signupLink, { color: colorScheme.primary }]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: colors.light.error,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  button: {
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginRight: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});
