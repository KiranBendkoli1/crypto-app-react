import { useQuery } from "@tanstack/react-query"
import { getStats } from "../utils/methods"


export const useStatsQuery = () => {
    const { status, data, error } = useQuery({
        queryKey: ['stats'], queryFn: () => getStats()
      })

    return { status, data, error }
}

