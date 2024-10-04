import { Helmet } from "react-helmet-async";

const Contacts = () => {
    return (
        <div >
            <Helmet>
                <title>NexTour | Contact Us</title>
            </Helmet>

            <div>
                <div className=" bg-[url('https://i.ibb.co.com/3d0zjNH/bg.jpg')] bg-cover bg-center h-64 md:h-[400px] w-full content-center">
                    <h1 className=" text-4xl md:text-6xl font-bold text-white w-64  md:w-96 mx-auto text-center bg-black bg-opacity-40 p-5 rounded-xl">Contact Us</h1>
                </div>
                <div className=" w-5/6 mx-auto my-10">

                </div>
            </div>
        </div>
    );
};

export default Contacts;