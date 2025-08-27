import { type GuestMessage } from "~/types/guestbook";
import { Card } from "~/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface MessageCardProps {
	message: GuestMessage;
}

export const MessageCard = ({ message }: MessageCardProps) => {
	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<Card className="p-6 mb-4 shadow-card hover:shadow-glow transition-shadow duration-300 bg-card border-border">
			<div className="space-y-3">
				<div className="flex items-start justify-between">
					<h3 className="font-semibold text-lg text-foreground">
						{message.name}
					</h3>
					<div className="flex items-center text-muted-foreground text-sm">
						<Clock className="h-4 w-4 mr-1" />
						{formatDate(message.timestamp)}
					</div>
				</div>

				<p className="text-foreground leading-relaxed">
					{message.message}
				</p>

				{message.location && (
					<div className="flex items-center text-muted-foreground text-sm">
						<MapPin className="h-4 w-4 mr-1" />
						<span>
							{message.location.lat.toFixed(4)},{" "}
							{message.location.lng.toFixed(4)}
						</span>
					</div>
				)}
			</div>
		</Card>
	);
};
