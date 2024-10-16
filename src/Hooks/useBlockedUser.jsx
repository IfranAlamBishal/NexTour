import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBlockedUser = () => {

    const axiosSecure = useAxios();

    const { data: blockedUsers } = useQuery({
        queryKey: ['blockedUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blockedUsers');
            return res.data;
        }
    });

    return blockedUsers;
};

export default useBlockedUser;