import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetMovies = (page: number = 1) => {
    return useQuery({
        queryKey: ['movies', page],
        queryFn: () => request.get(`/discover/movie`, {
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
