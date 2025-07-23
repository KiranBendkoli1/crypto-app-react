import axios from "axios";
import { CryptoAPITypes, Stats } from "../app/cryptoSlice";
import { NewsData, Value } from "../app/newsSlice";

export const getStats = () => {
    try {
        return axios.get<CryptoAPITypes>(
            import.meta.env.VITE_GET_COINS_BASE_URL,
            {
                params: {
                    limit: 10
                },
                headers: {
                    "X-RapidAPI-Key":
                        import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
                },
            }
        ).then(res => {
            const data = res.data.data.stats
            console.log(data);
            return data as Stats;
        });

    } catch (error) {
        return error;
    }
}

export const getCoins = (count: number) => {
    try {
        return axios.get<CryptoAPITypes>(
            import.meta.env.VITE_GET_COINS_BASE_URL,
            {
                params: {
                    limit: count
                },
                headers: {
                    "X-RapidAPI-Key":
                        import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
                },
            }
        ).then(res => {
            const data = res.data.data.coins;
            console.log(data)
            return data;
        });

    } catch (error) {
        return error;
    }
}

export const getCoin = (coinId: string) => {
    try {
        return axios.get(
            `${import.meta.env.VITE_GET_COIN_BASE_URL}/${coinId}`,
            {
                headers: {
                    "X-RapidAPI-Key":
                        import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
                },
            }
        ).then(res => {
            const data = res.data.data.coin;
            console.log(data)
            return data;
        });

    } catch (error) {
        return error;
    }
}


export const getNews = (newsCategory: string, count: number) => {
    try {
        return axios.get<NewsData>(
            import.meta.env.VITE_GET_NEWS_BASE_URL,
            {
                params: {
                    q: newsCategory,
                    freshness: "Day",
                    textFormat: "Raw",
                    safeSearch: "Off",
                    count: count,
                },
                headers: {
                    "X-BingApis-SDK": "true",
                    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY
                    ,
                    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
                },
            }
        ).then(res => {
            const data = res.data.value
            console.log(data);
            return data as Value[];
        });

    } catch (error) {
        return error;
    }
}

export const getHistory = (coinId: string, timeperiod: string) => {
    try {
        return axios.get(
            `${import.meta.env.VITE_GET_COIN_BASE_URL}/${coinId}/history`,
            {
                params: {
                    timePeriod: timeperiod,
                },
                headers: {
                    "X-RapidAPI-Key":
                        import.meta.env.VITE_API_KEY,
                    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
                },
            }
        ).then((res) => {
            const data = res.data.data.history;
            console.log(data)
            return data as History[];
        })

    } catch (error) {
        return error;
    }
}