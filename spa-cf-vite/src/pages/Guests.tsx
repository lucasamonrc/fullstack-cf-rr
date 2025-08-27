import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState } from "react";

export function Guests() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const { mutateAsync } = useMutation({
		mutationFn: () => {
			return fetch("/api/guests", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, message }),
			});
		},
		onSuccess: () => {
			setName("");
			setMessage("");
		},
	});

	return (
		<form
			className="max-w-2xl mx-auto p-10"
			onSubmit={(e) => {
				e.preventDefault();
				mutateAsync();
			}}
		>
			<h1>
				Add name to guestbook{"  "}
				<Link to="/" className="text-sm text-blue-700 underline">
					View
				</Link>
			</h1>
			<div>
				<label htmlFor="name">Name </label>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border border-gray-300 rounded text-sm p-1"
					required
				/>
			</div>
			<div>
				<label htmlFor="message">Message </label>
				<input
					type="text"
					name="message"
					id="message"
					className="border border-gray-300 rounded text-sm p-1"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				></input>
			</div>
			<button
				type="submit"
				className="mt-1 bg-blue-500 text-white p-2 rounded text-sm px-2 py-1 max-w-1/5 w-full cursor-pointer hover:bg-blue-600 transition-colors"
			>
				Sign
			</button>
		</form>
	);
}
