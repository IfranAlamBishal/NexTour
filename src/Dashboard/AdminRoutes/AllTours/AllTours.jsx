import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useTourData from "../../../Hooks/useTourData";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";


const AllTours = () => {

    const [loading, setLoading] = useState(true);
    const [tourData, refetch] = useTourData();
    const [allTours, setAllTours] = useState([]);
    const [searchedValue, setSearchedValue] = useState('');
    const axiosSecure = useAxios();
    const [selectedTour, setSelectedTour] = useState({});

    useEffect(() => {
        if (tourData) {
            setAllTours(tourData);
        }
        setLoading(false);
    }, [tourData])


    const handleSearch = e => {
        e.preventDefault();
        const searching = e.target.search.value;
        setSearchedValue(searching.toLowerCase());
    }

    const availableSpots = allTours.filter(tour => {

        const matchedSearch = tour.tourists_spot_name.toLowerCase().includes(searchedValue) || tour.country_Name.toLowerCase().includes(searchedValue);

        return matchedSearch;
    });


    const addNewSpot = e => {
        e.preventDefault();

        const newSpot = {
            image: e.target.photo.value,
            tourists_spot_name: e.target.spot_name.value,
            country_Name: e.target.country_name.value,
            location: e.target.location.value,
            short_description: e.target.description.value,
            rating: e.target.rating.value,
            travel_time: e.target.duration.value,
            totalVisitorsPerYear: e.target.totalVisitorsPerYear.value,
            average_cost: e.target.regular_cost.value,
            premium_cost: e.target.premium_cost.value
        }

        axiosSecure.post('/add_new_spot', newSpot)
            .then(res => {
                if (res.data.insertedId) {
                    e.target.reset();
                    Swal.fire({
                        title: "Added!",
                        text: "You've successfully added a new Tour.",
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


    const handleRemove = tour => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this tour?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/remove_tour?id=${tour._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Removed!",
                                text: "You've successfully removed the tour.",
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

    const updateModal = tour => {
        setSelectedTour(tour);

        document.getElementById("update_modal").checked = true;
    }

    const handleUpdate = e => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update the tour?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updateTour = {
                    image: e.target.image.value,
                    tourists_spot_name: e.target.tourists_spot_name.value,
                    country_Name: e.target.country_Name.value,
                    location: e.target.location.value,
                    short_description: e.target.short_description.value,
                    rating: e.target.rating.value,
                    travel_time: e.target.travel_time.value,
                    totalVisitorsPerYear: e.target.totalVisitorsPerYear.value,
                    average_cost: e.target.average_cost.value,
                    premium_cost: e.target.premium_cost.value
                }
                const tourId = selectedTour._id;

                axiosSecure.patch(`/update_tour/${tourId}`, updateTour)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            document.getElementById("update_modal").checked = false;
                            Swal.fire({
                                title: "Updated!",
                                text: "You've successfully updated the Tour.",
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



    if (loading) {
        return (
            <div className="text-center">
                <Helmet>
                    <title>NexTour | All Tours</title>
                </Helmet>
                <span className="loading loading-infinity w-36 text-orange-500"></span>
            </div>
        );
    }

    else {
        return (
            <div>
                <Helmet>
                    <title>NexTour | All Tours</title>
                </Helmet>
                <div>
                    <SectionHeader
                        title='All Tours'
                    ></SectionHeader>

                    <div className=" w-5/6 mx-auto my-20">
                        <div className=" flex flex-col md:flex-row justify-between gap-5">
                            <h1 className=" text-2xl font-semibold text-orange-500 my-5"> Total Tours: {availableSpots.length} </h1>

                            {/* search */}

                            <form onSubmit={handleSearch} className=" relative border-2 max-w-md rounded-lg mx-auto my-5">
                                <input type="text" placeholder="spot or country name" className="input input-bordered w-full max-w-md" name="search" />
                                <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                            </form>

                            {/* Add new spot */}

                            <label htmlFor="my_modal_6" className=" btn bg-orange-500 text-white my-auto w-40 text-base">Add New Spot</label>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto  my-5">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-orange-500 text-white text-base">
                                        <th></th>
                                        <th>Spot Name</th>
                                        <th>Country</th>
                                        <th>Regular Price</th>
                                        <th>Premium Price</th>
                                        <th className=" opacity-0">update</th>
                                        <th className=" opacity-0">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        availableSpots.map((tour, index) => tour ? <tr key={tour._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td className=" font-semibold">{tour.tourists_spot_name}</td>
                                            <td>{tour.country_Name}</td>
                                            <td className=" font-semibold">{tour.average_cost}</td>
                                            <td className=" font-semibold">{tour.average_cost * 1.5}</td>
                                            <td><label onClick={() => updateModal(tour)} className=" btn bg-orange-500 text-white">Update</label></td>
                                            <td><Link onClick={() => handleRemove(tour)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                        </tr> : null
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal for add new Tour */}

                <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-2xl">

                        <h1 className=" text-center text-3xl font-semibold text-orange-500 mb-5">Add New Tour</h1>

                        <div>
                            <form onSubmit={addNewSpot} className="card-body p-4">

                                <div className=" flex flex-col md:flex-row justify-between gap-3">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Spot Name</span>
                                        </label>
                                        <input type="text" placeholder="spot name" className="input input-bordered" name="spot_name" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Location</span>
                                        </label>
                                        <input type="text" placeholder="location" className="input input-bordered" name="location" required />
                                    </div>
                                </div>

                                <div className=" flex flex-col md:flex-row justify-between gap-3">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Country Name</span>
                                        </label>
                                        <input type="text" placeholder="country name" className="input input-bordered" name="country_name" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Duration</span>
                                        </label>
                                        <input type="text" placeholder="duration" className="input input-bordered" name="duration" required />
                                    </div>
                                </div>

                                <div className=" flex flex-col md:flex-row justify-between gap-3">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Regular Cost</span>
                                        </label>
                                        <input type="number" min="0" placeholder="regular cost" className="input input-bordered" name="regular_cost" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Premium Cost</span>
                                        </label>
                                        <input type="number" min="0" placeholder="premium cost" className="input input-bordered" name="premium_cost" />
                                    </div>
                                </div>

                                <div className=" flex flex-col md:flex-row justify-between gap-3">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Rating</span>
                                        </label>
                                        <input type="number" min="0.0" max="5.0" step="0.1" placeholder="rating" className="input input-bordered" name="rating" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Total Visitor Per Year</span>
                                        </label>
                                        <input type="number" min="0" placeholder="total visitor per year" className="input input-bordered" name="totalVisitorsPerYear" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="url" placeholder="photo url" className="input input-bordered" name="photo" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea type="text" placeholder="description" className="textarea textarea-bordered textarea-lg w-full max-w-sm" name="description" required />
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn bg-orange-500 text-white">Add</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </div>
                </div>


                {/* Modal for update Tour */}

                {
                    selectedTour && <div>
                        <input type="checkbox" id="update_modal" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box max-w-2xl">

                                <h1 className=" text-center text-3xl font-semibold text-orange-500 mb-5">Update Tour</h1>

                                <div>
                                    <form onSubmit={handleUpdate} className="card-body p-4">

                                        <div className=" flex flex-col md:flex-row justify-between gap-3">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Spot Name</span>
                                                </label>
                                                <input type="text" defaultValue={selectedTour.tourists_spot_name} className="input input-bordered" name="tourists_spot_name" required />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Location</span>
                                                </label>
                                                <input type="text" defaultValue={selectedTour.location} className="input input-bordered" name="location" required />
                                            </div>
                                        </div>

                                        <div className=" flex flex-col md:flex-row justify-between gap-3">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Country Name</span>
                                                </label>
                                                <input type="text" defaultValue={selectedTour.country_Name} className="input input-bordered" name="country_Name" required />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Duration</span>
                                                </label>
                                                <input type="text" defaultValue={selectedTour.travel_time} className="input input-bordered" name="travel_time" required />
                                            </div>
                                        </div>

                                        <div className=" flex flex-col md:flex-row justify-between gap-3">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Regular Cost</span>
                                                </label>
                                                <input type="number" min="0" defaultValue={selectedTour.average_cost} className="input input-bordered" name="average_cost" required />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Premium Cost</span>
                                                </label>
                                                <input type="number" min="0" defaultValue='0' className="input input-bordered" name="premium_cost" />
                                            </div>
                                        </div>

                                        <div className=" flex flex-col md:flex-row justify-between gap-3">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Rating</span>
                                                </label>
                                                <input type="number" min="0" max="5" step="0.1" defaultValue={selectedTour.rating} className="input input-bordered" name="rating" required />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Total Visitor Per Year</span>
                                                </label>
                                                <input type="number" min="0" defaultValue={selectedTour.totalVisitorsPerYear} className="input input-bordered" name="totalVisitorsPerYear" />
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Photo URL</span>
                                            </label>
                                            <input type="url" defaultValue={selectedTour.image} className="input input-bordered" name="image" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <textarea type="text" defaultValue={selectedTour.short_description} className="textarea textarea-bordered textarea-lg w-full max-w-sm" name="short_description" required />
                                        </div>
                                        <div className="card-actions justify-end mt-4">
                                            <button className="btn bg-orange-500 text-white">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default AllTours;