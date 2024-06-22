import QuizzesControls from "./QuizzesControls";
import {BsGripVertical} from "react-icons/bs";
import {BiCaretDown} from "react-icons/bi";
import LessonControlButtons from "./LessionControlButtons";
import {useParams} from "react-router";
import {deleteQuizzes, setQuizzes} from "./reducer";
import {useSelector, useDispatch} from "react-redux";
import * as client from "./client";
import {useEffect} from "react";
import moment from 'moment';
import {IoRocketOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

export default function Quizzes() {
    const {cid} = useParams();
    const router = useNavigate();
    const {quizzes} = useSelector((state: any) => state.quizzesReducer);
    const cidQuizzes = quizzes.filter((quizzes: any) => quizzes.course === cid);
    const dispatch = useDispatch();

    const {currentUser} = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

    const removeQuizzes = async (moduleId: string) => {
        await client.deleteQuizzes(moduleId);
        dispatch(deleteQuizzes(moduleId));
    };

    const setPublished = async (quizzesId: string, published: boolean) => {
        await client.updateQuizzes({
            _id: quizzesId,
            publish: published
        });
        fetchQuizzes();
    };

    const handleAvailable = (item: any) => {
        // Available - if current date is between Available Date and Available Until Date
        // Not available until <AVAILABLE DATE> - if current date is before the Available Date
        // Closed - if current date is after quizzes Available Date
        if (moment(item.available).isAfter(moment())) {
            return "Not available until " + moment(item.available).format("MMM Do YYYY, h:mm a");
        } else if (moment(item.available).isBefore(moment()) && moment(item.until).isAfter(moment())) {
            return "Available";
        } else {
            return "Closed";
        }
    }

    const handleClickItem = (quizzes: any) => {
        const url = `/Kanbas/Courses/${cid}/Quizzes/Detail/${quizzes._id}`
        if (currentUser && currentUser.role === "STUDENT") {
            if (handleAvailable(quizzes) == "Available") {
                router(url)
            } else if (handleAvailable(quizzes) == "Closed") {
                alert("Quizzes is closed");
            } else {
                alert("Quizzes is not available yet");
            }
        } else {
            router(url)
        }
    }

    return (
        <div id="wd-quizzess">
            {
                currentUser && currentUser.role === "FACULTY" && (
                    <QuizzesControls/>
                )
            }

            <ul id="wd-quizzes-list" className="list-group rounded-0 my-4">
                <div className="wd-title p-3 ps-2 bg-secondary mb-4">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BiCaretDown className="me-2"/>
                    Assignments Quizzes
                </div>

                {
                    cidQuizzes.length === 0 && (
                        <span>
                            Click on the "+Quiz" button to add a new Quizzes.
                        </span>
                    )
                }

                {
                    cidQuizzes && cidQuizzes.map((item: any) => (
                        <li className="wd-quizzes-list-item list-group-item p-3"
                            style={{borderLeft: "4px solid green", cursor: "pointer"}} key={item._id}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <IoRocketOutline className="text-success fs-4"/>
                                </div>
                                <div className="col">
                                    <p className="wd-quizzes-link text-dark link-underline link-underline-opacity-0">
                                        <h5 onClick={(e) => {
                                            handleClickItem(item)
                                        }}><b>{item.title}</b></h5>
                                    </p>
                                    <p>
                                        <b> {handleAvailable(item)} </b>
                                        | <b>Due</b> {moment(item.available).format("MMM D[ at ]ha")}
                                        | {item?.points} pts
                                        | {item?.questions?.length || 0} Questions
                                    </p>
                                </div>
                                <div className="col float-end">
                                    <LessonControlButtons quizzesId={item._id} deleteQuizzes={(quizzesId) => {
                                        removeQuizzes(quizzesId)
                                    }} published={item?.publish} setPublished={setPublished}/>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}