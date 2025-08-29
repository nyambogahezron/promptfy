import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { statusBarHeight } from '@/constants/Layout';
import { colors } from '@/constants/Colors';
import { Mail, ArrowLeft, Send } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { theme } = useThemeStore();
  const router = useRouter();

  const isDark = theme === 'dark';
  const colorScheme = isDark ? colors.dark : colors.light;

  const handleResetPassword = async () => {
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll simulate a successful password reset after a short delay
      setTimeout(() => {
        setSuccess(true);
      }, 1500);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Password reset failed. Please try again.');
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colorScheme.text} />
        </TouchableOpacity>

        <Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.header}>
          <Text style={[styles.title, { color: colorScheme.text }]}>Forgot Password</Text>
          <Text style={[styles.subtitle, { color: colorScheme.secondaryText }]}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </Animated.View>

        {success ? (
          <Animated.View entering={FadeInDown.delay(300).duration(1000)} style={styles.successContainer}>
            <Send size={48} color={colorScheme.success} style={styles.successIcon} />
            <Text style={[styles.successTitle, { color: colorScheme.text }]}>Check Your Email</Text>
            <Text style={[styles.successText, { color: colorScheme.secondaryText }]}>
              We've sent a password reset link to {email}
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorScheme.primary, marginTop: 32 }]}
              onPress={() => router.replace('/(auth)/login')}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={styles.form}>
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
                style={[styles.input, { 
                  color: colorScheme.text,
                  backgroundColor: colorScheme.cardBackground,
                  borderColor: colorScheme.border 
                }]}
                placeholder="Email"
                placeholderTextColor={colorScheme.secondaryText}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorScheme.primary }]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colorScheme.secondaryText }]}>
                Remember your password?
              </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={[styles.loginLink, { color: colorScheme.primary }]}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        )}
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
});