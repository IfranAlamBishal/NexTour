import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useBookingData = () => {

    const axiosSecure = useAxios();

    const {refetch, data: bookingData} = useQuery({
        queryKey: ["bookingData"],
        queryFn: async() => {
            const res = await axiosSecure('/all_booking')
            return res.data;
        }
    })
    return [bookingData, refetch];
};

export default useBookingData;