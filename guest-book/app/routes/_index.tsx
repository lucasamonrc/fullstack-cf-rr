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
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { messages } = useGuestbook();
	const [mapboxToken, setMapboxToken] = useState("");
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
									{!mapboxToken && (
										<Card className="p-6 mb-6 bg-accent/10 border-accent">
											<div className="text-center">
												<Map className="h-12 w-12 text-accent mx-auto mb-4" />
												<h3 className="text-lg font-semibold text-foreground mb-2">
													Map View Requires Setup
												</h3>
												<p className="text-muted-foreground mb-4">
													To view message locations on
													the map, please enter your
													Mapbox public token. You can
													get one free at{" "}
													<a
														href="https://mapbox.com"
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary hover:underline"
													>
														mapbox.com
													</a>
												</p>
												{!showTokenInput ? (
													<Button
														onClick={() =>
															setShowTokenInput(
																true
															)
														}
													>
														Configure Map
													</Button>
												) : (
													<div className="max-w-md mx-auto space-y-3">
														<input
															type="text"
															placeholder="Enter your Mapbox public token"
															value={mapboxToken}
															onChange={(e) =>
																setMapboxToken(
																	e.target
																		.value
																)
															}
															className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
														/>
														<div className="flex space-x-2">
															<Button
																onClick={() =>
																	setShowTokenInput(
																		false
																	)
																}
																variant="outline"
																size="sm"
															>
																Cancel
															</Button>
															<Button
																onClick={() =>
																	setShowTokenInput(
																		false
																	)
																}
																size="sm"
																disabled={
																	!mapboxToken
																}
															>
																Apply
															</Button>
														</div>
													</div>
												)}
											</div>
										</Card>
									)}

									<GuestMap
										messages={messages}
										mapboxToken={mapboxToken}
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
