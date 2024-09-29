import { Outlet } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";


const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <div className=" w-5/6 mx-auto"> <Outlet></Outlet> </div>
        </div>
    );
};

export default Main;