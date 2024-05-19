import GreenCheckmark from "./GreenCheckmark";
import {BsPlus} from "react-icons/bs";

export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark/>
            <BsPlus className="fs-4"/>
        </div>
    );
}