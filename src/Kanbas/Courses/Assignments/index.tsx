import AssignmentsControls from "./AssignmentsControls";
import {BsGripVertical} from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import {BiCaretDown, BiEdit} from "react-icons/bi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {useParams} from "react-router";
import {assignments} from "../../Database";

export default function Assignments() {
    const {cid} = useParams();
    const assignmentList = assignments.filter((assignment) => assignment.course === cid);

    return (
        <div id="wd-assignments">
            <AssignmentsControls/>
            <ul id="wd-assignment-list" className="list-group rounded-0 my-4">
                <div className="wd-title p-3 ps-2 bg-secondary mb-4">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BiCaretDown className="me-2"/>
                    Assignments
                    <AssignmentControlButtons/>
                </div>

                {
                    assignmentList && assignmentList.map((item) => (
                        <li className="wd-assignment-list-item list-group-item p-3" style={{borderLeft: "4px solid green"}}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <BsGripVertical className="fs-4"/>
                                </div>
                                <div className="col-auto">
                                    <BiEdit className="text-success fs-4"/>
                                </div>
                                <div className="col">
                                    <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                                       href={`#/Kanbas/Courses/${cid}/Assignments/${item._id}`}>
                                        <h5><b>{item.title}</b></h5>
                                    </a>
                                    <p>
                                        <span className="text-danger"> Multiple Modules </span>
                                        | <b>Not available until</b> {item.available} | <b>Due</b> {item.due} | {item.points} pts
                                    </p>
                                </div>
                                <div className="col float-end">
                                    <LessonControlButtons/>
                                </div>
                            </div>
                        </li>
                    ))

                }
            </ul>
        </div>
    );
}