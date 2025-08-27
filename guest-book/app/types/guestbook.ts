export interface GuestMessage {
	id: string;
	name: string;
	message: string;
	location?: {
		lat: number;
		lng: number;
	};
	timestamp: number;
}

export interface LocationData {
	lat: number;
	lng: number;
}
