import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetSingleMovie = (movieId : string | undefined) => {
    return useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => request.get(`/movie/${movieId}`, {
            params: {
                api_key: API_KEY
            }
        }).then((res) => {
            return {
                data: res.data
            };
        })
    });
};
