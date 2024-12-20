import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import useUserData from "../../Hooks/useUserData";
import useBlockedUser from "../../Hooks/useBlockedUser";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { logIn, logOut, googleLogIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    const [users] = useUserData();
    const blockedUsers = useBlockedUser();

    const forgotPassword = () => {
        Swal.fire({
            icon: "error",
            title: "Not available!",
            text: "This feature is not available yet!",
        });
    }

    const onSubmit = data => {
        if (blockedUsers) {
            logIn(data.email, data.password)
                .then((userCredential) => {

                    const blocked = blockedUsers.find(user => user.email == userCredential.user.email);

                    if (blocked) {
                        logOut();
                        Swal.fire({
                            icon: "error",
                            title: "Blocked !",
                            text: "Your account has been blocked. Please contact us to recover your account.",
                        });
                    }
                    else {
                        const checkUser = userCredential.user;

                        if (checkUser.emailVerified) {
                            const alreadyUser = users.filter(user => user.email == checkUser.email)

                            if (alreadyUser.length == 0) {
                                const user = {
                                    name: checkUser.displayName,
                                    email: checkUser.email,
                                    role: 'user'
                                }
                                axiosSecure.post('/register', user)
                                    .then()
                            }
                            Swal.fire({
                                icon: "success",
                                title: "Logged in!",
                                text: "You have successfully logged in!",
                            });
                            navigate('/');
                        }

                        else {
                            logOut();
                            Swal.fire({
                                icon: "error",
                                title: "Not verified !",
                                text: "Please verify your email first",
                            });
                        }
                    }

                })

                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: error.message,
                    });

                })
        }

    };

    const handleGoogleLogIn = () => {
        if (blockedUsers) {
            googleLogIn()
                .then((result) => {

                    const blocked = blockedUsers.find(user => user.email == result.user.email);

                    if (blocked) {
                        logOut();
                        Swal.fire({
                            icon: "error",
                            title: "Blocked !",
                            text: "Your account has been blocked. Please contact us to recover your account.",
                        });
                    }
                    else {
                        const alreadyUser = users.filter(user => user.email == result.user.email);
                        if (alreadyUser.length == 0) {
                            const user = {
                                name: result.user.displayName,
                                email: result.user.email,
                                role: 'user'
                            }
                            axiosSecure.post('/register', user)
                                .then()
                        }

                        Swal.fire({
                            icon: "success",
                            title: "Logged in!",
                            text: "You have successfully logged in!",
                        });

                        navigate('/')
                    }

                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: error.message,
                    });
                })
        }
    };


    return (
        <div>
            <Helmet>
                <title>NexTour | Log in</title>
            </Helmet>

            <div className="hero min-h-screen bg-orange-500 pt-32 pb-14">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="text-center lg:text-left text-white">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 font-semibold">Log in and continue your journey to unforgettable destinations with NexTour.</p>
                    </div>
                    <div className="card shrink-0 w-80 mx-auto md:max-w-sm shadow-2xl bg-white text-black">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered bg-white text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} {...register("password", {
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                })} placeholder="password" className="input input-bordered bg-white text-black" required />
                                <div onClick={() => setShowPassword(!showPassword)} className=" text-lg text-orange-500 flex justify-end p-1">
                                    {
                                        showPassword ?
                                            <Link><FaEye className=" w-6 h-6" /></Link>
                                            :
                                            <Link><FaEyeSlash className=" w-6 h-6" /></Link>
                                    }
                                </div>
                                {errors.password && <span className=" text-xs text-red-600 mt-1">Password must have at least 6 characters including at least a upper case(A-Z) and a lower case(a-z) letter.</span>}
                                <label className="label">
                                    <Link onClick={() => forgotPassword()} className="label-text-alt text-blue-600">Forgot password?</Link>
                                </label>
                                <p className=" text-base font-medium">New here ? <Link to="/registed" className=" text-blue-600">Register now</Link> and start your journey with us!</p>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn bg-orange-500 text-white" value='Login'></input>
                            </div>
                        </form>
                        <div className=" px-8  mb-8 space-y-8">
                            <button onClick={handleGoogleLogIn} className="btn bg-orange-500 text-white w-full"><FcGoogle className=" text-2xl" />Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;