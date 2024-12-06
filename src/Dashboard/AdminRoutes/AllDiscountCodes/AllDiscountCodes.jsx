import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { FaSearch } from "react-icons/fa";

const AllDiscountCodes = () => {
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
                            <h1 className=" text-2xl font-semibold text-orange-500 my-5 "> Total Tours: </h1>

                            {/* search */}

                            <form className=" relative border-2 max-w-md rounded-lg mx-auto my-5">
                                <input type="text" placeholder="spot or country name" className="input input-bordered w-full max-w-md bg-white text-black" name="search" />
                                <button className="absolute  right-2.5 top-4"><FaSearch className="text-orange-500 w-5 h-5" /></button>
                            </form>

                            {/* Add new code */}

                            <label htmlFor="my_modal_6" className=" btn bg-orange-500 text-white my-auto w-40 text-base">Add New Code</label>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto  my-5">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-orange-500 text-white text-base">
                                        <th></th>
                                        <th>Code</th>
                                        <th>Discount(%)</th>
                                        <th>Status</th>
                                        <th className=" opacity-0">update</th>
                                        <th className=" opacity-0">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        availableSpots.map((tour, index) => tour ? <tr key={tour._id} className=" text-base">
                                            <th>{index + 1}</th>
                                            <td className=" font-semibold">{tour.tourists_spot_name}</td>
                                            <td>{tour.country_Name}</td>
                                            <td className=" font-semibold">{tour.average_cost}</td>
                                            <td className=" font-semibold">{tour.average_cost * 1.5}</td>
                                            <td><label onClick={() => updateModal(tour)} className=" btn bg-orange-500 text-white">Update</label></td>
                                            <td><Link onClick={() => handleRemove(tour)} className=" btn bg-orange-500 text-white"><FaTrashAlt className=" w-5 h-5" /></Link></td>

                                        </tr> : null
                                        )} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default AllDiscountCodes;