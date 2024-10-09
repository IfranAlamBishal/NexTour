import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TourCard = ({ spot }) => {
    const { _id, image, tourists_spot_name, country_Name, rating, average_cost } = spot;

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className=" flex flex-1">
            <div className="card max-w-sm bg-white shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="spot"
                        className=" w-full h-64 object-cover" />
                </figure>
                <div className="card-body">
                    <div>
                        <p className=" font-semibold">{rating} <span><FaRegStar className=" text-orange-500 inline mb-1" /></span></p>
                    </div>
                    <h2 className="card-title text-2xl">{tourists_spot_name}</h2>
                    <p>{country_Name}</p>
                    <p>Starts From: <span className=" text-orange-500 font-semibold"> {average_cost} BDT</span></p>
                    <div className="card-actions justify-end">
                        <Link to={`/details/${_id}`} onClick={scrollUp} className="btn bg-orange-500 text-white">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;