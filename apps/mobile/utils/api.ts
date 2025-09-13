import { authClient } from "@/lib/auth-client";

/**
 * Make an authenticated request to your API server
 * This automatically adds the session cookies to the request headers
 */
export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
	const cookies = authClient.getCookie();

	const headers = {
		...options.headers,
		Cookie: cookies || "",
	};

	const response = await fetch(url, {
		...options,
		headers,
		// 'include' can interfere with the cookies we just set manually in the headers
		credentials: "omit",
	});

	return response;
};

/**
 * Example usage with a custom API endpoint
 */
export const fetchUserPrompts = async () => {
	try {
		const response = await makeAuthenticatedRequest(
			`${process.env.EXPO_PUBLIC_API_URL}/api/v1/prompts`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch prompts");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching user prompts:", error);
		throw error;
	}
};
