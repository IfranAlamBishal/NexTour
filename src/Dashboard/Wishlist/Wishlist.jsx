import { Helmet } from "react-helmet-async";
import useWishlist from "../../Hooks/useWishlist";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { useContext, useEffect, useState } from "react";
import useTourData from "../../Hooks/useTourData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userWishlist, refetch] = useWishlist();
    const tourData = useTourData();
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (userWishlist && tourData) {

            const tourIDs = userWishlist.wishlist;

            if (tourIDs && tourIDs.length > 0) {
                const wishlistDetails = tourIDs.map(item => {
                    const tourDetail = tourData.find(tour => tour._id === item.tourId);
                    return {
                        ...tourDetail,
                        packageType: item.packageType
                    }
                })
                setWishlist(wishlistDetails);
            }

            else {
                setWishlist([]);
            }

            setLoading(false);

        }
    }, [userWishlist, tourData])

    const handleRemove = tour => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this from your wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const email = user.email;
                axiosSecure.delete(`/remove_from_wishlist?email=${email}&tourId=${tour._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Removed!",
                                text: "You've successfully removed the package.",
                                icon: "success"
                            });
                        }
                    })

            }
        })
    }


    if (loading) {
        return (
            <div className="text-center">
                <Helmet>
                    <title>NexTour | Wishlist</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }


    if (wishlist.length == 0) {
        return (
            <div>
                <Helmet>
                    <title>NexTour | Wishlist</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='Wishlist'
                    ></SectionHeader>

                    <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> Nothing is on your wishlist</h1>
                </div>
            </div>
        );
    }

    else {
        return (
            <div>
                <Helmet>
                    <title>NexTour | Wishlist</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='Wishlist'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto">
                        <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Packages on Wishlist: {wishlist.length} </h1>

                        {/* Table */}
                        <div className="overflow-x-auto  my-5">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-orange-500 text-white text-base">
                                        <th></th>
                                        <th>Tour</th>
                                        <th>Package Type</th>
                                        <th>Price</th>
                                        <th className=" opacity-0">Book</th>
                                        <th className=" opacity-0">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((tour, index) => <tr key={tour._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td>{tour.tourists_spot_name}</td>
                                            <td>{tour.packageType}</td>
                                            {
                                                tour.packageType == 'Premium' ?
                                                    <td className=" font-semibold">{tour.average_cost * 1.5}</td>

                                                    :
                                                    <td className=" font-semibold">{tour.average_cost}</td>
                                            }
                                            <td><Link className=" btn bg-orange-500 text-white">Book Now</Link></td>
                                            <td><Link onClick={() => handleRemove(tour)} className=" btn bg-orange-500 text-white">Remove</Link></td>

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Wishlist;