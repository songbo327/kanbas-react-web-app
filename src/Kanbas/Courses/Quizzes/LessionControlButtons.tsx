import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import DeleteQuizzes from "./DeleteQuizzes";
import {useParams} from "react-router";
import RedBanmark from "./RedBanmark";
import {useSelector} from "react-redux";

export default function LessonControlButtons({quizzesId, deleteQuizzes, published, setPublished}: {
    quizzesId: string; deleteQuizzes: (quizzesId: string) => void;
    published: boolean;
    setPublished: (quizzesId: string, published: boolean) => void;
}) {
    const {cid} = useParams();

    const {currentUser} = useSelector((state: any) => state.accountReducer);

    const handleTogglePublishQuizzes = () => {
        setPublished(quizzesId, !published);
    };

    return (
        <div className="float-end d-flex align-items-center">
            {
                published ? <GreenCheckmark/> : <RedBanmark/>
            }

            {
                currentUser && currentUser.role === "FACULTY" && (
                    <>
                        <IoEllipsisVertical className="fs-4 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"/>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item"
                                   href={`#/Kanbas/Courses/${cid}/Quizzes/Detail/${quizzesId}`}>Edit</a></li>
                            <li>
                                <button className="dropdown-item" data-bs-toggle="modal"
                                        data-bs-target={`#wd-delete-quizzes-${quizzesId}-dialog`}>Delete
                                </button>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={handleTogglePublishQuizzes}>
                                    {published ? "Unpublish" : "Publish"}
                                </a>
                            </li>
                            {/*<li><a className="dropdown-item" href="#">Copy</a></li>*/}
                            {/*<li><a className="dropdown-item" href="#">Sort</a></li>*/}
                        </ul>
                        <DeleteQuizzes quizzesId={quizzesId} deleteQuizzes={deleteQuizzes}/>
                    </>
                )
            }
        </div>
    );
}