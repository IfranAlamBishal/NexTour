import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import useBlogsData from "../../Hooks/useBlogsData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";

const UserBlogs = () => {

    const [userBlogs, setUserBlogs] = useState([]);
    const { user } = useContext(AuthContext);
    const [blogsData, refetch] = useBlogsData();
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios();

    useEffect(() => {
        if (blogsData && user) {
            const blogs = blogsData.filter(blog => blog.email == user.email);
            setUserBlogs(blogs);
        }

        setLoading(false);
    }, [blogsData, user])

    const handleRemove = blog => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this blog?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/remove_blog?id=${blog._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Removed!",
                                text: "You've successfully removed the blog.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops !",
                            text: error.message,
                        });
                    })
            }
        })
    }

    const addNewBlog = e => {
        e.preventDefault();

        if (user) {
            const newBlog = {
                email: user.email,
                user_name: user.displayName,
                photo: e.target.photo.value,
                title: e.target.title.value,
                description: e.target.description.value,
                status: "Pending"
            }
            axiosSecure.post('/add_blog', newBlog)
                .then(res => {
                    if (res.data.insertedId) {
                        e.target.reset();
                        Swal.fire({
                            title: "Added!",
                            text: "You've successfully added a new blog.",
                            icon: "success"
                        });
                    }

                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: error.message,
                    });
                })
        }
    }




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

    else {
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

                        <div className=" flex flex-col md:flex-row justify-between gap-5">
                            <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Blogs: {userBlogs.length} </h1>

                            {/* Write Blog Btn */}

                            <label htmlFor="my_modal_6" className=" btn bg-orange-500 text-white my-auto w-40 text-base">Write New Blog</label>
                        </div>
                        {
                            userBlogs.length > 0 ?
                                <>

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
                                                        <td><Link onClick={() => handleRemove(blog)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

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

                {/* Modal for write new Blog */}

                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">

                        <div>
                            <form onSubmit={addNewBlog} className="card-body p-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" placeholder="title" className="input input-bordered" name="title" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="url" placeholder="photo url" className="input input-bordered" name="photo" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea type="text" placeholder="description" className="textarea textarea-bordered textarea-lg w-full max-w-sm" name="description" required />
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn bg-orange-500 text-white">Post</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default UserBlogs;