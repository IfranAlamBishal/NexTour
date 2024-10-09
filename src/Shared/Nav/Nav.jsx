import { Link, NavLink } from "react-router-dom";
import { RiMapPinUserFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Nav = () => {

    const {user, logOut} = useContext(AuthContext);

    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/tours'>Tours</NavLink></li>
        <li><NavLink to='/blogs'>Blog</NavLink></li>
        <li><NavLink to='/contacts'>Contact Us</NavLink></li>
    </>

const handleLogOut = () => {
    logOut()
        .then(() => {
            Swal.fire({
                title: "Logged out!",
                text: "You've successfully logged out.",
                icon: "success"
            });
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: error.massage,
            });
        })
}

    const loginBtn = <>
        {
            user ?
                <div className=" flex flex-col lg:flex-row gap-4 px-5 mt-3 lg:mt-0">
                    {
                        user.photoURL ?
                            <div className="tooltip tooltip-bottom pt-2 pl-2" data-tip={user.email}>
                                <Link to="/" ><img src={user.photoURL} alt="" className="w-8 h-8 my-auto rounded-full " /></Link>
                            </div>
                            :
                            <div className="my-auto pt-2 pl-2 tooltip tooltip-bottom" data-tip={user.email}>
                                <Link to="/" ><FaCircleUser className=" w-8 h-8"/></Link>
                            </div>
                    }
                    <Link to='/' onClick={handleLogOut} className=" btn btn-error text-white text-base font-semibold">Log Out</Link>
                </div>
                :
                <Link to='/login'><RiMapPinUserFill className=" w-10 h-10" /></Link>
        }

    </>
    return (
        <div>
            <div className="navbar bg-white bg-opacity-40 px-10 p-2 h-20 md:h-24 fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                            {loginBtn}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-2xl md:text-3xl lg:text-4xl font-bold gap-0"><span className=" text-orange-500">Nex</span>Tour</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-lg">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end hidden lg:flex">
                    {loginBtn}
                </div>
            </div>
        </div>
    );
};

export default Nav;