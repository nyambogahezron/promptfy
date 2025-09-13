import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { signUp } from "@/lib/auth-client";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSignUp = async () => {
		try {
			setLoading(true);
			setError(null);

			await signUp.email({
				email,
				password,
				name,
			});

			setSuccess(true);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Sign up failed");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<View style={styles.container}>
				<Text style={styles.successText}>
					Account created successfully! Please check your email to verify your account.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign Up</Text>

			{error && <Text style={styles.errorText}>{error}</Text>}

			<TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />

			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<Button
				title={loading ? "Creating Account..." : "Sign Up"}
				onPress={handleSignUp}
				disabled={loading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
	errorText: {
		color: "red",
		marginBottom: 10,
		textAlign: "center",
	},
	successText: {
		color: "green",
		textAlign: "center",
		fontSize: 16,
	},
});
