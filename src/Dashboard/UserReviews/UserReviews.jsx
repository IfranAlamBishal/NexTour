import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const UserReviews = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        return (
            <div>
                <Helmet>
                    <title>NexTour | My Reviews</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='My Reviews'
                    ></SectionHeader>

                    <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> Nothing is on your review list</h1>
                </div>
            </div>
        );
    }
};

export default UserReviews;