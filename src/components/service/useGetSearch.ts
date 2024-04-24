import { useQuery } from "@tanstack/react-query";
import request, { API_KEY } from "../../config/request";

export const useSearchQuery = (search:string) => {
    console.log(search);
    
    return useQuery({
        queryKey: ["search", search],
        queryFn: () => {
            return request.get(`/search/movie?query=${search}`, {
                params: {
                    api_key: API_KEY,
                    search
                }
            }).then((res) => res?.data?.results);
        }
    });
};
