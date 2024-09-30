
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';



const Banner = () => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    }

    return (


        <div className="container mx-auto">
            <Slider {...sliderSettings}>
                {/* Slide 1 */}
                <div className="relative ">
                    <img
                        src="https://i.ibb.co.com/v3HY5Nw/Phuket.jpg"
                        alt="Slide 1"
                        className="w-full h-64 md:h-[400px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className=' text-center bg-black bg-opacity-40 rounded-lg p-5'>
                            <h1 className=' text-center text-xl md:text-3xl font-bold text-white mb-5'>Discover Your Next Adventure with NexTour!</h1>
                            <Link to='/tours' className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 items-center w-40">
                                Lets Go
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative">
                    <img
                        src="https://i.ibb.co.com/L1Z103r/Cameron-Highlands.webp"
                        alt="Slide 2"
                        className="w-full h-64 md:h-[400px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className=' text-center bg-black bg-opacity-40 rounded-lg p-5'>
                            <h1 className=' text-center text-xl md:text-3xl font-bold text-white mb-5'>Make Every Trip an Adventure with NexTour!</h1>
                            <Link to='/tours' className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 items-center w-40">
                                Lets Go
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative">
                    <img
                        src="https://i.ibb.co.com/2qQpww5/Bali3.jpg"
                        alt="Slide 3"
                        className="w-full h-64 md:h-[400px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className=' text-center bg-black bg-opacity-40 rounded-lg p-5'>
                            <h1 className=' text-center text-xl md:text-3xl font-bold text-white mb-5'>Adventure is Calling,Answer with NexTour!</h1>
                            <Link to='/tours' className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 items-center w-40">
                                Lets Go
                            </Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>

    );
};

export default Banner;