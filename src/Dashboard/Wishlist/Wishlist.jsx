import { Helmet } from "react-helmet-async";
import useWishlist from "../../Hooks/useWishlist";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import useTourData from "../../Hooks/useTourData";
import { Link } from "react-router-dom";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [userWishlist] = useWishlist();
    const tourData = useTourData();

    useEffect(() => {
        if (userWishlist && tourData) {
            const tourIDs = userWishlist.wishlist;
            const wishlistDetails = tourIDs.map(item => {
                const tourDetail = tourData.find(tour => tour._id === item.tourId);
                return {
                    ...tourDetail,
                    packageType: item.packageType
                }
            })
            setWishlist(wishlistDetails);
        }
    }, [userWishlist, tourData])



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

                    <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Packages on Wishlist: {wishlist.length} </h1>

                    {/* Table */}
                    <div className="overflow-x-auto w-5/6 mx-auto my-5">
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
                                                <td className=" font-semibold">{tour.average_cost*1.5}</td>

                                                :
                                                <td className=" font-semibold">{tour.average_cost}</td>
                                        }
                                        <td><Link className=" btn bg-orange-500 text-white">Book Now</Link></td>
                                        <td><Link className=" btn bg-orange-500 text-white">Remove</Link></td>
                                        
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

};

export default Wishlist;