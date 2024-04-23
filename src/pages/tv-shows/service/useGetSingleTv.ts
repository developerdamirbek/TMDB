import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../../config/request";

export const useGetSingleTv = (id : string | undefined) => {
    return useQuery({
        queryKey: ['single-tv', id],
        queryFn: () => request.get(`/tv/${id}`, {
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
