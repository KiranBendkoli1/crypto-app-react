import { useQuery } from "@tanstack/react-query"
import { getCoin } from "../utils/methods"


export const useDetailsQuery = (coinId: string|undefined) => {
    const { status, data, error } = useQuery({
        enabled: coinId !== null, 
        queryKey: ['coin'], queryFn: () => getCoin(coinId ? coinId : "")
      })

    return { status, data, error }
}

