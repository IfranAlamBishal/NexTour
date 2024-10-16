import { useEffect, useState } from "react";
import useBlogsData from "../../../Hooks/useBlogsData";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";

const AllBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [allBlogs, setAllBlogs] = useState([]);
    const [blogsData] = useBlogsData();

    useEffect(() => {
        if (blogsData) {
            setAllBlogs(blogsData);
        }
        setLoading(false);
    }, [blogsData])


    if (loading) {
        return (
            <div className="text-center">
                <Helmet>
                    <title>NexTour | My Blogs</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }

    else{
        return(
            <div>
                <Helmet>
                    <title>NexTour | My Blogs</title>
                </Helmet>
                <div>
                    <SectionHeader
                        title='All Blogs'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">
                    <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Blogs: {allBlogs.length} </h1>
                    </div>
                </div>
            </div>
        );
    }
};

export default AllBlogs;