import { useEffect, useState } from "react";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import TourCard from "../../../Shared/TourCards/TourCard";
import { FaSearch } from "react-icons/fa";


const AvailableTours = () => {

    const [tours, setTours] = useState([]);
    const [countries, setCountries] = useState([]);
    const [searchedValue, setSearchedValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

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

    const handleSearch = e => {
        e.preventDefault();
        const searching = e.target.search.value
        setSearchedValue(searching.toLowerCase());
    }

    const handleCcountry = e => {
        setSelectedCountry(e.target.value)
    }


    const availableSpots = tours.filter( tour => {

        const matchedSearch = tour.tourists_spot_name.toLowerCase().includes(searchedValue)

        const matchedCategory = selectedCountry ? tour.country_Name == selectedCountry : true;

        return matchedSearch && matchedCategory;
    });

    return (
        <div>
            <SectionHeader
                title="Discover Your NexTour"
                description="Explore the best destinations designed for your ultimate adventure"
            ></SectionHeader>

            <div className=" my-5 flex flex-col lg:flex-row gap-5 justify-around w-64 lg:w-full">
                <h1 className=" text-2xl font-semibold ">Available Tours: {availableSpots.length}</h1>

                {/* search */}

                <form onSubmit={handleSearch} className=" relative border-2 max-w-md rounded-lg">
                    <input type="text" placeholder="spot name" className="input input-bordered w-full max-w-md" name="search" />
                    <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                </form>

                {/* Category */}
                <div>
                    <select onChange={handleCcountry} className="select select-bordered w-full max-w-xs text-lg font-medium">
                        <option selected disabled>
                            Country
                        </option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

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