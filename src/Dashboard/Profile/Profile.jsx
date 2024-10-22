import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaCircleUser } from "react-icons/fa6";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const Profile = () => {
    const { user, loading, updateName, updatePhoto } = useContext(AuthContext);

    const updateUserName = e => {
        e.preventDefault();
        const newName = e.target.name.value;
        updateName(newName);

        window.location.reload();
    }

    const updateUserPhoto = e => {
        e.preventDefault();
        const newPhoto =e.target.photo.value;
        updatePhoto(newPhoto);

        window.location.reload();
    }

    if (loading) {
        return <div className="flex justify-center">
            <Helmet>
                <title>NexTour | Profile</title>
            </Helmet>
            <span className="loading loading-infinity w-36 text-orange-500"></span>
        </div>
    }
    if (user) {
        const { displayName, email, photoURL, metadata } = user;
        return (
            <div>
                <Helmet>
                    <title>NexTour | Profile</title>
                </Helmet>
                <div className=" w-5/6 mx-auto min-h-screen">
                    <div className="card bg-white shadow-xl md:h-[600px] mt-14">
                        <figure className="px-10 pt-10 md:pt-20 ">
                            {
                                photoURL ?
                                    <img src={photoURL} alt="photo" className="rounded-full w-40 h-40" />
                                    :
                                    <FaCircleUser className="rounded-full w-40 h-40" />
                            }
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-4xl font-bold">{displayName}</h2>
                            <p className=" text-lg font-semibold">{email}</p>
                            <p className=" text-lg font-semibold"> Joined: {metadata.creationTime}</p>
                            <div className="card-actions my-6">
                                <label htmlFor="my_modal_6" className="btn bg-orange-500 text-white">Update Profile</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for update profile */}

                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">
                        <div>
                            <form onSubmit={updateUserName} className="card-body p-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="name" className="input input-bordered bg-white text-black" name="name" required />
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    <button className="btn bg-orange-500 text-white">Update Name</button>
                                </div>
                            </form>
                        </div>

                        <div>
                            <form onSubmit={updateUserPhoto} className="card-body p-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="url" placeholder="photo url" className="input input-bordered bg-white text-black" name="photo" required />
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button  className="btn bg-orange-500 text-white">Update Photo</button>
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

export default Profile;