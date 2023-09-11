import { screen, render } from "@testing-library/react"
import CryptoCurrencies from "../components/pages/CryptoCurrencies"
import { useCoinQuery } from "../hooks/useCoinQuery"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockedUseCoinQuery = useCoinQuery as jest.Mock<any>;
// jest.mock("../hooks/useCoinQuery")

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
})

describe("Crypto Currencies Component", () => {
    const componet = <QueryClientProvider client={queryClient}> <CryptoCurrencies /></QueryClientProvider>
    it("Displaying loading view", () => {
        mockedUseCoinQuery.mockImplementation(()=>({status:"loading"}))
        render(componet);
        expect(screen.getByTestId('crypto-loading')).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeVisible();
    })

})