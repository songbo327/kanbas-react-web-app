import React from "react";
import "./index.css";
import {useLocation} from "react-router";


export default function CoursesNavigation() {
    const {pathname} = useLocation();
    const active = 'active';
    const inactive = 'text-danger';

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Home"
               className={`list-group-item border border-0 ${pathname.includes("Home") ? active : inactive}`}>Home</a>

            <a id="wd-course-modules-link" href="#/Kanbas/Courses/1234/Modules"
               className={`list-group-item border border-0 ${pathname.includes("Modules") ? active : inactive}`}>Modules</a>

            <a id="wd-course-piazza-link" href="#/Kanbas/Courses/1234/Piazza"
               className={`list-group-item border border-0 ${pathname.includes("Piazza") ? active : inactive}`}>Piazza</a>

            <a id="wd-course-zoom-link" href="#/Kanbas/Courses/1234/Zoom"
               className={`list-group-item border border-0 ${pathname.includes("Zoom") ? active : inactive}`}>Zoom</a>

            <a id="wd-course-quizzes-link" href="#/Kanbas/Courses/1234/Assignments"
               className={`list-group-item border border-0 ${pathname.includes("Assignments") ? active : inactive}`}>Assignments</a>

            <a id="wd-course-assignments-link" href="#/Kanbas/Courses/1234/Quizzes"
               className={`list-group-item border border-0 ${pathname.includes("Quizzes") ? active : inactive}`}>Quizzes</a>

            <a id="wd-course-grades-link" href="#/Kanbas/Courses/1234/Grades"
               className={`list-group-item border border-0 ${pathname.includes("Grades") ? active : inactive}`}>Grades</a>
        </div>
    );
}