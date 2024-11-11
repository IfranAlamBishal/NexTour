import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import useUserBookingData from "../../Hooks/useUserBookingData";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const UserReviews = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // const [review, setReview] = useState([]);
    const [verifiedBookings, setVerifiedBookings] = useState([]);
    const [userBookingData] = useUserBookingData();

    useEffect(() => {
        if (userBookingData && user) {
            const confirmedBookings = userBookingData.filter(booking => booking.status == "verified")
            const newToOld = confirmedBookings.reverse();
            setVerifiedBookings(newToOld);
        }
        setLoading(false);
    }, [userBookingData, user])


    if (loading) {
        return (
            <div className="text-center">
                <Helmet>
                    <title>NexTour | My Reviews</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }

    else {
        return (
            <div>
                <Helmet>
                    <title>NexTour | My Reviews</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='My Reviews'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">

                        <h1 className=" text-2xl font-semibold text-orange-500 my-10"> Total Tours to Review: {verifiedBookings.length} </h1>
                        <div>
                            {
                                verifiedBookings.length > 0 ?
                                    <>
                                        {/* Table */}
                                        <div className="overflow-x-auto  my-5">
                                            <table className="table table-zebra">
                                                <thead>
                                                    <tr className=" bg-orange-500 text-white text-base">
                                                        <th></th>
                                                        <th>Tour</th>
                                                        <th>Review</th>
                                                        <th className=" opacity-0">Add/Update</th>
                                                        <th className=" opacity-0">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        verifiedBookings.map((booking, index) => <tr key={booking._id} className=" text-base">
                                                            <th>{index + 1}</th>
                                                            <td>{booking.tourists_spot_name}</td>
                                                            <td>review</td>
                                                            <td><Link className=" btn bg-orange-500 text-white">Add/Update</Link></td>
                                                            <td><Link className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> No Tours to review</h1>
                                    </>
                            }
                        </div>

                    </div>

                </div>
            </div>
        );
    }
};

export default UserReviews;