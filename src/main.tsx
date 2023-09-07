import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeContextProvider from "./context/theme-context.tsx";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <ThemeContextProvider >
        <App />
      </ThemeContextProvider>
  </QueryClientProvider>
);
