import { useState } from "react";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import TourCard from "../../../Shared/TourCards/TourCard";

const PopularTours = () => {

    const [tours, setTours] = useState([]);

    useEffect(() => {
        const tourData = async() => {
            const response = await fetch("./touristSpots.json");
            const data = await response.json();
            const popular = data.filter(spot => spot.rating == 5);
            setTours(popular);
            
        }
        tourData();
    },[])

    return (
        <div className=" my-20">
            <SectionHeader
            title ='Most Popular Tours'
            description ='Explore our top-rated tours, crafted to offer the best travel experiences and memorable journeys!'
            ></SectionHeader>

            <div className="flex flex-col md:flex-row justify-around gap-4 my-10">
                {
                    tours.map(spot => <TourCard key={spot._id} spot={spot}></TourCard>)
                }
            </div>
        </div>
    );
};

export default PopularTours;