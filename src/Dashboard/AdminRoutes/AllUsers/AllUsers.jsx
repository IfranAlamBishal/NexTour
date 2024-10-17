import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useUserData from "../../../Hooks/useUserData";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const AllUsers = () => {

    const [loading, setLoading] = useState(true);
    const [users, refetch] = useUserData();
    const [allUsers, setAllUsers] = useState([]);
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);
    const [searchedValue, setSearchedValue] = useState('');
    const [selectedUser, setSelecteduser] = useState({});

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


    const handleUpdate = updatingUser => {
        setSelecteduser(updatingUser);

        document.getElementById("update_modal").checked = true;
    }

    const handleSubmit = e => {
        e.preventDefault();
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

                if (user.email == selectedUser.email) {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry !!",
                        text: "Can't change own role!",
                    });
                }

                // Update User Role
                else {

                    const updatedUser = {
                        userId: selectedUser._id,
                        newRole: e.target.newRole.value
                    }

                    axiosSecure.put('/update_role', updatedUser)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Updated!",
                                    text: "You've successfully updated the user role.",
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
        })

    }


    const handleSearch = e => {
        e.preventDefault();
        const searching = e.target.search.value;
        setSearchedValue(searching.toLowerCase());
    }

    const availableUsers = allUsers.filter(user => {
        const matchedSearch = user.name.toLowerCase().includes(searchedValue) ||
            user.email.toLowerCase().includes(searchedValue);

        return matchedSearch;
    })



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
                        <div className=" flex flex-col md:flex-row justify-between gap-5">
                            <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Users: {allUsers.length} </h1>

                            {/* search */}

                            <form onSubmit={handleSearch} className=" relative border-2 max-w-md rounded-lg mx-auto my-5">
                                <input type="text" placeholder="user name or email" className="input input-bordered w-full max-w-md" name="search" />
                                <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                            </form>
                        </div>

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
                                        availableUsers.map((user, index) => user ? <tr key={user._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td><label onClick={() => handleUpdate(user)} className=" btn bg-orange-500 text-white">Update</label></td>
                                            <td><Link onClick={() => handleRemove(user)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                        </tr> : null
                                        )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                {/* Modal for write new Blog */}

                {
                    selectedUser && <div>
                        <input type="checkbox" id="update_modal" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box">

                                <div>
                                    <h1 className=" text-3xl font-semibold mb-5">Update User Role</h1>
                                    <h1 className="label-text text-xl font-semibold mb-3">Name: {selectedUser.name}</h1>
                                    <h1 className="label-text text-xl font-semibold mb-3">Email: {selectedUser.email}</h1>
                                    <form onSubmit={handleSubmit} className="card-body p-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl font-semibold">Role</span>
                                            </label>

                                            <select
                                                defaultValue={selectedUser.role}
                                                name="newRole"
                                                // onChange={handleRoleChange}
                                                className="select select-bordered max-w-md mt-1"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>

                                        </div>
                                        <div className="card-actions justify-end mt-4">
                                            <button className="btn bg-orange-500 text-white">Update</button>
                                        </div>
                                    </form>
                                </div>

                                <div className="modal-action">
                                    <label htmlFor="update_modal" className="btn">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default AllUsers;