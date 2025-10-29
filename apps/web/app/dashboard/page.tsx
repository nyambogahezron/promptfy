import { ProtectedRoute } from "@/components/protected-route";
import { UserProfile } from "@/components/user-profile";

export default function DashboardPage() {
	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-background p-8">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold">Dashboard</h1>
						<p className="text-muted-foreground mt-2">Welcome to your Promptify dashboard</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<div className="md:col-span-1">
							<UserProfile />
						</div>

						<div className="md:col-span-1 lg:col-span-2">
							<div className="grid gap-4">
								<div className="p-6 bg-card rounded-lg border">
									<h3 className="text-lg font-semibold mb-2">Recent Prompts</h3>
									<p className="text-muted-foreground">Your recent prompts will appear here.</p>
								</div>

								<div className="p-6 bg-card rounded-lg border">
									<h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
									<p className="text-muted-foreground">
										Your usage statistics will be displayed here.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
