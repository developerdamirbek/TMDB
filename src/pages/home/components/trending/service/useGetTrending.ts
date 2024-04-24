import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../../../config/request";

export const useGetTrending = () => {
    return useQuery({
        queryKey: ['trending'],
        queryFn: () => request.get(`/trending/movie/day`, {
            params: {
                api_key: API_KEY,
            }
        }).then((res) => {
            return {
                data: res.data,
            };
        })
    });
};
