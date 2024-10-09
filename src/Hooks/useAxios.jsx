import axios from "axios";

const useAxios = () => {

    const axiosSecure = axios.create({
        baseURL: 'https://nextour-server.vercel.app'
    })

    return axiosSecure;
};

export default useAxios;