import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/use-better-auth";
import { signOut } from "@/lib/auth-client";

export default function UserProfile() {
	const { user, loading, isAuthenticated } = useAuth();

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("Sign out failed:", error);
		}
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<View style={styles.container}>
				<Text>Please sign in to continue</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome, {user.name}!</Text>
			<Text style={styles.info}>Email: {user.email}</Text>
			<Text style={styles.info}>Role: {user.role || "user"}</Text>
			<Text style={styles.info}>Email Verified: {user.emailVerified ? "Yes" : "No"}</Text>

			<View style={styles.buttonContainer}>
				<Button title="Sign Out" onPress={handleSignOut} />
			</View>
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
	info: {
		fontSize: 16,
		marginBottom: 10,
		textAlign: "center",
	},
	buttonContainer: {
		marginTop: 20,
	},
});
