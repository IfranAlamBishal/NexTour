import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTourData = () => {

    const axiosSecure = useAxios();

    const {refetch, data: tourData = []} = useQuery({
        queryKey: ['tourData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tours')
            return res.data; 
        }
    })
    
    return [tourData, refetch];
};

export default useTourData;