import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = data => {
        console.log(data)

    };

    return (
        <div>
            <Helmet>
                <title>NexTour | Register</title>
            </Helmet>

            <div className="hero min-h-screen bg-orange-500 pt-32 pb-14">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                    <div className="text-center lg:text-left text-white">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6 font-semibold">Join NexTour today and unlock a world of extraordinary travel experiences.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white text-black">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} placeholder="name" className="input input-bordered bg-white text-black" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile picture</span>
                                </label>
                                <input type="url" {...register("photo")} placeholder="photo" className="input input-bordered bg-white text-black" required />
                            </div>
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
                                <p className=" text-base font-medium">Already have an account ? <Link to="/login" className=" text-blue-600">Log in now</Link> and start your journey with us!</p>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn bg-orange-500 text-white" value='Register'></input>
                            </div>
                        </form>
                        <div className=" px-8  mb-8 space-y-8">
                            <button className="btn bg-orange-500 text-white w-full">Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;