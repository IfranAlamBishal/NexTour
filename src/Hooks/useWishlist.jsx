import { useContext } from "react";
import useAxios from "./useAxios";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useWishlist = () => {

    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);

    const { refetch, data: userWishlist = [] } = useQuery({
        queryKey: ['userWishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlish?email=${user.email}`)
            return res.data;
        }
    });
    return [userWishlist, refetch];
};

export default useWishlist;