import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as client from "./client";
import {BiEdit} from "react-icons/bi";
import moment from "moment/moment";
import {IoEllipsisVertical} from "react-icons/io5";
import DeleteQuizzes from "./DeleteQuizzes";

export default function QuizzesDetail() {

    const {cid, qid} = useParams();
    const {pathname} = useLocation();

    const dispatch = useDispatch();
    const router = useNavigate();
    const {currentUser} = useSelector((state: any) => state.accountReducer);

    const quizzesId = pathname.split("/").pop();

    const [quizzes, setQuizzes] = useState({
        _id: "",
        course: "",
        title: "New Quizzes",
        type: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: false,
        timeLimit: 20,
        multipleAttempts: false,
        manysAttempts: 1,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtTime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        publish: false,
        questions: [],
        available: Date.now(),
        due: Date.now(),
        until: Date.now()
    });

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesById(quizzesId as string);
        setQuizzes(quizzes);
    }

    useEffect(() => {
        fetchQuizzes();
    }, [qid])

    return (
        <div id="wd-quizzess-detail">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="w-auto text-center">
                        {
                            currentUser && currentUser.role === "FACULTY" && (
                                <>
                                    <Link id="wd-edit-quizzes-btn" to={`/Kanbas/Courses/${cid}/Quizzes/Edit/${quizzesId}`}
                                          className="btn btn-lg btn-secondary me-1 float-end">
                                        <BiEdit className="position-relative me-2" style={{bottom: "1px"}}/>
                                        Edit
                                    </Link>
                                    <Link id="wd-preview-quizzes-btn"
                                          to={`/Kanbas/Courses/${cid}/Quizzes/Preview/${quizzesId}`}
                                          className="btn btn-lg me-1 btn-secondary float-end">
                                        Preview
                                    </Link>
                                </>
                            )
                        }

                        <Link id="wd-preview-quizzes-btn" to={`/Kanbas/Courses/${cid}/Quizzes/Preview/${quizzesId}`}
                              className="btn btn-lg me-1 btn-secondary float-end">
                            Start Quiz
                        </Link>
                    </div>
                </div>

                <div className={"row mt-4"}>
                    <hr/>
                </div>

                <div className="row justify-content-center">
                    <div>
                        <h1>{quizzes?.title}</h1>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Quiz Type</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.type}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Points</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.points}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Assignment Group</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.assignmentGroup}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Shuffle Answers</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.shuffleAnswers ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Time Limit</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.timeLimit} Minutes
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Multiple Attempts</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.multipleAttempts ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>How Many Attempts</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.manysAttempts}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Show Correct Answers</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.showCorrectAnswers ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Access Code</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.accessCode || "None"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>One Question at a Time</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.oneQuestionAtTime ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Webcam Required</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.webcamRequired ? "Yes" : "No"}
                        </div>
                    </div>

                    <div className={"row justify-content-center flex-row"}>
                        <div className={"w-25 text-end"}>
                            <b>Lock Questions After Answering</b>
                        </div>
                        <div className={"w-25 text-start"}>
                            {quizzes?.lockQuestionsAfterAnswering ? "Yes" : "No"}
                        </div>
                    </div>
                </div>

                <hr/>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available from</th>
                        <th>Until</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{moment(quizzes.due).format("MMM D[ at ]ha")}</td>
                        <td>EveryOne</td>
                        <td>{moment(quizzes.available).format("MMM D[ at ]ha")}</td>
                        <td>{moment(quizzes.until).format("MMM D[ at ]ha")}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}