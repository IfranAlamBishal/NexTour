import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import useBlogsData from "../../Hooks/useBlogsData";
import { Link } from "react-router-dom";

const UserBlogs = () => {
    const { user } = useContext(AuthContext);
    const [blogsData] = useBlogsData();
    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        if(blogsData){
            const blogs = blogsData.filter(blog => blog.email == user.email);
            setUserBlogs(blogs);
        }
    }, [blogsData, user])

    return (
        <div>
            <Helmet>
                <title>NexTour | My Blogs</title>
            </Helmet>

            <div>
                <SectionHeader
                    title='My Blogs'
                ></SectionHeader>

                <div className=" w-5/6 mx-auto my-20">
                    {
                        userBlogs.length > 0 ?
                        <>
                        <div className=" flex flex-col md:flex-row justify-between gap-5">
                        <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Blogs: {userBlogs.length} </h1>

                        <Link className=" btn bg-orange-500 text-white my-auto w-40 text-base">Write New Blog</Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto  my-5">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-orange-500 text-white text-base">
                                        <th></th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th className=" opacity-0">Edit</th>
                                        <th className=" opacity-0">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userBlogs.map((blog, index) => <tr key={blog._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td>{blog.title}</td>
                                            <td>{blog.status}</td>
                                            <td><Link className=" btn bg-orange-500 text-white">Edit</Link></td>
                                            <td><Link className=" btn bg-orange-500 text-white">Remove</Link></td>

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        </>
                        :
                        <h1 className=" text-4xl font-semibold text-orange-500 text-center my-20"> Nothing is on your blog list</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserBlogs;