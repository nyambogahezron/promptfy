import { Button, StyleSheet, Text, View } from "react-native";
import { signIn } from "@/lib/auth-client";

export default function SocialSignIn() {
	const handleGoogleLogin = async () => {
		try {
			await signIn.social({
				provider: "google",
				callbackURL: "/dashboard", // this will be converted to a deep link (eg. `myapp://dashboard`) on native
			});
		} catch (error) {
			console.error("Google sign in failed:", error);
		}
	};

	const handleGitHubLogin = async () => {
		try {
			await signIn.social({
				provider: "github",
				callbackURL: "/dashboard", // this will be converted to a deep link (eg. `myapp://dashboard`) on native
			});
		} catch (error) {
			console.error("GitHub sign in failed:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Or continue with</Text>

			<View style={styles.buttonContainer}>
				<Button title="Sign in with Google" onPress={handleGoogleLogin} />
			</View>

			<View style={styles.buttonContainer}>
				<Button title="Sign in with GitHub" onPress={handleGitHubLogin} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		textAlign: "center",
		marginBottom: 20,
		color: "#666",
	},
	buttonContainer: {
		marginBottom: 10,
	},
});
