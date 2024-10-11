import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Wishlist = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="flex justify-center">
            <Helmet>
                <title>NexTour | Wishlist</title>
            </Helmet>
            <span className="loading loading-infinity w-36 text-orange-500"></span>
        </div>
    }

    if(user){
        <h1 className="flex justify-center">Found User</h1>
    }
};

export default Wishlist;