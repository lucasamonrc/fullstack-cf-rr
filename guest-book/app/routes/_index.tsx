import { useGuestbook } from "~/hooks/useGuestbook";
import type { Route } from "./+types/_index";
import { useState } from "react";
import { Navigation } from "~/components/Navigation";
import { Map, MapPin, MessageSquare, Users } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MessageCard } from "~/components/MessageCard";
import { GuestMap } from "~/components/GuestMap";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { token: context.cloudflare.env.MAPBOX_TOKEN };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { messages } = useGuestbook();
	const [showTokenInput, setShowTokenInput] = useState(false);

	const messagesWithLocation = messages.filter((msg) => msg.location);

	return (
		<div className="min-h-screen bg-gradient-to-br from-warm-white to-cream">
			<Navigation />

			<div className="pt-20 pb-12">
				<div className="container mx-auto px-4">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Guest Messages
						</h1>
						<p className="text-lg text-muted-foreground mb-6">
							See what our visitors have shared
						</p>

						{/* Stats */}
						<div className="flex items-center justify-center space-x-8 text-muted-foreground">
							<div className="flex items-center space-x-2">
								<MessageSquare className="h-5 w-5" />
								<span>{messages.length} Messages</span>
							</div>
							<div className="flex items-center space-x-2">
								<MapPin className="h-5 w-5" />
								<span>
									{messagesWithLocation.length} Locations
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Users className="h-5 w-5" />
								<span>
									{new Set(messages.map((m) => m.name)).size}{" "}
									Visitors
								</span>
							</div>
						</div>
					</div>

					{messages.length === 0 ? (
						<Card className="p-12 text-center bg-card border-border shadow-card">
							<MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
							<h3 className="text-xl font-semibold text-foreground">
								No Messages Yet
							</h3>
							<p className="text-muted-foreground">
								Be the first to sign our guest book!
							</p>
							<Button asChild className="w-1/8 mx-auto">
								<a href="/sign">Sign Guest Book</a>
							</Button>
						</Card>
					) : (
						<Tabs defaultValue="messages" className="space-y-6">
							<TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
								<TabsTrigger
									value="messages"
									className="flex items-center space-x-2"
								>
									<MessageSquare className="h-4 w-4" />
									<span>Messages</span>
								</TabsTrigger>
								<TabsTrigger
									value="map"
									className="flex items-center space-x-2"
								>
									<Map className="h-4 w-4" />
									<span>Map View</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="messages" className="space-y-4">
								<div className="max-w-4xl mx-auto">
									{messages.map((message) => (
										<MessageCard
											key={message.id}
											message={message}
										/>
									))}
								</div>
							</TabsContent>

							<TabsContent value="map" className="space-y-4">
								<div className="max-w-6xl mx-auto">
									<GuestMap
										messages={messages}
										mapboxToken={loaderData.token}
									/>
								</div>
							</TabsContent>
						</Tabs>
					)}
				</div>
			</div>
		</div>
	);
}
