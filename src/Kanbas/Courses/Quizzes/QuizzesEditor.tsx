import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateQuizzes} from "./reducer";
import * as client from "./client";
import moment from "moment/moment";
import QuestionEditor from "./QuestionEditor";
import _ from "lodash";

export default function QuizzesEditor() {
    const {cid, qid} = useParams();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const router = useNavigate();

    const aid = pathname.split("/").pop();

    const {quizzes} = useSelector((state: any) => state.quizzesReducer);
    const curQuizzes = quizzes.find((item: any) => item._id === aid);

    const [quizz, setQuizz] = useState({
        ...curQuizzes
    });

    const [edit, setEdit] = useState(false);

    const [questionData, setQuestionData] = useState({});

    useEffect(() => {
        fetchQuizzes();
    }, [])

    const fetchQuizzes = async () => {
        const quizze = await client.findQuizzesById(aid as string);
        setQuizz(quizze)
    };

    const handleChange = (e: any) => {
        const value = e.target.value;
        setQuizz({...quizz, [e.target.name]: value});
    };

    const saveModule = async (quizzes: any) => {
        const status = await client.updateQuizzes(quizzes);
        dispatch(updateQuizzes(quizzes));
    };

    const handleUpdateQuizzes = () => {
        let newQuizz = {
            ...quizz
        }
        delete newQuizz.questions;
        saveModule(newQuizz)
        // fetchQuizzes();
        router(`/Kanbas/Courses/${cid}/Quizzes/Detail/${newQuizz._id}`);
    }

    const handlePublicSaveQuizzes = () => {
        let newQuizz = {
            ...quizz
        }
        delete newQuizz.questions;
        saveModule({...newQuizz, publish: true})
        // fetchQuizzes();
        router(`/Kanbas/Courses/${cid}/Quizzes`);
    }

    const closeEdit = () => {
        setEdit(false);
    }

    const editQuestion = (question: any) => {
        setEdit(true);
        setQuestionData(question)
    }

    const deleteQuestion = async (questionId: any) => {
        const status = await client.deleteQuestion(questionId);
        fetchQuizzes();
    }

    const addQuestion = async () => {
        setEdit(true);
        setQuestionData({
            _id: '',
            quizzesId: qid,
            title: '',
            type: 'Multiple Choice',
            description: '',
            points: 0,
            answers: ['', ''],
            correctAnswer: ''
        })
    }

    return (
        <div id="wd-quizzess-editor">
            <div className="container">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                aria-selected="true">Details
                        </button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                aria-selected="false">Questions
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                         aria-labelledby="nav-home-tab" tabIndex={0}>

                        <div className="row input-group mt-2 mb-2">
                            <label htmlFor="wd-name" className="form-label">Quizzes Title</label>
                            <input id="wd-name" className="form-control" placeholder={"Enter Quizzes title"}
                                   name="title" value={quizz?.title}
                                   onChange={handleChange}/>
                        </div>

                        <div className="row input-group mb-2">
                      <textarea id="wd-description" className="form-control" placeholder={"Enter Quizzes description"}
                                rows={10} cols={60} name="description"
                                onChange={handleChange} defaultValue={quizz?.description} value={quizz?.description}>
                        </textarea>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-points" className="col-form-label float-end">Quiz Type</label>
                            </div>
                            <div className="col">
                                <select className="form-select" name="type" value={quizz?.type} onChange={handleChange}>
                                    <option value="Graded Quiz">Graded Quiz</option>
                                    <option value="Practice Quiz">Practice Quiz</option>
                                    <option value="Graded Survey">Graded Survey</option>
                                    <option value="Ungraded Survey"> Ungraded Survey</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                            </div>
                            <div className="col">
                                <input id="wd-points" type="number" className="form-control" name="points"
                                       onChange={handleChange} value={quizz?.points}/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-assignment-group" className="col-form-label float-end">Assignment
                                    Group</label>
                            </div>
                            <div className="col">
                                <select id={"wd-assignment-group"} className="form-select" name="assignmentGroup"
                                        value={quizz?.assignmentGroup}
                                        onChange={handleChange}>
                                    <option value="Quizzes">Quizzes</option>
                                    <option value="Exams">Exams</option>
                                    <option value="Assignments">Assignments</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-points" className="col-form-label float-end">Shuffle Answers</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input type="checkbox" name="shuffleAnswers" checked={quizz?.shuffleAnswers}
                                           onChange={() => {
                                               setQuizz({...quizz, shuffleAnswers: !quizz?.shuffleAnswers})
                                           }}/>
                                    {quizz?.shuffleAnswers ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-timeLimit" className="col-form-label float-end">Time Limit</label>
                            </div>
                            <div className="col">
                                <input id="wd-timeLimit" className="form-control" placeholder={"Enter time limit"}
                                       name="timeLimit" value={quizz?.timeLimit || 20}
                                       onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-multiple-attempts" className="col-form-label float-end">Multiple
                                    Attempts</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input type="checkbox" name="multipleAttempts" checked={quizz?.multipleAttempts}
                                           onChange={() => {
                                               setQuizz({...quizz, multipleAttempts: !quizz?.multipleAttempts})
                                           }}/>
                                    {quizz?.multipleAttempts ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        {
                            quizz.multipleAttempts && (
                                <div className="row mb-2">
                                    <div className="col-3">
                                        <label htmlFor="wd-multiple-attempts" className="col-form-label float-end">How Many
                                            Attempts</label>
                                    </div>
                                    <div className="col">
                                        <label className="form-control">
                                            <input type="number" name="manysAttempts" value={quizz?.manysAttempts}
                                                   onChange={(e) => {
                                                       setQuizz({...quizz, manysAttempts: e.target.value})
                                                   }}/>
                                        </label>
                                    </div>
                                </div>
                            )
                        }

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-show-answer" className="col-form-label float-end">Show Correct
                                    Answers</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input id="wd-show-answer" type="checkbox" name="showCorrectAnswers"
                                           checked={quizz?.showCorrectAnswers}
                                           onChange={() => {
                                               setQuizz({...quizz, showCorrectAnswers: !quizz?.showCorrectAnswers})
                                           }}/>
                                    {quizz?.showCorrectAnswers ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-access-code" className="col-form-label float-end">Access Code</label>
                            </div>
                            <div className="col">
                                <input id="wd-access-code" className="form-control" placeholder={"Enter access code"}
                                       name="accessCode" value={quizz?.accessCode || ''}
                                       onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-oneQuestionAtTime" className="col-form-label float-end">One Question
                                    at a Time</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input id="wd-oneQuestionAtTime" type="checkbox" name="oneQuestionAtTime"
                                           checked={quizz?.oneQuestionAtTime}
                                           onChange={() => {
                                               setQuizz({...quizz, oneQuestionAtTime: !quizz?.oneQuestionAtTime})
                                           }}/>
                                    {quizz?.oneQuestionAtTime ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-webcamRequired" className="col-form-label float-end">Webcam
                                    Required</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input id="wd-webcamRequired" type="checkbox" name="webcamRequired"
                                           checked={quizz?.webcamRequired}
                                           onChange={() => {
                                               setQuizz({...quizz, webcamRequired: !quizz?.webcamRequired})
                                           }}/>
                                    {quizz?.webcamRequired ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-lockQuestionsAfterAnswering" className="col-form-label float-end">Lock
                                    Questions After Answering</label>
                            </div>
                            <div className="col">
                                <label className="form-control">
                                    <input id="wd-lockQuestionsAfterAnswering" type="checkbox"
                                           name="lockQuestionsAfterAnswering"
                                           checked={quizz?.lockQuestionsAfterAnswering}
                                           onChange={() => {
                                               setQuizz({
                                                   ...quizz,
                                                   lockQuestionsAfterAnswering: !quizz?.lockQuestionsAfterAnswering
                                               })
                                           }}/>
                                    {quizz?.lockQuestionsAfterAnswering ? " Yes" : " No"}
                                </label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-3">
                                <label htmlFor="wd-assign" className="col-form-label float-end">Assign</label>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row mt-4">
                                            <label htmlFor="wd-due-date"><b>Due</b></label>
                                            <input id="wd-due-date" type="date" className="form-control"
                                                   value={moment(quizz?.due).format("YYYY-MM-DD")}
                                                   onChange={handleChange} name="due"/>
                                        </div>
                                        <div className="row my-2">
                                            <div className="col">
                                                <label htmlFor="wd-available-from"><b>Available from</b></label>
                                                <input id="wd-available-from" type="date" className="form-control"
                                                       value={moment(quizz?.available).format("YYYY-MM-DD")}
                                                       onChange={handleChange}
                                                       name="available"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="wd-available-until"><b>Until</b></label>
                                                <input id="wd-available-until" type="date" className="form-control"
                                                       onChange={handleChange} name="until"
                                                       value={moment(quizz.until).format("YYYY-MM-DD")}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <hr/>
                        </div>

                        <div className="mb-2">
                            <input type="button" className="btn btn-danger float-end ms-2" value="Save"
                                   onClick={handleUpdateQuizzes}/>
                            <input type="button" className="btn btn-secondary float-end ms-2" value="Save & Publish"
                                   onClick={handlePublicSaveQuizzes}/>
                            <Link key={'cancel'} to={`/Kanbas/Courses/${cid}/Quizzes`}>
                                <input type="button" className="btn btn-secondary float-end" value="Cancel"/>
                            </Link>
                        </div>

                        <div className="row" style={{height: '30px', width: '100%'}}></div>

                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                         tabIndex={1}>

                        <div className={'row w-25 m-auto mt-4'}>
                            <input type="button" className="btn btn-secondary float-end" value="+ New Question"
                                   onClick={() => {
                                       addQuestion()
                                   }}/>
                        </div>

                        <hr/>

                        <div className={'row w-25 m-auto mt-4 justify-content-center'}>
                            Points: {_.sumBy(quizz?.questions, 'points')} pts
                        </div>


                        {
                            !quizz?.questions?.length && (
                                <div className={'row w-25 m-auto mt-4 text-center justify-content-center'}>
                                    No Questions yet
                                </div>
                            )
                        }

                        {
                            quizz?.questions && quizz?.questions.map((question: any, index: number) => (
                                <>
                                    <div className={'row w-50 m-auto mt-4 flex-row align-items-center'}>
                                        <div className={'w-50'}>
                                            Q{index + 1}. {question.title} - {question.points}pts
                                        </div>
                                        <div className={'w-50 d-flex flex-row justify-content-start gap-2'}>
                                            <div>
                                                <button className={'btn btn-sm btn-warning'} onClick={(e) => {
                                                    editQuestion(question)
                                                }}>Edit
                                                </button>
                                            </div>
                                            <div>
                                                <button className={'btn btn-sm btn-danger'}
                                                        onClick={(e) => {
                                                            deleteQuestion(question._id)
                                                        }}>Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }

                        <hr/>

                        {
                            edit && (
                                <div className={'row w-50 m-auto'}>
                                    <QuestionEditor closeEdit={closeEdit} questionData={questionData}
                                                    reloadData={fetchQuizzes}/>
                                    <hr/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}