import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaRegStar } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const TourDetailsPage = () => {

    const { id } = useParams();
    const [tourDetails, setTourDetails] = useState({});
    const axiosSecure = useAxios();
    const [spinner, setSpinner] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinner(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        axiosSecure.get(`/tour/${id}`)
            .then(res => {
                setTourDetails(res.data)
            })

    }, [axiosSecure, id]);

    const { image, tourists_spot_name, country_Name, location, short_description, rating, travel_time, totalVisitorsPerYear, average_cost } = tourDetails;


    const addToWishlist = (packageType) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Please log in first to continue.",
            });
            navigate('/login');
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to add this package on you wishlist?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, add to wishlist!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const add = {
                        email: user.email,
                        tourId: id,
                        packageType: packageType
                    }

                    axiosSecure.post("/add_to_wishlist", add)
                        .then(() => {
                            Swal.fire({
                                title: "Added!",
                                text: "Added successfully.",
                                icon: "success"
                            });
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops !",
                                text: "Can't add this. May be this package is already on your wishlist.",
                            });
                        })
                }
            })
        }
    }

    return (
        <div className=" w-3/4 mx-auto min-h-screen py-28">

            <Helmet>
                <title>NexTour | Tour Details</title>
            </Helmet>

            <div className=" flex justify-center">
                {
                    spinner && <span className="loading loading-infinity w-36 text-orange-500"></span>
                }
            </div>

            <div className=" card flex-col bg-white shadow-xl gap-10">
                <div className=" flex flex-col lg:flex-row gap-10">
                    <figure className=" flex-1">
                        <img
                            src={image}
                            alt="spot_pic"
                            className=" max-h-[600px] rounded-xl" />
                    </figure>
                    <div className=" card-body p-2 md:p-5 space-y-3 flex-1">
                        <div>
                            <p className=" font-semibold text-lg">{rating} <span><FaRegStar className=" text-orange-500 inline mb-1" /></span></p>
                        </div>
                        <h2 className="card-title text-4xl lg:text-5xl">{tourists_spot_name}</h2>
                        <p className=" text-xl lg:text-2xl">{location}, {country_Name}</p>
                        <p className=" font-semibold text-lg lg:text-xl">{short_description}</p>
                        <p className=" text-lg lg:text-xl">Duration: {travel_time}</p>
                        <p className=" text-lg lg:text-xl">Total Visitors Per Year: {totalVisitorsPerYear}</p>
                    </div>
                </div>
                <div className=" space-y-5 p-5">
                    <div className=" flex flex-col lg:flex-row justify-between gap-5">
                        <div>
                            <h1 className=" text-2xl font-semibold">Regular Package</h1>
                            <ul className=" list-disc list-inside pl-10 py-5">
                                <li>Comfortable 3-star hotel.</li>
                                <li>Shared guided tours and group transportation.</li>
                                <li>Breakfast included.</li>
                                <li>Limited customer service.</li>
                                <li>Regular tour guide.</li>
                            </ul>
                            <p className=" text-xl font-semibold">Price: <span className=" text-orange-500"> {average_cost} BDT</span></p>
                        </div>
                        <div className="card-actions justify-end ">
                            <div className=" flex flex-col md:flex-row gap-5 lg:pt-32">
                                <Link onClick={() => addToWishlist('Regular')} className="btn bg-orange-500 text-white text-lg h-12 ">Add To Wishlist</Link>
                                <Link className="btn bg-orange-500 text-white text-lg h-12 ">Book Now</Link>
                                <Link className="btn bg-orange-500 text-white text-lg h-12 "><FaShareNodes /></Link>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col lg:flex-row justify-between gap-5">
                        <div>
                            <h1 className=" text-2xl font-semibold">Premium Package</h1>
                            <ul className=" list-disc list-inside pl-10 py-5">
                                <li>5 star hotels or boutique stays.</li>
                                <li>Private tours, transportation, and personalized services.</li>
                                <li>Breakfast, lunch, and dinner included.</li>
                                <li>24/7 customer service with priority responses.</li>
                                <li>Expert tour guide.</li>
                            </ul>
                            <p className=" text-xl font-semibold">Price: <span className=" text-orange-500"> {average_cost * 1.5} BDT</span></p>
                        </div>
                        <div className="card-actions justify-end">
                            <div className=" flex flex-col md:flex-row gap-5 lg:pt-32">
                                <Link onClick={() => addToWishlist('Premium')} className="btn bg-orange-500 text-white text-lg h-12 ">Add To Wishlist</Link>
                                <Link className="btn bg-orange-500 text-white text-lg h-12 ">Book Now</Link>
                                <Link className="btn bg-orange-500 text-white text-lg h-12 "><FaShareNodes /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetailsPage;