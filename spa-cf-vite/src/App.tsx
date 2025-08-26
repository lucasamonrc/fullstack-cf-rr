import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Guests } from "./pages/Guests";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guests" element={<Guests />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
