import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as systemUI from "expo-system-ui";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "@/hooks/use-better-auth";
import { useThemeStore } from "@/store/themeStore";
import "react-native-gesture-handler";

systemUI.setBackgroundColorAsync("#121212");

SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const { theme, setTheme } = useThemeStore();

	useEffect(() => {
		if (colorScheme) {
			setTheme(colorScheme);
		}
	}, [colorScheme, setTheme]);

	const [fontsLoaded, fontError] = useFonts({
		"Inter-Regular": Inter_400Regular,
		"Inter-Medium": Inter_500Medium,
		"Inter-Bold": Inter_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(home)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
			</Stack>
			<StatusBar style={theme === "dark" ? "light" : "dark"} />
		</AuthProvider>
	);
}
