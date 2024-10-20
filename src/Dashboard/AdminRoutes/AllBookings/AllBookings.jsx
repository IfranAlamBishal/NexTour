import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useBookingData from "../../../Hooks/useBookingData";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";

const AllBookings = () => {

    const [loading, setLoading] = useState(true);
    const [allBookings, setAllBookings] = useState([]);
    const [bookingData] = useBookingData();
    const [searchedValue, setSearchedValue] = useState('');

    useEffect(() => {
        if (bookingData) {
            setAllBookings(bookingData);
        }
        setLoading(false);
    }, [bookingData])


    const handleSearch = e => {
        e.preventDefault();
        const searching = e.target.search.value;
        setSearchedValue(searching.toLowerCase());
    }

    const availableBookings = allBookings.filter(booking => {
        const matchedSearch = booking.email.toLowerCase().includes(searchedValue) ||
            booking.email.toLowerCase().includes(searchedValue);

        return matchedSearch;
    })





    if (loading) {
        return (
            <div className="text-center">
                <Helmet>
                    <title>NexTour | All Bookings</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }

    else {
        return (
            <div>
                <Helmet>
                    <title>NexTour | All Bookings</title>
                </Helmet>

                <SectionHeader
                    title='All Bookings'
                ></SectionHeader>

                <div className=" w-5/6 mx-auto my-20">
                    <div className=" flex flex-col md:flex-row justify-between gap-5">
                        <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Bookings: {availableBookings.length} </h1>

                        {/* search */}

                        <form onSubmit={handleSearch} className=" relative border-2 max-w-md rounded-lg mx-auto my-5">
                            <input type="text" placeholder="email or transaction id" className="input input-bordered w-full max-w-md bg-white text-black" name="search" />
                            <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                        </form>
                    </div>

                    <div>
                        {
                            availableBookings.length > 0 ?
                                <>
                                    {/* Table */}
                                    <div className="overflow-x-auto  my-5">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr className=" bg-orange-500 text-white text-base">
                                                    <th></th>
                                                    <th>Email</th>
                                                    <th>Transaction ID</th>
                                                    <th>Total Amount</th>
                                                    <th className=" opacity-0">Check & Verify</th>
                                                    <th className=" opacity-0">Reject</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    availableBookings.map((booking, index) => <tr key={booking._id} className=" text-base">
                                                        <th>{index + 1}</th>
                                                        <td>{booking.email}</td>
                                                        <td>{booking.trx_Id}</td>
                                                        <td>{booking.totalCost}</td>

                                                        <td><Link className=" btn bg-orange-500 text-white">Check & Verify</Link></td>
                                                        <td><Link className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <h1 className=" text-4xl font-semibold text-orange-500 text-center my-20"> No Booking Data Available </h1>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default AllBookings;