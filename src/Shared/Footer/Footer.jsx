
import { FaPhone } from "react-icons/fa6";
import fb from '../../assets/icon/fb-icon.png'
import x from '../../assets/icon/x-icon.png'
import insta from '../../assets/icon/instagram.png'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-neutral text-neutral-content p-10">
                <aside>
                    <p className=" text-5xl font-bold">
                        NexTour Ltd.
                    </p>
                    <p>
                    House 12, Road 75, Block C, Gulshan-2, <br />
                     Dhaka 1212, Bangladesh
                    </p>
                    <p>
                    <FaPhone className=" inline mr-2"/> <span>+88 01830 000000</span>
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Find Us</h6>
                    <div className="grid grid-flow-col gap-4">
                        <Link to='https://www.facebook.com/'>
                            <img src={fb} alt="facebook" className=" bg-white rounded-full w-8 h-8 p-1"/>
                        </Link>
                        <Link to='https://x.com/'>
                            <img src={x} alt="x" className=" bg-white rounded-full w-8 h-8 p-0.5"/>
                        </Link>
                        <Link to='https://www.instagram.com/'>
                            <img src={insta} alt="instagram" className=" bg-white rounded-full w-8 h-8 p-0.5"/>
                        </Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;