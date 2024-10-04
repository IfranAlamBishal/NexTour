import { useEffect, useState } from "react";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import TourCard from "../../../Shared/TourCards/TourCard";


const AvailableTours = () => {

    const [tours, setTours] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const tourData = async () => {
            const response = await fetch("./touristSpots.json");
            const data = await response.json();
            setTours(data);

            const countryNames = [
                ...new Set(data.map((spot) => spot.country_Name))
            ];
            setCountries(countryNames);


        }
        tourData();
    }, []);

    const availableSpots = tours;

    return (
        <div>
            <SectionHeader
                title="Discover Your NexTour"
                description="Explore the best destinations designed for your ultimate adventure"
            ></SectionHeader>

            <div className=" my-5">
                <h1 className=" text-2xl font-semibold ">Available Tours: {availableSpots.length}</h1>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
                {
                    availableSpots.map(spot => <TourCard key={spot._id} spot={spot}></TourCard>)
                }
            </div>
        </div>
    );
};

export default AvailableTours;