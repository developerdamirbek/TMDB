import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetNowPlaying = (page: number = 1) => {
    return useQuery({
        queryKey: ['nowPlaying', page],
        queryFn: () => request.get(`/movie/now_playing`, {
            params: {
                api_key: API_KEY,
                page: page
            }
        }).then((res) => {
            return {
                data: res.data,
                totalPages: res.data.total_pages,
                totalResults: res.data.total_results 
            };
        })
    });
};
