import React from "react";
import {FaPlus} from "react-icons/fa6";
import {Link, useNavigate, useParams} from "react-router-dom";
import {createQuizzes} from "./client";

export default function QuizzesControls() {
    const {cid} = useParams();
    const router = useNavigate();

    const addQuizzes = async () => {
        const response = await createQuizzes(cid as string, {
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
        console.log(response)
        if (response) {
            router(`/Kanbas/Courses/${cid}/Quizzes/Detail/${response._id}`)
        }
    }

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <div className="row">
                <div className="col">
                    <div id="wd-search-assignment">
                        <input id="wd-search-assignment-input" type="text" placeholder="Search..."
                               className="form-control"/>
                    </div>
                </div>
                <div className="col">
                    <button id="wd-add-assignment-btn" onClick={addQuizzes}
                            className="btn btn-lg btn-danger me-1 float-end">
                        <FaPlus className="position-relative me-2" style={{bottom: "1px"}}/>
                        Quiz
                    </button>
                </div>
            </div>
        </div>
    )
}