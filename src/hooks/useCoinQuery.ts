import { useQuery } from "@tanstack/react-query"
import { getCoins } from "../utils/methods"


export const useCoinQuery = (count: number) => {
    const { status, data, error } = useQuery({
        queryKey: ['coins', count], queryFn: () => getCoins(count)
    })

    return { status, data, error }
}

