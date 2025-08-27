import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { type GuestMessage } from "~/types/guestbook";
import { Card } from "~/components/ui/card";
import { MapPin } from "lucide-react";

interface GuestMapProps {
	messages: GuestMessage[];
	mapboxToken?: string;
}

export const GuestMap = ({ messages, mapboxToken }: GuestMapProps) => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);

	const messagesWithLocation = messages.filter((msg) => msg.location);

	useEffect(() => {
		if (!mapContainer.current || !mapboxToken) return;

		mapboxgl.accessToken = mapboxToken;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/light-v11",
			center:
				messagesWithLocation.length > 0
					? [
							messagesWithLocation[0].location!.lng,
							messagesWithLocation[0].location!.lat,
						]
					: [0, 0],
			zoom: messagesWithLocation.length > 0 ? 10 : 2,
		});

		// Add navigation controls
		map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

		// Add markers for each message with location
		messagesWithLocation.forEach((message) => {
			if (!message.location || !map.current) return;

			// Create a custom marker element
			const markerEl = document.createElement("div");
			markerEl.className = "guest-marker";
			markerEl.style.width = "30px";
			markerEl.style.height = "30px";
			markerEl.style.borderRadius = "50%";
			markerEl.style.backgroundColor = "hsl(180 65% 35%)";
			markerEl.style.border = "3px solid hsl(var(--warm-white))";
			markerEl.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
			markerEl.style.cursor = "pointer";

			// Create popup
			const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-3">
            <h4 class="font-semibold text-foreground mb-2">${message.name}</h4>
            <p class="text-sm text-muted-foreground mb-2">${message.message}</p>
            <small class="text-xs text-muted-foreground">
              ${new Date(message.timestamp).toLocaleDateString()}
            </small>
          </div>
        `);

			new mapboxgl.Marker(markerEl)
				.setLngLat([message.location.lng, message.location.lat])
				.setPopup(popup)
				.addTo(map.current);
		});

		// Fit bounds to show all markers
		if (messagesWithLocation.length > 1) {
			const bounds = new mapboxgl.LngLatBounds();
			messagesWithLocation.forEach((message) => {
				if (message.location) {
					bounds.extend([message.location.lng, message.location.lat]);
				}
			});
			map.current.fitBounds(bounds, { padding: 50 });
		}

		return () => {
			map.current?.remove();
		};
	}, [messagesWithLocation, mapboxToken]);

	if (!mapboxToken) {
		return (
			<Card className="p-8 text-center bg-card border-border">
				<MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-foreground mb-2">
					Map View Unavailable
				</h3>
				<p className="text-muted-foreground">
					Please configure your Mapbox token to view message locations
					on the map.
				</p>
			</Card>
		);
	}

	return (
		<Card className="overflow-hidden border-border shadow-card">
			<div ref={mapContainer} className="w-full h-96" />
			{messagesWithLocation.length === 0 && (
				<div className="absolute inset-0 flex items-center justify-center bg-card/90">
					<div className="text-center">
						<MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
						<p className="text-muted-foreground">
							No location data available
						</p>
					</div>
				</div>
			)}
		</Card>
	);
};
