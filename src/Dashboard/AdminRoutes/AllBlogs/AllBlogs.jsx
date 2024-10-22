import { useContext, useEffect, useState } from "react";
import useBlogsData from "../../../Hooks/useBlogsData";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";

const AllBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [allBlogs, setAllBlogs] = useState([]);
    const [blogsData, refetch] = useBlogsData();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [selectedBlog, setSelectedBlog] = useState({});

    useEffect(() => {
        if (blogsData) {
            const reverseBlogs = blogsData.reverse();
            setAllBlogs(reverseBlogs);
        }
        setLoading(false);
    }, [blogsData])


    const addNewBlog = e => {
        e.preventDefault();

        if (user) {
            const newBlog = {
                email: user.email,
                user_name: "Admin",
                photo: e.target.photo.value,
                title: e.target.title.value,
                description: e.target.description.value,
                status: "pending"
            }
            axiosSecure.post('/add_blog', newBlog)
                .then(res => {
                    if (res.data.insertedId) {
                        e.target.reset();
                        refetch();
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

    const handleCheck = blog => {

        setSelectedBlog(blog);
        document.getElementById("check_&_approve").checked = true;

    }

    const handleApprove = e => {
        e.preventDefault();

        if (selectedBlog.status == "approved") {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Already Approved!",
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to approve the blog?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, approve!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const blogId = selectedBlog._id;
                    const approved = {
                        status: "approved",
                        approvedBy: user.displayName
                    }

                    axiosSecure.patch(`/approve_blog/${blogId}`, approved)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                document.getElementById("check_&_approve").checked = false;
                                Swal.fire({
                                    title: "Approved!",
                                    text: "You've successfully approved the blog.",
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
                        title='All Blogs'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">

                        <div className=" flex flex-col md:flex-row justify-between gap-5">
                            <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Blogs: {allBlogs.length} </h1>

                            {/* Write Blog Btn */}
                            <label htmlFor="my_modal_6" className=" btn bg-orange-500 text-white my-auto w-40 text-base">Write New Blog</label>
                        </div>

                        {
                            allBlogs.length > 0 ?
                                <>

                                    {/* Table */}
                                    <div className="overflow-x-auto  my-5">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr className=" bg-orange-500 text-white text-base">
                                                    <th></th>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th className=" opacity-0">Approve</th>
                                                    <th className=" opacity-0">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allBlogs.map((blog, index) => <tr key={blog._id} className=" text-base">
                                                        <th>{index + 1}</th>
                                                        <td>{blog.title}</td>
                                                        <td>{blog.status}</td>

                                                        <td><Link onClick={() => handleCheck(blog)} className=" btn bg-orange-500 text-white">Check & Approve</Link></td>
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
                <div className="modal " role="dialog">
                    <div className="modal-box">

                        <div>
                            <form onSubmit={addNewBlog} className="card-body p-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" placeholder="title" className="input input-bordered bg-white text-black" name="title" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="url" placeholder="photo url" className="input input-bordered bg-white text-black" name="photo" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea type="text" placeholder="description" className="textarea textarea-bordered textarea-lg w-full max-w-sm bg-white text-black" name="description" required />
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


                {/* Modal for Check and Approve Blog */}

                <input type="checkbox" id="check_&_approve" className="modal-toggle" />
                <div className="modal bg-white text-black" role="dialog">
                    <div className="modal-box">

                        <div>
                            <form onSubmit={handleApprove} className="card-body p-4">
                                <figure className=" flex-1">
                                    <img
                                        src={selectedBlog.photo}
                                        alt="spot_pic"
                                        className=" max-h-[600px] rounded-xl" />
                                </figure>
                                <h1 className=" text-xl font-semibold my-3">{selectedBlog.title}</h1>
                                <p className=" text-base ">{selectedBlog.description}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn bg-orange-500 text-white">Approve</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="check_&_approve" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AllBlogs;