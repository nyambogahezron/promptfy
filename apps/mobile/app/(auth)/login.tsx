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
import { Lock, Mail, ArrowRight, Github, Twitter } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthStore();
  const { theme } = useThemeStore();
  const router = useRouter();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate a successful login after a short delay
      setTimeout(() => {
        // Success
        login({
          id: '1',
          email,
          name: 'John Doe',
          token: 'fake-jwt-token-123456789',
        });

        router.replace('/(home)');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setError(null);
    alert(`${provider} login not implemented yet`);
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
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: colorScheme.secondaryText }]}>
            Sign in to continue to AI Prompt Generator
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

          <View style={styles.forgotPasswordContainer}>
            <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.forgotPasswordText,
                    { color: colorScheme.primary },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colorScheme.primary }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>Sign In</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View
              style={[styles.divider, { backgroundColor: colorScheme.border }]}
            />
            <Text
              style={[styles.dividerText, { color: colorScheme.secondaryText }]}
            >
              or continue with
            </Text>
            <View
              style={[styles.divider, { backgroundColor: colorScheme.border }]}
            />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border,
                },
              ]}
              onPress={() => handleSocialLogin('GitHub')}
            >
              <Github size={22} color={colorScheme.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border,
                },
              ]}
              onPress={() => handleSocialLogin('Twitter')}
            >
              <Twitter size={22} color={colorScheme.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text
              style={[styles.signupText, { color: colorScheme.secondaryText }]}
            >
              Don't have an account?
            </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text
                  style={[styles.signupLink, { color: colorScheme.primary }]}
                >
                  Sign Up
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
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
