import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaRegStar } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../../Hooks/useAdmin";
import fb from "../../../assets/icon/fb-icon.png"
import x from '../../../assets/icon/x-icon.png'
import { BsWhatsapp } from "react-icons/bs";

const TourDetailsPage = () => {

    const { id } = useParams();
    const [tourDetails, setTourDetails] = useState({});
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const isAdmin = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/tour/${id}`)
            .then(res => {
                setTourDetails(res.data)
                setLoading(false);
            })

    }, [axiosSecure, id]);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const { _id, image, tourists_spot_name, country_Name, location, short_description, rating, travel_time, totalVisitorsPerYear, average_cost } = tourDetails;


    const addToWishlist = (packageType) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Please log in first to continue.",
            });
            navigate('/login');
        }
        else if (isAdmin) {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Admin Can't add any package on wishlist.",
            });
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

    const copyLink = () => {
        const tourURL = window.location.href;
        navigator.clipboard.writeText(tourURL)
            .then(() => {
                Swal.fire({
                    title: "Copied!",
                    text: "URL copied.",
                    icon: "success"
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Sorry !",
                    text: error.message,
                });
            })
    }

    const shareOnFacebook = () => {
        const tourURL = window.location.href;
        const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tourURL)}`;
        window.open(facebook, '_blank', 'width=600,height=400');
    }

    const shareOnX = () => {
        const tourURL = window.location.href;
        const tweetText = encodeURIComponent("Check out this amazing tour!");
        const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(tourURL)}&text=${tweetText}`;

        window.open(twitter, '_blank', 'width=600,height=400');

    }

    const shareOnWhatsapp = () => {
        const tourURL = window.location.href;
        const whatsappMessage = encodeURIComponent(`Check out this amazing tour! ${tourURL}`);
        const whatsappURL = `https://wa.me/?text=${whatsappMessage}`;

        window.open(whatsappURL, '_blank');
    }


    if (loading) {
        return (
            <div className="text-center min-h-screen py-28">
                <Helmet>
                    <title>NexTour | Booking</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }


    else {
        return (
            <div className=" w-3/4 mx-auto min-h-screen py-28">

                <Helmet>
                    <title>NexTour | Tour Details</title>
                </Helmet>

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
                                    <Link onClick={scrollUp} to={`/booking/${_id}/${"Regular"}`} className="btn bg-orange-500 text-white text-lg h-12 ">Book Now</Link>
                                    <label htmlFor="share_modal" className="btn bg-orange-500 text-white text-lg h-12 "><FaShareNodes /></label>
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
                                    <Link onClick={scrollUp} to={`/booking/${_id}/${"Premium"}`} className="btn bg-orange-500 text-white text-lg h-12 ">Book Now</Link>
                                    <label htmlFor="share_modal" className="btn bg-orange-500 text-white text-lg h-12 "><FaShareNodes /></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for share tours */}

                <input type="checkbox" id="share_modal" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box bg-orange-500">

                        <div className=" p-5">

                            <h1 className=" text-center  mb-5 text-3xl font-semibold text-white">Share This Tour</h1>
                            <button onClick={copyLink} className="btn text-orange-500 bg-white text-lg h-12 mb-4">Copy URL</button>

                            <h1 className=" mb-3 text-xl font-semibold text-white">Social Media</h1>

                            <div className="grid grid-flow-col gap-4">
                                <Link onClick={shareOnFacebook} className=" bg-white rounded-full w-12 h-12">
                                    <img src={fb} alt="facebook" className=" bg-white rounded-2xl w-8 h-8 mx-auto mt-2" />
                                </Link>
                                <Link onClick={shareOnX} className=" bg-white rounded-full w-12 h-12">
                                    <img src={x} alt="x" className=" bg-white rounded-2xl w-8 h-8 mx-auto mt-2" />
                                </Link>
                                <Link onClick={shareOnWhatsapp} className=" bg-white rounded-full w-12 h-12">
                                    <BsWhatsapp className=" bg-white rounded-xl w-8 h-8 mx-auto mt-2" />
                                </Link>
                            </div>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="share_modal" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TourDetailsPage;