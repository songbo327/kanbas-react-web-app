import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as client from "./client";
import {postQuizzesAnswer} from "./client";
import {setCurrentUser} from "../../Account/reducer";
import moment from "moment";

export default function QuizzesPreview() {
    const {qid} = useParams();

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

    const [userAnswer, setUserAnswer] = useState({});
    const [error, setError] = useState("");
    const [totalScore, setTotalScore] = useState(0);
    const [success, setSuccess] = useState(false);
    const [answers, setAnswers] = useState({
        quizzesId: "",
        points: 0,
        created: "",
        userAnswers: [
            {
                questionId: "",
                answer: "",
                points: 0,
                correct: false
            }
        ]
    });

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesById(qid as string);
        setQuizzes(quizzes);

        const answers = await client.findAnswersByQuizzesId(qid as string);
        if (answers) {
            setAnswers(answers);
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await postQuizzesAnswer(qid as string, userAnswer)
            console.log(response);
            setSuccess(true);
            setTotalScore(response.score);
        } catch (err: any) {
            setSuccess(false);
            setError(err.response.data.message);
        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, [qid])

    return (
        <>
            <h2>{quizzes.title}</h2>
            <p>
                {
                    answers?.userAnswers && (
                        <>
                            <b>Started</b> {moment(answers.created).format("MMM Do YYYY, h:mm a")}
                        </>
                    )
                }
            </p>
            <hr/>
            {
                quizzes.questions && quizzes.questions.map((question: any, index: number) => (
                    <div className="card m-4">
                        <div className={"card-header d-flex flex-row justify-content-between"}>
                            <div className="card-title">{question.title} </div>
                            <div>({question.points} pts)</div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{question.description}</p>
                            <hr/>
                            {
                                question.answers && question.answers.map((answer: any, index: number) => (
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name={question._id} value={answer}
                                               onChange={(e) => {
                                                   setUserAnswer({...userAnswer, [e.target.name]: e.target.value})
                                               }}/>
                                        <label className="form-check-label" htmlFor="r3">{answer}</label>
                                    </div>
                                ))
                            }
                            <hr/>
                            <div>
                                <b> Last Answer</b>：
                                {
                                    !answers?.userAnswers ? (<div>No Records</div>) : (<div>
                                            {
                                                answers?.userAnswers && answers?.userAnswers.find((answer: any) => answer.questionId === question._id)?.answer
                                            }

                                            {
                                                answers?.userAnswers && answers.userAnswers.find((answer: any) => answer.questionId === question._id)?.correct ? (
                                                    <span className={'text-success'}> (Correct)</span>
                                                ) : (
                                                    <span className={'text-danger'}> (Error)</span>
                                                )
                                            }
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))
            }
            <hr/>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Total score: {totalScore}</div>}

            <div className="row w-25 m-auto">
                <button className={'btn btn-lg btn-danger'} onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}