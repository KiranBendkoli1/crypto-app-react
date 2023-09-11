import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import { screen, render } from "@testing-library/react"



describe("App", () => {
    const queryClient = new QueryClient()
    it('shoud have headline', () => {
        render(<QueryClientProvider client={queryClient}><App /></QueryClientProvider>)
        expect(screen.getByText("Crypto App")).toBeInTheDocument();
    })
})
