import { useQuery } from "@tanstack/react-query";

export function Home() {
  const { data, isError } = useQuery({
    queryKey: ["home"],
    queryFn: () => {
      return fetch("/api").then(
        (res) => res.json() as Promise<{ name: string }>
      );
    },
    retry: false,
  });

  return <div>{isError ? "Error. Can't connect." : data?.name}</div>;
}
