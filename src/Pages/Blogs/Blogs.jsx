
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogCard from "./BlogCard";
import useBlogsData from "../../Hooks/useBlogsData";
import { FaSearch } from "react-icons/fa";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [blogsData] = useBlogsData();
    const [searchedValue, setSearchedValue] = useState('');
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinner(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (blogsData && blogsData.length > 0) {
            const approvedBlogs = blogsData.filter(blog => blog.status == 'approved')
            setBlogs(approvedBlogs);
        }

    }, [blogsData])

    const handleSearch = e => {
        e.preventDefault();
        const searching = e.target.search.value;
        setSearchedValue(searching.toLowerCase());
    }

    const availableBlogs = blogs.filter(blog => {
        const matchedSearch = blog.title.toLowerCase().includes(searchedValue) ||
            blog.user_name.toLowerCase().includes(searchedValue);

        return matchedSearch;
    })


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

                    <div className=" flex justify-center">
                        {
                            spinner && <span className="loading loading-infinity w-36 text-orange-500"></span>
                        }
                    </div>

                    {/* search */}

                    <form onSubmit={handleSearch} className=" relative border-2 max-w-md rounded-lg mx-auto my-10">
                        <input type="text" placeholder="spot name" className="input input-bordered w-full max-w-md" name="search" />
                        <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                    </form>
                    <div className=" grid grid-cols-1 gap-10">
                        {
                            availableBlogs.length > 0 ?
                                availableBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)

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