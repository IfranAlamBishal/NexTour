import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaCircleUser } from "react-icons/fa6";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const Profile = () => {
    const { user, loading } = useContext(AuthContext);

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
                                    <FaCircleUser className="rounded-full w-40 h-40"/>
                            }
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl md:text-4xl font-bold">{displayName}</h2>
                            <p className=" text-lg font-semibold">{email}</p>
                            <p className=" text-lg font-semibold"> Joined: {metadata.creationTime}</p>
                            <div className="card-actions my-6">
                                <button className="btn bg-orange-500 text-white">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Profile;