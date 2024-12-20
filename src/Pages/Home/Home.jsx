import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import PopularTours from "./PopularTours/PopularTours";
import WhyNexTour from "./WhyNexTour/WhyNexTour";
import UserReview from "./UserReview/UserReview";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NexTour | Home</title>
            </Helmet>

            <div className=" max-h-[660px] mb-10">
            <Banner></Banner>
            </div>
            <div className=" w-5/6 mx-auto">
                <PopularTours/>
                {/* <UserReview/> */}
                <WhyNexTour/>
            </div>
        </div>
    );
};

export default Home;