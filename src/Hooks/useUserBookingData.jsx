import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const useUserBookingData = () => {

    const axiosSecure = useAxios();
    const {user} = useContext(AuthContext);

    const {refetch, data: userBookingData} = useQuery({
        queryKey: [user?.email, "bookingData"],
        queryFn: async() => {
            const res = await axiosSecure(`/booking/${user.email}`)
            return res.data;
        }
    })
    return [userBookingData, refetch];
};

export default useUserBookingData;