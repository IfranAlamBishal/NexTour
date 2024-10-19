import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";

const BookingPage = () => {

    const { id, packageType } = useParams();
    const [tourDetails, setTourDetails] = useState({});
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [travellerCount, setTravellerCount] = useState(0);
    const { user } = useContext(AuthContext);
    const isAdmin = useAdmin();

    const minSelectableDate = addDays(new Date(), 7);


    useEffect(() => {
        axiosSecure.get(`/tour/${id}`)
            .then(res => {
                setTourDetails(res.data)
                setLoading(false);
            })


    }, [axiosSecure, id]);

    const { _id, image, tourists_spot_name, country_Name, location, travel_time, average_cost } = tourDetails;

    const copyNumber = () => {
        const bkashNumber = "01830 000000";
        navigator.clipboard.writeText(bkashNumber)
            .then(() => {
                Swal.fire({
                    title: "Copied!",
                    text: "Number copied.",
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

    const totalCostValue = travellerCount > 0
        ? (packageType === "premium"
            ? average_cost * 1.5 * travellerCount
            : average_cost * travellerCount)
        : null;

    const totalCost = (
        <>
            {travellerCount > 0 && (
                <h1 className="text-orange-500 font-semibold">
                    {totalCostValue} BDT
                </h1>
            )}
        </>
    );


    const handleTravellerCount = e => {
        setTravellerCount(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (isAdmin) {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Admin Can't book any package.",
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to book this tour?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, book it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const bookingData = {
                        email: user.email,
                        tourId: _id,
                        tourists_spot_name: tourists_spot_name,
                        packageType: packageType,
                        totalCost: totalCostValue,
                        number_of_traveller: e.target.number_of_traveller.value,
                        date: e.target.date.value,
                        trx_Id: e.target.trx_Id.value,
                        statue: "pending"
                    }

                    axiosSecure.post('/add_to_bookingList', bookingData)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Submitted!",
                                    text: "You've successfully submitted the booking. Please wait for confirmation",
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
            <div>
                <Helmet>
                    <title>NexTour | Booking</title>
                </Helmet>

                <div className="w-3/4 mx-auto min-h-screen py-24">
                    <SectionHeader
                        title='Tour Booking'
                    ></SectionHeader>

                    <div className=" my-20">
                        <div className=" flex flex-col lg:flex-row gap-10">
                            <figure className=" flex-1">
                                <img
                                    src={image}
                                    alt="spot_pic"
                                    className=" max-h-[600px] rounded-xl" />
                            </figure>
                            <div className=" card-body p-2 md:p-5 space-y-3 flex-1">
                                <h2 className="card-title text-4xl lg:text-5xl">{tourists_spot_name}</h2>
                                <p className=" text-xl lg:text-2xl">{location}, {country_Name}</p>
                                <p className=" text-lg lg:text-xl">Duration: {travel_time}</p>
                                <p className=" text-lg lg:text-xl">Package Type: {packageType}</p>
                            </div>
                        </div>


                        {/* Booking Form */}

                        <div>
                            <form onSubmit={handleSubmit} className="card-body p-4 my-10">

                                <div className=" flex flex-col md:flex-row justify-around gap-3">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold">Number of Traveller</span>
                                        </label>
                                        <input onChange={handleTravellerCount} type="number" min="0" max="10" placeholder="min-1,  max-10" className="input input-bordered" name="number_of_traveller" required />
                                    </div>

                                    <div className="form-control">
                                        <label className=" text-xl font-semibold ">Select Starting Date </label> <br />
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            // filterDate={isAvailableDate} 
                                            placeholderText="Select a Date"
                                            minDate={minSelectableDate}
                                            className=" border-2 rounded-lg px-4 py-2 "
                                            name="date"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold">Total Cost</span>
                                        </label>
                                        <div className=" border-2 rounded-lg p-4">
                                            {totalCost}
                                        </div>

                                    </div>
                                </div>
                                <div className=" flex flex-col lg:flex-row justify-between gap-10">
                                    <div>
                                        <h1 className=" text-3xl font-semibold text-orange-500 my-4">Complete your payment using bKash:</h1>

                                        <ol className=" list-decimal space-y-3">
                                            <li className=" font-semibold">Open the bKash App</li>
                                            Open your bKash mobile app on your smartphone.

                                            <li className=" font-semibold"> Select “Make Payment”</li>
                                            From the app’s home screen, tap on the “Make Payment” option.

                                            <li className=" font-semibold">  Enter Our bKash Number</li>
                                            Input the merchant number <button onClick={copyNumber} className=" font-semibold btn-ghost">01830 000000</button>. Click the number to copy.

                                            <li className=" font-semibold">   Enter the Amount</li>
                                            Input the total amount to be paid: {totalCost}.

                                            <li className=" font-semibold"> Add Reference</li>
                                            In the reference field, enter your <span className=" font-semibold">Email Address</span>. This helps us to identify your payment.

                                            <li className=" font-semibold">  Tap “Next”</li>
                                            After reviewing the details, tap on “Next” to proceed.

                                            <li className=" font-semibold">  Confirm Payment</li>
                                            Double-check the information, then tap “Make Payment” to complete the payment.

                                            <li className=" font-semibold">  Receive Confirmation</li>
                                            You will receive a confirmation message once the payment is successful. Save this message for future reference.

                                            <li className=" font-semibold"> Submit Form</li>
                                            Please enter the transaction ID and submit the form. Once submitted, please wait for us to verify your payment. After we have verified your payment, you will receive a confirmation. You can also check the status of your booking on the “Booked Tours” page.


                                        </ol>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-xl font-semibold"> Enter Transaction ID</span>
                                        </label>
                                        <input type="text" placeholder="transaction id" className="input input-bordered" name="trx_Id" required />
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    <button className="btn bg-orange-500 text-white">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default BookingPage;