import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const BookedTours = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        return (
            <div>
                <Helmet>
                    <title>NexTour | Booked Tours</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='Booked Tours'
                    ></SectionHeader>

                    <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> Nothing is on your Booked Tours</h1>
                </div>
            </div>
        );
    }
};

export default BookedTours;