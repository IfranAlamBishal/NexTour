import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    const dashLinks = <ul className=" menu px-1 space-y-2 max-w-56 text-lg font-medium">
        <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
        <li><NavLink to='/dashboard/wishlist'>Wishlist</NavLink></li>
        <li><NavLink to='/dashboard/bookedTours'>Booked</NavLink></li>
        <li><NavLink to='/dashboard/user_reviews'>My Reviews</NavLink></li>
        <li><NavLink to='/dashboard/user_blogs'>My Blogs</NavLink></li>
    </ul>


    return (
        <div className=" flex flex-col md:flex-row gap-10">
            <div className=" md:w-64 lg:w-72  md:min-h-screen p-5 bg-orange-500 text-white">
                <Link to='/' className="btn text-2xl md:text-3xl lg:text-4xl font-bold gap-0 mb-5"><span className=" text-orange-500">Nex</span>Tour</Link>
                {dashLinks}
                <hr className=" w-2/3 mx-auto my-5 border-2 border-black" />
                <Link to='/'>Home</Link>
            </div>
            <div className=" flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;