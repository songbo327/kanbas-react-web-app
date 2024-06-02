// import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import {Route, Routes, useParams, useLocation} from "react-router";
import Assignments from "./Assignments"
import Grades from "./Grades";
import {FaAlignJustify} from "react-icons/fa";
import AssignmentsEditor from "./Assignments/AssignmentsEditor";
import AssignmentEditor from "./Assignments/AssignmentEditor";

export default function Courses({courses}: { courses: any[]; }) {
    const {cid} = useParams();
    // const course = courses.find((course) => course._id === cid);
    const {pathname} = useLocation();
    const course = courses.find((course) => course._id === cid);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/add" element={<AssignmentEditor/>}/>
                        <Route path="Assignments/:id" element={<AssignmentsEditor/>}/>
                        <Route path="Grades" element={<Grades/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}