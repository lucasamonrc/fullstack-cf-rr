import { useState, useCallback } from "react";
import { type LocationData } from "~/types/guestbook";

export const useGeoLocation = () => {
	const [location, setLocation] = useState<LocationData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getCurrentLocation = useCallback(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by this browser");
			return;
		}

		setLoading(true);
		setError(null);

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setLoading(false);
			},
			(error) => {
				setError(error.message);
				setLoading(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000,
			}
		);
	}, []);

	return {
		location,
		loading,
		error,
		getCurrentLocation,
	};
};
