import { useState, useEffect } from "react";
import { type GuestMessage } from "~/types/guestbook";

const STORAGE_KEY = "guestbook-messages";

export const useGuestbook = () => {
	const [messages, setMessages] = useState<GuestMessage[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				setMessages(JSON.parse(stored));
			} catch (error) {
				console.error("Failed to parse stored messages:", error);
			}
		}
	}, []);

	const addMessage = (message: Omit<GuestMessage, "id" | "timestamp">) => {
		const newMessage: GuestMessage = {
			...message,
			id: Date.now().toString(),
			timestamp: Date.now(),
		};

		const updatedMessages = [newMessage, ...messages];
		setMessages(updatedMessages);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
		return newMessage;
	};

	const getMessagesSorted = () => {
		return [...messages].sort((a, b) => b.timestamp - a.timestamp);
	};

	return {
		messages: getMessagesSorted(),
		addMessage,
	};
};
