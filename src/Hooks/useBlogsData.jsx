import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBlogsData = () => {

    const axiosSecure = useAxios();

    const {refetch, data: blogsData = []} = useQuery({
        queryKey: ['blogsData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_blogs')
            return res.data
        }
    })
    return [blogsData, refetch];
};

export default useBlogsData;