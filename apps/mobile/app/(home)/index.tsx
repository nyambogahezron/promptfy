import { Bookmark, Copy, Send, Share2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	FadeIn,
	FadeInUp,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import PromptCategory from "@/components/PromptCategory";
import { colors } from "@/constants/Colors";
import { statusBarHeight } from "@/constants/Layout";
import { usePromptStore } from "@/store/promptStore";
import { useThemeStore } from "@/store/themeStore";
import { generatePrompts } from "@/utils/gemini";

export default function HomeScreen() {
	const [userInput, setUserInput] = useState("");
	const [generating, setGenerating] = useState(false);
	const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
	const [generatedPromptId, setGeneratedPromptId] = useState<string | null>(null);
	const promptInputRef = useRef<TextInput>(null);
	const scrollViewRef = useRef<ScrollView>(null);

	const { theme } = useThemeStore();
	const { addPrompt, toggleSavePrompt } = usePromptStore();

	const isDark = theme === "dark";
	const colorScheme = isDark ? colors.dark : colors.light;

	// Animation values
	const outputOpacity = useSharedValue(0);
	const outputScale = useSharedValue(0.95);

	useEffect(() => {
		if (generatedPrompt) {
			outputOpacity.value = withSpring(1);
			outputScale.value = withSpring(1);
		} else {
			outputOpacity.value = withSpring(0);
			outputScale.value = withSpring(0.95);
		}
	}, [generatedPrompt, outputOpacity, outputScale]);

	const outputAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: outputOpacity.value,
			transform: [{ scale: outputScale.value }],
		};
	});

	const generatePrompt = async () => {
		if (!userInput.trim()) return;

		Keyboard.dismiss();
		setGenerating(true);
		setGeneratedPrompt(null);
		setGeneratedPromptId(null);

		try {
			const prompts = await generatePrompts(userInput);

			if (prompts && prompts.length > 0) {
				const firstPrompt = prompts[0];
				const promptId = Date.now().toString();

				setGeneratedPrompt(firstPrompt);
				setGeneratedPromptId(promptId);

				// Add to history
				addPrompt({
					id: promptId,
					content: firstPrompt,
					createdAt: new Date().toISOString(),
					category: userInput,
					saved: false,
				});

				// Scroll to show the output
				setTimeout(() => {
					scrollViewRef.current?.scrollToEnd({ animated: true });
				}, 100);
			} else {
				setGeneratedPrompt("Sorry, I couldn't generate a prompt for that. Please try again.");
			}
		} catch (error) {
			console.error("Failed to generate prompts:", error);
			setGeneratedPrompt("An error occurred. Please check your API key and try again.");
		} finally {
			setGenerating(false);
		}
	};

	const copyToClipboard = () => {
		// In a real app, implement clipboard functionality
		alert("Prompt copied to clipboard!");
	};

	const savePrompt = () => {
		if (!generatedPromptId) return;

		toggleSavePrompt(generatedPromptId);

		alert("Prompt saved successfully!");
	};

	const sharePrompt = () => {
		// In a real app, implement share functionality
		alert("Share functionality would open here");
	};

	const handleCategorySelect = (category: string) => {
		let promptIdea = "";

		switch (category) {
			case "creative":
				promptIdea = "A surreal dreamscape with floating islands";
				break;
			case "professional":
				promptIdea = "A professional headshot for a LinkedIn profile";
				break;
			case "art":
				promptIdea = "An impressionist painting of a sunset over water";
				break;
			case "photography":
				promptIdea = "A wildlife photo of a fox in a snowy forest";
				break;
		}

		setUserInput(promptIdea);
		promptInputRef.current?.focus();
	};

	return (
		<View style={[styles.container, { backgroundColor: colorScheme.background }]}>
			{/* <Header title="AI Prompt Generator" /> */}

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}
				keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
			>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollViewContent}
					ref={scrollViewRef}
					keyboardShouldPersistTaps="handled"
				>
					<Animated.View entering={FadeIn.delay(300).duration(1000)}>
						<Text style={[styles.welcomeText, { color: colorScheme.text }]}>
							What kind of prompt do you need today?
						</Text>
					</Animated.View>

					<Animated.View entering={FadeInUp.delay(400).duration(800)}>
						<Text style={[styles.categoriesTitle, { color: colorScheme.secondaryText }]}>
							Categories
						</Text>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.categoriesContainer}
						>
							<PromptCategory
								title="Creative"
								icon="sparkles"
								colorStart="#FF5E62"
								colorEnd="#FF9966"
								onPress={() => handleCategorySelect("creative")}
							/>
							<PromptCategory
								title="Professional"
								icon="briefcase"
								colorStart="#4776E6"
								colorEnd="#8E54E9"
								onPress={() => handleCategorySelect("professional")}
							/>
							<PromptCategory
								title="Art"
								icon="palette"
								colorStart="#11998e"
								colorEnd="#38ef7d"
								onPress={() => handleCategorySelect("art")}
							/>
							<PromptCategory
								title="Photography"
								icon="camera"
								colorStart="#2193b0"
								colorEnd="#6dd5ed"
								onPress={() => handleCategorySelect("photography")}
							/>
						</ScrollView>
					</Animated.View>

					<Animated.View
						entering={FadeInUp.delay(500).duration(800)}
						style={[
							styles.inputContainer,
							{
								backgroundColor: colorScheme.cardBackground,
								borderColor: colorScheme.border,
							},
						]}
					>
						<TextInput
							ref={promptInputRef}
							style={[styles.input, { color: colorScheme.text }]}
							placeholder="Describe what you want to generate..."
							placeholderTextColor={colorScheme.secondaryText}
							value={userInput}
							onChangeText={setUserInput}
							multiline
							numberOfLines={4}
						/>
						<TouchableOpacity
							style={[
								styles.generateButton,
								{
									backgroundColor: colorScheme.primary,
									opacity: userInput.trim() ? 1 : 0.6,
								},
							]}
							onPress={generatePrompt}
							disabled={!userInput.trim() || generating}
						>
							<Send size={20} color="#FFFFFF" />
							<Text style={styles.generateButtonText}>
								{generating ? "Generating..." : "Generate"}
							</Text>
						</TouchableOpacity>
					</Animated.View>

					{generatedPrompt && (
						<Animated.View
							style={[
								styles.outputContainer,
								{
									backgroundColor: colorScheme.cardBackground,
									borderColor: colorScheme.border,
								},
								outputAnimatedStyle,
							]}
						>
							<Text style={[styles.outputTitle, { color: colorScheme.text }]}>
								Generated Prompt
							</Text>
							<Text style={[styles.outputText, { color: colorScheme.text }]}>
								{generatedPrompt}
							</Text>
							<View style={styles.outputActions}>
								<TouchableOpacity style={styles.outputAction} onPress={copyToClipboard}>
									<Copy size={20} color={colorScheme.secondaryText} />
									<Text style={[styles.outputActionText, { color: colorScheme.secondaryText }]}>
										Copy
									</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.outputAction} onPress={savePrompt}>
									<Bookmark size={20} color={colorScheme.secondaryText} />
									<Text style={[styles.outputActionText, { color: colorScheme.secondaryText }]}>
										Save
									</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.outputAction} onPress={sharePrompt}>
									<Share2 size={20} color={colorScheme.secondaryText} />
									<Text style={[styles.outputActionText, { color: colorScheme.secondaryText }]}>
										Share
									</Text>
								</TouchableOpacity>
							</View>
						</Animated.View>
					)}

					<View style={styles.spacer} />
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: statusBarHeight,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollViewContent: {
		padding: 16,
		paddingBottom: 100,
	},
	welcomeText: {
		fontSize: 24,
		fontFamily: "Inter-Bold",
		marginBottom: 24,
	},
	categoriesTitle: {
		fontSize: 16,
		fontFamily: "Inter-Medium",
		marginBottom: 12,
	},
	categoriesContainer: {
		paddingBottom: 8,
		flexDirection: "row",
	},
	inputContainer: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		marginTop: 24,
		marginBottom: 24,
	},
	input: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		textAlignVertical: "top",
		minHeight: 100,
		marginBottom: 16,
	},
	generateButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		borderRadius: 8,
	},
	generateButtonText: {
		color: "#FFFFFF",
		fontFamily: "Inter-Medium",
		fontSize: 16,
		marginLeft: 8,
	},
	outputContainer: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		marginBottom: 24,
	},
	outputTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 18,
		marginBottom: 12,
	},
	outputText: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		lineHeight: 24,
	},
	outputActions: {
		flexDirection: "row",
		marginTop: 16,
		borderTopWidth: 1,
		borderTopColor: "rgba(0, 0, 0, 0.1)",
		paddingTop: 16,
	},
	outputAction: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	outputActionText: {
		fontFamily: "Inter-Medium",
		fontSize: 14,
		marginLeft: 4,
	},
	spacer: {
		height: 40,
	},
});
