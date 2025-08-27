import { useState } from "react";
import type { Route } from "./+types/sign";
import { useGuestbook } from "~/hooks/useGuestbook";
import { useGeoLocation } from "~/hooks/useGeoLocation";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Navigation } from "~/components/Navigation";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Loader2, MapPin, Send } from "lucide-react";

export default function Sign({ loaderData }: Route.ComponentProps) {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { addMessage } = useGuestbook();
	const { location, loading, error, getCurrentLocation } = useGeoLocation();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim() || !message.trim()) {
			toast("Missing Information", {
				description: "Please fill in both your name and message.",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			addMessage({
				name: name.trim(),
				message: message.trim(),
				location: location || undefined,
			});

			toast("Message Added!", {
				description: "Thank you for signing our guest book.",
			});

			// Navigate to list page after a short delay
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (error) {
			toast("Error", {
				description: "Failed to add your message. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-warm-white to-cream">
			<Navigation />

			<div className="pt-20 pb-12">
				<div className="container mx-auto px-4 max-w-2xl">
					{/* Hero Section */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Sign Our Guest Book
						</h1>
						<p className="text-lg text-muted-foreground">
							Share your thoughts and memories with us
						</p>
					</div>

					{/* Sign Form */}
					<Card className="p-8 shadow-card bg-card border-border">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-2">
								<Label
									htmlFor="name"
									className="text-sm font-medium text-foreground"
								>
									Your Name
								</Label>
								<Input
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter your name"
									className="transition-all duration-200 focus:shadow-soft"
									disabled={isSubmitting}
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="message"
									className="text-sm font-medium text-foreground"
								>
									Your Message
								</Label>
								<Textarea
									id="message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									placeholder="Share your thoughts, memories, or feedback..."
									rows={4}
									className="transition-all duration-200 focus:shadow-soft"
									disabled={isSubmitting}
								/>
							</div>

							{/* Location Section */}
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label className="text-sm font-medium text-foreground">
										Location (Optional)
									</Label>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={getCurrentLocation}
										disabled={loading || isSubmitting}
										className="transition-all duration-200"
									>
										{loading ? (
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
										) : (
											<MapPin className="h-4 w-4 mr-2" />
										)}
										{loading
											? "Getting Location..."
											: "Get Current Location"}
									</Button>
								</div>

								{location && (
									<div className="p-3 bg-primary-soft rounded-lg">
										<p className="text-sm text-foreground">
											📍 Location captured:{" "}
											{location.lat.toFixed(4)},{" "}
											{location.lng.toFixed(4)}
										</p>
									</div>
								)}

								{error && (
									<div className="p-3 bg-destructive/10 rounded-lg">
										<p className="text-sm text-destructive">
											⚠️ {error}
										</p>
									</div>
								)}
							</div>

							<Button
								type="submit"
								className="w-full transition-all duration-300"
								disabled={
									isSubmitting ||
									!name.trim() ||
									!message.trim()
								}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
										Adding Message...
									</>
								) : (
									<>
										<Send className="h-4 w-4 mr-2" />
										Sign Guest Book
									</>
								)}
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
}
