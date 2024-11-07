import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import useUserBookingData from "../../Hooks/useUserBookingData";

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

    console.log(verifiedBookings);


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
                        <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> No Tours to review</h1>
                    </div>

                </div>
            </div>
        );
    }
};

export default UserReviews;