import { Redirect } from "expo-router";

export default function Index() {
	const isAuthenticated = true;
	// const { isAuthenticated } = useAuthStore();

	if (isAuthenticated) {
		return <Redirect href="/(home)" />;
	}

	return <Redirect href="/(auth)/login" />;
}
