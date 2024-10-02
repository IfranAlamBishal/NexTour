import Banner from "./Banner/Banner";
import PopularTours from "./PopularTours/PopularTours";
import WhyNexTour from "./WhyNexTour/WhyNexTour";


const Home = () => {
    return (
        <div>
            <div className=" max-h-[660px] mb-10">
            <Banner></Banner>
            </div>
            <div className=" w-5/6 mx-auto">
                <PopularTours/>
                <WhyNexTour/>
            </div>
        </div>
    );
};

export default Home;