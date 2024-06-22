import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as course_api from "../Courses/client";
import * as client from "./client";

export default function MyCourses() {
    const [course, setCourse] = useState<any>({});
    const [courses, setCourses] = useState<any[]>([]);
    const [enrollCourses, setEnrollCourses] = useState<any[]>([]);

    useEffect(() => {
        fetchAllCourses();
        fetchEnrollCourses();
    }, []);

    const fetchAllCourses = async () => {
        const courses = await course_api.fetchAllCourses();
        setCourses(courses);
        if (courses.length > 0) {
            setCourse(courses[0]);
        }
    }

    const fetchEnrollCourses = async () => {
        const enrollCourses = await client.fetchEnrollCourses();
        setEnrollCourses(enrollCourses);
    }

    const addNewCourse = async () => {
        if (!course._id) {
            return;
        }
        await client.createCourse({course: course._id});
        fetchEnrollCourses();
    };

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        fetchEnrollCourses();
    };

    const handleChangeCourse = (e: any) => {
        const courseId = e.target.value;
        const course = courses.find((course) => course._id === courseId);
        setCourse(course);
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">MyCourses</h1>
            <hr/>
            <h5>Enroll Course
                <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse}> Add </button>
                <br/>
                <select className="form-select" value={course._id} onChange={handleChangeCourse}>
                    {courses.map((course) => (
                        <option value={course._id}>{course.name}</option>
                    ))}
                </select>

                <textarea value={course.description} readOnly={true} className="form-control" rows={5}/>
                <hr/>
            </h5>
            <hr/>
            <h2 id="wd-dashboard-published">Enrolled Courses ({enrollCourses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {enrollCourses.map(({_id, course}) => (
                        <div className="wd-dashboard-course col" style={{width: "300px"}}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.cover} height="160" width="100%"/>
                                    <div className="card-body">
                    <span className="wd-dashboard-course-link"
                          style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                      {course.name}
                    </span>
                                        <p className="wd-dashboard-course-title card-text"
                                           style={{maxHeight: 53, overflow: "hidden"}}>
                                            {course.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                              className="btn btn-primary">Go</Link>

                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(_id);
                                        }} className="btn btn-danger float-end"
                                                id="wd-delete-course-click">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
