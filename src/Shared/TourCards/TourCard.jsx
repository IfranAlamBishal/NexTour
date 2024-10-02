import { FaRegStar } from "react-icons/fa6";

const TourCard = ({ spot }) => {
    const { image, tourists_spot_name, country_Name, rating, average_cost } = spot;

    return (
        <div>
            <div className="card max-w-sm bg-white shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="spot" 
                        className=" w-full h-64 object-cover"/>
                </figure>
                <div className="card-body">
                    <div>
                        <p className=" font-semibold">{rating} <span><FaRegStar className=" text-orange-500 inline mb-1"/></span></p>
                    </div>
                    <h2 className="card-title">{tourists_spot_name}</h2>
                    <p>{country_Name}</p>
                    <p>Starts From: <span className=" text-orange-500 font-semibold"> {average_cost} BDT</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;