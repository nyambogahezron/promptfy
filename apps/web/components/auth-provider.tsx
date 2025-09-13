"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

export interface User {
	id: string;
	name: string;
	email: string;
	role?: string;
	emailVerified: boolean;
	image?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: session, isPending: loading } = useSession();

	const value = {
		user: session?.user || null,
		loading,
		isAuthenticated: !!session?.user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
