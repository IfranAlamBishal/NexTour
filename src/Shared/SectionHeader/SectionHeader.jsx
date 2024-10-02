
const SectionHeader = ({title, description}) => {
    return (
        <div className=" text-center px-5 my-5">
            <hr className=" w-1/3 mx-auto mb-5 border-2 border-orange-400" />
            <h2 className=" text-4xl font-bold mb-3">{title}</h2>
            <div className=" w-80 md:w-[600px] lg:w-[800px] mx-auto">
                <p className=" text-lg font-medium">{description}</p>
            </div>
            <hr className=" w-1/3 mx-auto mt-5 border-2 border-orange-500" />
        </div>
    );
};

export default SectionHeader;