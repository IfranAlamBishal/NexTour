import { Link, NavLink } from "react-router-dom";
import { RiMapPinUserFill } from "react-icons/ri";

const Nav = () => {

    const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/tours'>Tours</NavLink></li>
    <li><NavLink to='/blogs'>Blog</NavLink></li>
    <li><NavLink to='/contacts'>Contact Us</NavLink></li>
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
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl md:text-2xl lg:text-4xl font-bold">NexTour</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-lg">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link><RiMapPinUserFill className=" w-10 h-10"/></Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;