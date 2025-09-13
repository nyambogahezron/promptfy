import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		try {
			setLoading(true);
			setError(null);

			await signIn.email({
				email,
				password,
			});
		} catch (err: any) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>

			{error && <Text style={styles.errorText}>{error}</Text>}

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
				title={loading ? "Signing in..." : "Sign In"}
				onPress={handleLogin}
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
});
