import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import Swal from 'sweetalert2';

const WhyNexTour = () => {

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
        <div className=" p-2">
            <SectionHeader
                title='Why NexTour'
                description='Discover why NexTour is your perfect travel companion.'
            ></SectionHeader>

            <div className=" flex flex-col md:flex-row gap-5 md:gap-10 w-full my-10">
                <div className=" bg-white text-orange-500 rounded-xl flex-1 p-5 m-2 content-center">
                    <p className=" text-xl font-medium ">
                        <span className=" text-3xl font-bold">NexTour</span> offers personalized travel experiences designed by experts, ensuring your journey is seamless, memorable and packed with adventure. From exclusive destinations to hassle-free planning, NexTour is your gateway to discovering the world in a whole new way!
                    </p>
                </div>

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
                                    <span className="label-text">Massage</span>
                                </label>
                                <textarea type="text" placeholder="massage" className="textarea textarea-bordered textarea-lg w-full max-w-xs" name="message" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-orange-500 text-white">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyNexTour;