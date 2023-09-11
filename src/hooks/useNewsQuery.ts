import { useQuery } from "@tanstack/react-query"
import { getNews } from "../utils/methods"


export const useNewsQuery = (newsCategory:string,count:number) => {
    const { status, data, error,isLoading } = useQuery({
        queryKey: ['news', newsCategory, count], queryFn: () => getNews(newsCategory, count)
      })

    return { status, data, error,isLoading }
}

