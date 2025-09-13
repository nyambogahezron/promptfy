import { Link } from "expo-router";
import { ArrowRight, Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { colors } from "@/constants/Colors";
import { statusBarHeight } from "@/constants/Layout";
import { signUp } from "@/lib/auth-client";
import { useThemeStore } from "@/store/themeStore";

export default function RegisterScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const { theme } = useThemeStore();

	const isDark = theme === "dark";
	const colorScheme = isDark ? colors.dark : colors.light;

	const handleRegister = async () => {
		// Basic validation
		if (!name || !email || !password) {
			setError("Please fill in all fields");
			return;
		}

		if (!email.includes("@")) {
			setError("Please enter a valid email address");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await signUp.email({
				email,
				password,
				name,
			});

			setSuccess(true);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<View style={[styles.container, { backgroundColor: colorScheme.background }]}>
				<View style={styles.successContainer}>
					<Text style={[styles.successTitle, { color: colorScheme.text }]}>Account Created!</Text>
					<Text style={[styles.successText, { color: colorScheme.secondaryText }]}>
						Please check your email to verify your account before signing in.
					</Text>
					<Link href="/(auth)/login" asChild>
						<TouchableOpacity style={[styles.button, { backgroundColor: colorScheme.primary }]}>
							<Text style={styles.buttonText}>Go to Sign In</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: colorScheme.background }]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.header}>
					<Text style={[styles.title, { color: colorScheme.text }]}>Create Account</Text>
					<Text style={[styles.subtitle, { color: colorScheme.secondaryText }]}>
						Join us to start generating amazing AI prompts
					</Text>
				</Animated.View>

				<Animated.View entering={FadeInDown.delay(500).duration(1000)} style={styles.form}>
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

					<View style={styles.signinContainer}>
						<Text style={[styles.signinText, { color: colorScheme.secondaryText }]}>
							Already have an account?
						</Text>
						<Link href="/(auth)/login" asChild>
							<TouchableOpacity>
								<Text style={[styles.signinLink, { color: colorScheme.primary }]}>Sign In</Text>
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
		justifyContent: "center",
		padding: 24,
	},
	successContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	successTitle: {
		fontSize: 24,
		fontFamily: "Inter-Bold",
		marginBottom: 16,
		textAlign: "center",
	},
	successText: {
		fontSize: 16,
		fontFamily: "Inter-Regular",
		lineHeight: 24,
		textAlign: "center",
		marginBottom: 32,
	},
	header: {
		marginBottom: 32,
	},
	title: {
		fontSize: 32,
		fontFamily: "Inter-Bold",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		fontFamily: "Inter-Regular",
		lineHeight: 24,
	},
	form: {
		width: "100%",
	},
	errorContainer: {
		backgroundColor: colors.light.error,
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	errorText: {
		color: "#FFFFFF",
		fontFamily: "Inter-Regular",
	},
	inputContainer: {
		marginBottom: 16,
		position: "relative",
	},
	iconContainer: {
		position: "absolute",
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
		fontFamily: "Inter-Regular",
	},
	button: {
		height: 56,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 24,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: "Inter-Medium",
		marginRight: 8,
	},
	signinContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signinText: {
		fontSize: 14,
		fontFamily: "Inter-Regular",
		marginRight: 4,
	},
	signinLink: {
		fontSize: 14,
		fontFamily: "Inter-Medium",
	},
});
