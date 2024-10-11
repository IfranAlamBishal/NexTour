import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-infinity w-36 text-orange-500"></span>
        </div>
    }

    if (user) {
        return children;
    }

    else{
        return <Navigate to='/login' state={{ from: location }}></Navigate>
    }
};

export default ProtectedRoutes;