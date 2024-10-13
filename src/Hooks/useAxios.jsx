import axios from "axios";

const useAxios = () => {

    const axiosSecure = axios.create({
        // baseURL: 'https://nextour-server.vercel.app'
        baseURL: 'http://localhost:5000'
    })

    return axiosSecure;
};

export default useAxios;