"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn, signUp } from "@/lib/auth-client";

export function AuthForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const signinEmailId = useId();
	const signinPasswordId = useId();
	const signupNameId = useId();
	const signupEmailId = useId();
	const signupPasswordId = useId();

	const handleSignIn = async (formData: FormData) => {
		setLoading(true);
		try {
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			const result = await signIn.email({
				email,
				password,
			});

			if (result.error) {
				toast.error(result.error.message || "Failed to sign in");
			} else {
				toast.success("Signed in successfully!");
				router.push("/dashboard");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Sign in error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = async (formData: FormData) => {
		setLoading(true);
		try {
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;
			const name = formData.get("name") as string;

			const result = await signUp.email({
				email,
				password,
				name,
			});

			if (result.error) {
				toast.error(result.error.message || "Failed to sign up");
			} else {
				toast.success(
					"Account created successfully! Please check your email to verify your account."
				);
				router.push("/auth/verify-email");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Sign up error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialSignIn = async (provider: "google" | "github") => {
		setLoading(true);
		try {
			const result = await signIn.social({
				provider,
			});

			if (result.error) {
				toast.error(result.error.message || `Failed to sign in with ${provider}`);
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Social sign in error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-md">
				<Tabs defaultValue="signin">
					<CardHeader>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="signin">Sign In</TabsTrigger>
							<TabsTrigger value="signup">Sign Up</TabsTrigger>
						</TabsList>
					</CardHeader>

					<TabsContent value="signin">
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>Enter your credentials to access your account</CardDescription>
						</CardHeader>
						<CardContent>
							<form action={handleSignIn} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={signinEmailId}>Email</Label>
									<Input
										id={signinEmailId}
										name="email"
										type="email"
										placeholder="Enter your email"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={signinPasswordId}>Password</Label>
									<Input
										id={signinPasswordId}
										name="password"
										type="password"
										placeholder="Enter your password"
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Signing in..." : "Sign In"}
								</Button>
							</form>

							<div className="mt-4 space-y-2">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<span className="w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											Or continue with
										</span>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										onClick={() => handleSocialSignIn("google")}
										disabled={loading}
									>
										Google
									</Button>
									<Button
										variant="outline"
										onClick={() => handleSocialSignIn("github")}
										disabled={loading}
									>
										GitHub
									</Button>
								</div>
							</div>
						</CardContent>
					</TabsContent>

					<TabsContent value="signup">
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>Create a new account to get started</CardDescription>
						</CardHeader>
						<CardContent>
							<form action={handleSignUp} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={signupNameId}>Name</Label>
									<Input
										id={signupNameId}
										name="name"
										type="text"
										placeholder="Enter your full name"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={signupEmailId}>Email</Label>
									<Input
										id={signupEmailId}
										name="email"
										type="email"
										placeholder="Enter your email"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={signupPasswordId}>Password</Label>
									<Input
										id={signupPasswordId}
										name="password"
										type="password"
										placeholder="Create a password"
										required
										minLength={6}
									/>
								</div>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Creating account..." : "Sign Up"}
								</Button>
							</form>

							<div className="mt-4 space-y-2">
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<span className="w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											Or continue with
										</span>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										onClick={() => handleSocialSignIn("google")}
										disabled={loading}
									>
										Google
									</Button>
									<Button
										variant="outline"
										onClick={() => handleSocialSignIn("github")}
										disabled={loading}
									>
										GitHub
									</Button>
								</div>
							</div>
						</CardContent>
					</TabsContent>
				</Tabs>
			</Card>
		</div>
	);
}
