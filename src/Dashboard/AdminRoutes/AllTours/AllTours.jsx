import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useTourData from "../../../Hooks/useTourData";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";

const AllTours = () => {

    const [loading, setLoading] = useState(true);
    const [tourData] = useTourData();
    const [allTours, setAllTours] = useState([]);

    useEffect(() => {
        if (tourData) {
            setAllTours(tourData);
        }
        setLoading(false);
    }, [tourData])


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

    else{
        return(
            <div>
                <Helmet>
                    <title>NexTour | My Blogs</title>
                </Helmet>
                <div>
                    <SectionHeader
                        title='All Tours'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">
                    <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Tours: {allTours.length} </h1>
                    </div>
                </div>
            </div>
        );
    }
};

export default AllTours;