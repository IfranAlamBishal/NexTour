import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    const dashLinks = <ul className=" menu px-1 space-y-2 max-w-56">
        <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
        </ul>


    return (
        <div className=" flex flex-col md:flex-row gap-10">
            <div className=" md:w-64 lg:w-72  md:min-h-screen p-5 bg-gray-500 text-white">
                <Link to='/' className="btn btn-ghost text-xl md:text-2xl font-bold text-left h-[60px] md:h-[68px] mb-4">
                    <h2 className=" ">Learn <br />Together</h2>
                </Link>
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