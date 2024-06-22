import React from "react";

export default function DeleteQuizzes({quizzesId, deleteQuizzes}: {
    quizzesId: string,
    deleteQuizzes: (quizzesId: string) => void
}) {
    return (
        <div id={`wd-delete-quizzes-${quizzesId}-dialog`} className="modal fade" data-bs-backdrop="static"
             data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Quizzes</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Confirm delete quizzes {quizzesId}?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button onClick={() => deleteQuizzes(quizzesId)} type="button" data-bs-dismiss="modal"
                                className="btn btn-danger">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}