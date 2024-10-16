import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useUserData from "../../../Hooks/useUserData";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const AllUsers = () => {

    const [loading, setLoading] = useState(true);
    const [users, refetch] = useUserData();
    const [allUsers, setAllUsers] = useState([]);
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (users) {
            setAllUsers(users);
        }
        setLoading(false);
    }, [users])

    const handleRemove = removingUser => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove him/her!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (user.email == removingUser.email) {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry !!",
                        text: "Can't remove own account!",
                    });
                }
                else {
                    // Revome from User List
                    axiosSecure.delete(`/remove_user?id=${removingUser._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                const blokedEmail = {
                                    email: removingUser.email
                                };
                                console.log(blokedEmail);
                                // Add to Block list
                                axiosSecure.post('/add_to_blocklist', blokedEmail)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            refetch();
                                            Swal.fire({
                                                title: "Removed!",
                                                text: "You've successfully removed and blocked the user.",
                                                icon: "success"
                                            });
                                        }
                                    })
                            }
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops !",
                                text: "Can't remove this user.",
                            });
                        })
                }

            }
        })
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
                        title='All Users'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">
                        <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Users: {allUsers.length} </h1>

                        {/* Table */}
                        <div className="overflow-x-auto  my-5">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-orange-500 text-white text-base">
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th className=" opacity-0">update</th>
                                        <th className=" opacity-0">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers.map((user, index) => user ? <tr key={user._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td><Link className=" btn bg-orange-500 text-white">Update</Link></td>
                                            <td><Link onClick={() => handleRemove(user)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                        </tr> : null
                                        )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
};

export default AllUsers;