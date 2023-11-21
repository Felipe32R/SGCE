import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { AnswerProvider } from "./contexts/AnswerContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      retry: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AnswerProvider>
          <Router />
          <Toaster />
        </AnswerProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
