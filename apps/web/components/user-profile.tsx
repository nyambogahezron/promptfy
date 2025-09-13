"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "@/lib/auth-client";

export function UserProfile() {
	const { user, loading } = useAuth();
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			toast.success("Signed out successfully");
			router.push("/auth");
		} catch (error) {
			toast.error("Failed to sign out");
			console.error("Sign out error:", error);
		}
	};

	if (loading) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardContent className="pt-6">
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
							<div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (!user) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardContent className="pt-6 text-center">
					<p className="text-muted-foreground">Not signed in</p>
					<Button onClick={() => router.push("/auth")} className="mt-4">
						Sign In
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Your account information</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-4">
					<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
						{user.name.charAt(0).toUpperCase()}
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">{user.name}</p>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<Badge variant={user.emailVerified ? "default" : "secondary"}>
						{user.emailVerified ? "Verified" : "Unverified"}
					</Badge>
					{user.role && <Badge variant="outline">{user.role}</Badge>}
				</div>

				<div className="space-y-2 text-sm text-muted-foreground">
					<p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
					<p>Last updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
				</div>

				<Button onClick={handleSignOut} variant="outline" className="w-full">
					Sign Out
				</Button>
			</CardContent>
		</Card>
	);
}
