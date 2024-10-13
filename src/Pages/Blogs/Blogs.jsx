
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogCard from "./BlogCard";
import useBlogsData from "../../Hooks/useBlogsData";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const blogsData = useBlogsData();


    useEffect(() => {
        if(blogsData && blogsData.length > 0){
            const approvedBlogs = blogsData.filter(blog => blog.status == 'approved')
            setBlogs(approvedBlogs);
        } 

    }, [blogsData])


    return (
        <div>
            <Helmet>
                <title>NexTour | Blogs</title>
            </Helmet>

            <div>
                <div className=" bg-[url('https://i.ibb.co.com/fG0C4j6/lance.jpg')] bg-cover bg-center h-64 md:h-[400px] w-full content-center">
                    <h1 className=" text-4xl md:text-6xl font-bold text-white w-40 md:w-60 mx-auto text-center bg-black bg-opacity-40 p-5 rounded-xl">Blogs</h1>
                </div>
                <div className=" w-5/6 mx-auto my-10">
                    <div className=" grid grid-cols-1 gap-10">
                        {
                            blogs.length > 0 ?
                                blogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)

                                :
                                <h1 className=" text-4xl text-orange-500 font-semibold text-center">No blogs available.</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;