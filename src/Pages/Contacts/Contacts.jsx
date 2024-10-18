import { Helmet } from "react-helmet-async";
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Swal from "sweetalert2";
import { LuClock10, LuMail } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const Contacts = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const serviceID = 'service_htuemzi';
        const templateID = 'template_7wslt7r';
        const publicKey = 'DDljNtrLPZ85Gw2zI';

        emailjs
            .sendForm(serviceID, templateID, form.current, {
                publicKey: publicKey,
            })
            .then(
                () => {
                    Swal.fire({
                        icon: "success",
                        title: "Sent!",
                        text: "You've successfully sent the mail.",
                    });

                    form.current.reset();
                },
                (error) => {
                    Swal.fire({
                        title: "Error!",
                        text: error.text,
                        icon: "error"
                    });
                },
            );
    };

    return (
        <div >
            <Helmet>
                <title>NexTour | Contact Us</title>
            </Helmet>

            <div>
                <div className=" bg-[url('https://i.ibb.co.com/ZmBJWZ3/stephen.jpg')] bg-cover bg-center h-64 md:h-[400px] w-full content-center">
                    <h1 className=" text-4xl md:text-6xl font-bold text-white w-64  md:w-96 mx-auto text-center bg-black bg-opacity-40 p-5 rounded-xl">Contact Us</h1>
                </div>

                <div className=" my-20">
                    <SectionHeader
                        title='Get in Touch'
                        description='Whether you have questions, feedback, or need assistance, feel free to reach out.'
                    ></SectionHeader>
                </div>


                <div className=" w-5/6 mx-auto my-10 flex flex-col lg:flex-row gap-20 justify-around">

                    {/* Email Form */}

                    <div className=" bg-orange-500 flex-1 p-5 rounded-xl items-center">
                        <h1 className=" text-2xl md:text-3xl font-semibold text-white text-center mb-5"> Have any query? <br />
                            Let us know
                        </h1>
                        <div className="card bg-white w-full max-w-sm mx-auto shrink-0 shadow-2xl">

                            <form className="card-body" ref={form} onSubmit={sendEmail}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" className="input input-bordered" name="name" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Message</span>
                                    </label>
                                    <textarea type="text" placeholder="message" className="textarea textarea-bordered textarea-lg w-full max-w-xs" name="message" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-orange-500 text-white">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className=" space-y-10 flex-1">

                        {/* card-1 */}
                        <div className="card bg-gradient-to-r from-orange-500 to-orange-300 text-white shrink-0 shadow-2xl">
                            <div className="card-body flex flex-col md:flex-row gap-4">
                                <div className=" bg-white rounded-full w-16 h-16">
                                    <LuMail className=" text-orange-500 w-12 h-12 mx-auto pt-4" />
                                </div>
                                <div>
                                    <h2 className="card-title">Contact Info</h2>
                                    <p className=" font-semibold">Call: <span className=" font-normal">+88 01830 000000</span></p>
                                    <p className=" font-semibold">Email: <span className=" font-normal">nextour2024@gmail.com</span></p>
                                </div>
                            </div>
                        </div>

                        {/* card-2 */}
                        <div className="card bg-white text-orange-500 shrink-0 shadow-2xl">
                            <div className="card-body flex flex-col md:flex-row gap-4">
                                <div className=" bg-orange-500 rounded-full w-16 h-16">
                                    <LuClock10 className=" text-white w-12 h-12 mx-auto pt-4" />
                                </div>
                                <div>
                                    <h2 className="card-title">Opening Hours</h2>
                                    <p className=" font-semibold">Mon - Fri: 10.00 am - 8.00 pm</p>
                                    <p className=" font-semibold">Sat - Sun: 3.00 pm - 8.00 pm</p>
                                </div>
                            </div>
                        </div>

                        {/* card-3 */}
                        <div className="card bg-gradient-to-r from-orange-500 to-orange-300 text-white shrink-0 shadow-2xl">
                            <div className="card-body flex flex-col md:flex-row gap-4">
                                <div className=" bg-white rounded-full w-16 h-16">
                                    <IoLocationOutline className=" text-orange-500 w-12 h-12 mx-auto pt-4" />
                                </div>
                                <div>
                                    <h2 className="card-title">Address</h2>
                                    <p className=" font-semibold">House 12, Road 75, Block C, Gulshan-2,</p>
                                    <p className=" font-semibold">Dhaka-1212, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;