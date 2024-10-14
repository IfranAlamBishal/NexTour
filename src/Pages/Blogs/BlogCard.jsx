import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {

    const { _id, user_name, photo, title, description } = blog;
    const shortDes = description.split(" ").slice(0, 30).join(" ") + "...";

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    return (
        <div className=" flex flex-1">
            <div className="card bg-white shadow-xl">
                <figure>
                    <img
                        src={photo}
                        alt="spot"
                        className=" w-full h-64 md:h-96 object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl lg:text-4xl">{title}</h2>
                    <p className=" font-semibold">By: {user_name}</p>
                    <p>{shortDes}</p>

                    <div className="card-actions justify-end">
                        <Link to={`/blogDetails/${_id}`} onClick={scrollUp} className="btn bg-orange-500 text-white">Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;