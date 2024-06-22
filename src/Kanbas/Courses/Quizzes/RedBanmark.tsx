import {FaCircle} from "react-icons/fa";
import {IoBanSharp} from "react-icons/io5";

export default function RedBanmark() {
    return (
        <span className="me-1 position-relative">
            <IoBanSharp style={{top: "2px"}} className='text-danger me-1 position-absolute fs-5'/>
           <FaCircle className="text-white me-1 fs-6"/>
        </span>
    );
}