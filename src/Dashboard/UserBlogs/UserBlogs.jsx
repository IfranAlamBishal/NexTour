import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const UserBlogs = () => {
    const { user, } = useContext(AuthContext);

    if (user) {
        return (
            <div>
                <Helmet>
                    <title>NexTour | My Blogs</title>
                </Helmet>

                <div>
                    <SectionHeader
                        title='My Blogs'
                    ></SectionHeader>

                    <h1 className=" text-4xl font-semibold text-orange-500 text-center my-40"> Nothing is on your blog list</h1>
                </div>
            </div>
        );
    }
};

export default UserBlogs;