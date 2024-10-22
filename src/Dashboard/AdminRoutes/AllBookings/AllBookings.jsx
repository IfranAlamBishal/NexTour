import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useBookingData from "../../../Hooks/useBookingData";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const AllBookings = () => {

    const [loading, setLoading] = useState(true);
    const [allBookings, setAllBookings] = useState([]);
    const [bookingData, refetch] = useBookingData();
    const [searchedValue, setSearchedValue] = useState('');
    const axiosSecure = useAxios();
    const [selectedBooking, setSelectedBooking] = useState({});
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (bookingData) {
            const newToOld = bookingData.reverse();
            setAllBookings(newToOld);
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

    const handleRemove = booking => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/booking_reject?id=${booking._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: "You've successfully rejected the booking.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops !",
                            text: error.message,
                        });
                    })
            }
        })
    }


    const handleBookingDetailsModal = booking => {
        setSelectedBooking(booking);
        document.getElementById("booking_details").checked = true;
    }


    const handleVerify = e => {
        e.preventDefault();

        if (selectedBooking.status == "verified") {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Already Verified!",
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to verify this bookig? Please double check all the information.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, verify!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const bookingId = selectedBooking._id;
                    const verified = {
                        status: "verified",
                        approvedBy: user.displayName
                    }

                    axiosSecure.patch(`/booking_verification/${bookingId}`, verified)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                document.getElementById("booking_details").checked = false;
                                Swal.fire({
                                    title: "Verified!",
                                    text: "You've successfully verified the booking.",
                                    icon: "success"
                                });
                            }
                        })

                        .catch(error => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops !",
                                text: error.message,
                            });
                        })
                }
            })


        }
    }




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
                                        <table className="table table-zebra table-auto w-full max-w-full">
                                            <thead>
                                                <tr className=" bg-orange-500 text-white text-base">
                                                    <th></th>
                                                    <th>Email</th>
                                                    <th>Transaction ID</th>
                                                    <th>Total Amount</th>
                                                    <th>Status</th>
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
                                                        <td>{booking.status}</td>

                                                        <td><Link onClick={() => handleBookingDetailsModal(booking)} className=" btn bg-orange-500 text-white">Check & Verify</Link></td>
                                                        <td><Link onClick={() => handleRemove(booking)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

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


                {/* Booking details modal for verification */}

                <input type="checkbox" id="booking_details" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box">

                        <div>
                            <form onSubmit={handleVerify} className="card-body p-4">
                                <h1 className=" text-orange-500 mb-5 text-2xl font-semibold "> Double check all information before verify</h1>
                                <h1 className=" text-xl font-semibold my-3">Booked by: {selectedBooking.email}</h1>
                                <div className=" space-y-3">
                                    <p className=" text-lg "><span className=" font-semibold">Tour Name: </span>{selectedBooking.tourists_spot_name}</p>
                                    <p className=" text-lg "><span className=" font-semibold">Package Type: </span>{selectedBooking.packageType}</p>
                                    <p className=" text-lg "><span className=" font-semibold">Number Of Traveller: </span>{selectedBooking.number_of_traveller}</p>
                                    <p className=" text-lg "><span className=" font-semibold">Total Cost: </span>{selectedBooking.totalCost} BDT</p>
                                    <p className=" text-lg "><span className=" font-semibold">Bkash Number: </span>{selectedBooking.bkash_number}</p>
                                    <p className=" text-lg "><span className=" font-semibold">Transaction ID: </span>{selectedBooking.trx_Id}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button htmlFor="booking_details" className="btn bg-orange-500 text-white">Verify</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="booking_details" className="btn">Close!</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AllBookings;