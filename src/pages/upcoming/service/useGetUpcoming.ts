import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetUpcoming = (page: number = 1) => {
    return useQuery({
        queryKey: ['upcoming', page],
        queryFn: () => request.get(`/movie/upcoming`, {
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
