import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const BlogDetails = () => {

    const { id } = useParams();
    const [spinner, setSpinner] = useState(true);
    const [blogDetails, setBlogDetails] = useState({});
    const axiosSecure = useAxios();


    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinner(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        axiosSecure.get(`/blog/${id}`)
            .then(res => {
                setBlogDetails(res.data)
            })

    }, [axiosSecure, id]);

    const { user_name, photo, title, description } = blogDetails;

    console.log(blogDetails);

    return (
        <div className=" w-3/4 mx-auto min-h-screen py-28">
            <div className=" flex justify-center">

                <Helmet>
                    <title>NexTour | Blog Details</title>
                </Helmet>

                {
                    spinner && <span className="loading loading-infinity w-36 text-orange-500"></span>
                }

                <div>
                    <div className=" flex flex-1">
                        <div className="card bg-white shadow-xl">
                            <figure>
                                <img
                                    src={photo}
                                    alt="spot"
                                    className=" w-full h-64 md:h-[500px] object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl lg:text-4xl">{title}</h2>
                                <p className=" font-semibold">By: {user_name}</p>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;