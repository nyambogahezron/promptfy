'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Types for better-auth
interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	isVerified: boolean;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string, name: string) => Promise<void>;
	signOut: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - adjust according to your setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Fetch current user
	const refreshUser = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/better-auth/me`, {
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	// Sign in
	const signIn = async (email: string, password: string) => {
		const response = await fetch(`${API_BASE_URL}/api/v1/better-auth/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Sign in failed');
		}

		const data = await response.json();
		setUser(data.user);
	};

	// Sign up
	const signUp = async (email: string, password: string, name: string) => {
		const response = await fetch(`${API_BASE_URL}/api/v1/better-auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ email, password, name }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'Sign up failed');
		}

		// Don't automatically sign in after signup, user needs to verify email
		return response.json();
	};

	// Sign out
	const signOut = async () => {
		try {
			await fetch(`${API_BASE_URL}/api/v1/better-auth/signout`, {
				method: 'POST',
				credentials: 'include',
			});
		} catch (error) {
			console.error('Sign out error:', error);
		} finally {
			setUser(null);
		}
	};

	// Check for existing session on mount
	useEffect(() => {
		refreshUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const value: AuthContextType = {
		user,
		loading,
		signIn,
		signUp,
		signOut,
		refreshUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

// Social auth helpers
export const signInWithGoogle = () => {
	window.location.href = `${API_BASE_URL}/api/auth/google`;
};

export const signInWithGitHub = () => {
	window.location.href = `${API_BASE_URL}/api/auth/github`;
};

// Additional auth utilities
export const forgotPassword = async (email: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/v1/better-auth/forgot-password`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to send reset email');
	}

	return response.json();
};

export const resetPassword = async (token: string, password: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/v1/better-auth/reset-password`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token, password }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Password reset failed');
	}

	return response.json();
};

export const verifyEmail = async (token: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/v1/better-auth/verify-email`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Email verification failed');
	}

	return response.json();
};
