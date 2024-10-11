import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {

    const error = useRouteError();
    return (
        <div className=" error-bg bg-cover min-h-screen w-5/6 mx-auto text-center">
            <div className=" pt-60 p-5 min-h-screen bg-white bg-opacity-40 text-orange-500">
                <h2 className=" text-4xl lg:text-6xl font-bold  mb-4"> Sorry, The page you are looking for is not available at the moment. </h2>
                <p className=" my-3"><i>{error.statusText || error.message}</i></p>
                <div>
                    <Link to='/' className=" btn bg-orange-600 text-white border-none rounded-xl font-semibold">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;