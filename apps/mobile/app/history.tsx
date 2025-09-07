import { Bookmark, BookmarkCheck, Calendar, Copy, Search, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import EmptyState from "@/components/EmptyState";
import { colors } from "@/constants/Colors";
import { statusBarHeight } from "@/constants/Layout";
import { type Prompt, usePromptStore } from "@/store/promptStore";
import { useThemeStore } from "@/store/themeStore";
import { formatDate } from "@/utils/dateUtils";

export default function HistoryScreen() {
	const [searchQuery, setSearchQuery] = useState("");

	const { theme } = useThemeStore();
	const { prompts, removePrompt, toggleSavePrompt } = usePromptStore();

	const isDark = theme === "dark";
	const colorScheme = isDark ? colors.dark : colors.light;

	const historyPrompts = prompts
		.filter((prompt) => prompt.content.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const copyToClipboard = (_content: string) => {
		// In a real app, implement clipboard functionality
		alert("Prompt copied to clipboard!");
	};

	const deletePrompt = (id: string) => {
		removePrompt(id);
	};

	const toggleSave = (id: string, _currentSaveState: boolean) => {
		toggleSavePrompt(id);
	};

	const renderPromptItem = ({ item, index }: { item: Prompt; index: number }) => (
		<Animated.View
			entering={FadeInRight.delay(index * 100).duration(300)}
			style={[
				styles.promptItem,
				{
					backgroundColor: colorScheme.cardBackground,
					borderColor: colorScheme.border,
				},
			]}
		>
			<View style={styles.promptHeader}>
				<View style={styles.promptDateContainer}>
					<Calendar size={14} color={colorScheme.secondaryText} />
					<Text style={[styles.promptDate, { color: colorScheme.secondaryText }]}>
						{formatDate(item.createdAt)}
					</Text>
				</View>
				<View style={styles.promptActions}>
					<TouchableOpacity
						style={styles.promptAction}
						onPress={() => toggleSave(item.id, item.saved)}
					>
						{item.saved ? (
							<BookmarkCheck size={18} color={colorScheme.primary} />
						) : (
							<Bookmark size={18} color={colorScheme.secondaryText} />
						)}
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.promptAction}
						onPress={() => copyToClipboard(item.content)}
					>
						<Copy size={18} color={colorScheme.secondaryText} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.promptAction} onPress={() => deletePrompt(item.id)}>
						<Trash2 size={18} color={colorScheme.error} />
					</TouchableOpacity>
				</View>
			</View>
			<Text style={[styles.promptContent, { color: colorScheme.text }]}>{item.content}</Text>
		</Animated.View>
	);

	return (
		<View style={[styles.container, { backgroundColor: colorScheme.background }]}>
			<View style={styles.content}>
				<View
					style={[
						styles.searchContainer,
						{
							backgroundColor: colorScheme.cardBackground,
							borderColor: colorScheme.border,
						},
					]}
				>
					<Search size={20} color={colorScheme.secondaryText} />
					<TextInput
						style={[styles.searchInput, { color: colorScheme.text }]}
						placeholder="Search prompts..."
						placeholderTextColor={colorScheme.secondaryText}
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>

				{historyPrompts.length > 0 ? (
					<FlatList
						data={historyPrompts}
						renderItem={renderPromptItem}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.listContent}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<EmptyState
						title="No prompts found"
						message={
							searchQuery
								? "Try a different search term"
								: "Generate some prompts to see your history"
						}
						icon="history"
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: statusBarHeight,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 8,
		borderWidth: 1,
		paddingHorizontal: 12,
		height: 48,
		marginBottom: 16,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		fontFamily: "Inter-Regular",
		fontSize: 16,
	},
	listContent: {
		paddingBottom: 16,
	},
	promptItem: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		marginBottom: 16,
	},
	promptHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	promptDateContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	promptDate: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		marginLeft: 4,
	},
	promptActions: {
		flexDirection: "row",
	},
	promptAction: {
		marginLeft: 12,
	},
	promptContent: {
		fontFamily: "Inter-Regular",
		fontSize: 14,
		lineHeight: 20,
	},
});
