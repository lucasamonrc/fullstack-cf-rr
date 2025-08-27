import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

interface Guest {
	id: number;
	name: string;
	message: string;
}

export function Home() {
	const { data } = useQuery({
		queryKey: ["guests"],
		queryFn: () => {
			return fetch("/api/guests").then(
				(res) => res.json() as Promise<Guest[]>
			);
		},
		retry: false,
	});

	return (
		<div className="max-w-2xl mx-auto p-10">
			<h1>
				Guests{"  "}
				<Link to="/guests" className="text-sm text-blue-700 underline">
					Sign
				</Link>
			</h1>
			<ul className="list-disc list-inside">
				{data?.map((guest) => (
					<li key={guest.id}>
						{guest.name} - {guest.message}
					</li>
				))}
			</ul>
		</div>
	);
}
