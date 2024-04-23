import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetTv = () => {
    return useQuery({
        queryKey: ['tv', ],
        queryFn: () => request.get(`/discover/tv?api_key=${API_KEY}`).then((res) => {
            return {
                data: res.data,
            }
        })
    });
};
