import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import * as client from "./client";

export default function QuestionEditor({closeEdit, questionData,reloadData}: {
    closeEdit: () => void;
    questionData: any;
    reloadData: () => void;
}) {
    const {cid, qid} = useParams();

    const [question, setQuestion] = useState(questionData);

    // console.log(question)

    useEffect(() => {
        setQuestion(questionData);
    }, [questionData]);

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        setQuestion({...question, [event.target.name]: event.target.value});
    };

    const handleChangeType = (event: { target: { name: string; value: string; }; }) => {
        if (event.target.value === 'Fill in Blanks') {
            setQuestion({...question, [event.target.name]: event.target.value, correctAnswer: '', answers: ['']});
        } else if (event.target.value === 'True/False') {
            setQuestion({
                ...question,
                [event.target.name]: event.target.value,
                correctAnswer: '',
                answers: ['True', 'False']
            });
        } else if (event.target.value === 'Multiple Choice') {
            setQuestion({...question, [event.target.name]: event.target.value, correctAnswer: '', answers: ['', '']});
        }
    };

    const handleSubmit = async () => {
        if (question._id && question._id !== '') {
            await client.updateQuestion(question);
        } else {
            await client.createQuestion(qid as string, question);
        }
        reloadData();
    };

    return (
        <>
            <div className={'row flex-row justify-content-around'}>
                <div className="w-50">
                    <select id={"wd-assignment-group"} className="form-select" name="type"
                            value={question?.type || "Multiple Choice"}
                            onChange={handleChangeType}>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in Blanks">Fill in Blanks</option>
                    </select>
                </div>

                <div className="w-50">
                    <div className="row w-100 flex-row">
                        <div className="col">
                            <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                        </div>
                        <div className="col">
                            <input id="wd-points" type="number" className="form-control" name="points"
                                   onChange={handleChange} value={question?.points}/>
                        </div>
                    </div>

                </div>

                <div className="row input-group mt-2 mb-2">
                    <label htmlFor="wd-name" className="form-label">Title</label>
                    <input id="wd-name" className="form-control" placeholder={"Enter question title"}
                           name="title" value={question?.title}
                           onChange={handleChange}/>
                </div>

                <div className="row input-group mt-2 mb-2">
                    <label htmlFor="wd-question-description" className="form-label">Description</label>
                    <textarea id="wd-question-description" className="form-control"
                              placeholder={"Enter question description"}
                              rows={10} cols={60} name="description"
                              onChange={handleChange} defaultValue={question?.description}
                              value={question?.description}>
                        </textarea>
                </div>

                <div className="row input-group mt-2 mb-2">
                    <>
                        <label htmlFor="wd-question-description" className="form-label">
                            Answer
                            {
                                question.type !== 'True/False' && (
                                    <button className={'btn btn-success ms-2'} onClick={() => {
                                        setQuestion({
                                            ...question,
                                            answers: [...question.answers, '']
                                        })
                                    }}>+ Add Answer</button>
                                )
                            }

                        </label>

                        {
                            question.answers && question.answers.map((answer: any, index: number) => (
                                <div className='row w-100 m-2 flex-row align-items-center'>
                                    <div className='w-25 text-end'>
                                        Possible Answer
                                    </div>
                                    <div className='w-50'>
                                        <input id="wd-name" className="form-control" placeholder="Enter Possible Answer"
                                               name="title" value={answer} readOnly={question.type === 'True/False'}
                                               onChange={
                                                   (event) => {
                                                       const answers = [...question.answers];
                                                       answers[index] = event.target.value;
                                                       setQuestion({
                                                           ...question,
                                                           answers: answers
                                                       })
                                                   }
                                               }/>
                                    </div>
                                    <div className='w-25'>
                                        {
                                            question.type !== 'True/False' && (
                                                <button className={'btn btn-danger'} onClick={() => {
                                                    const answers = [...question.answers];
                                                    answers.splice(index, 1);
                                                    setQuestion({
                                                        ...question,
                                                        answers: answers
                                                    })
                                                }}>Delete
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </>
                </div>

                <div className="row input-group mt-2 mb-2">
                    <label htmlFor="wd-question-description" className="form-label">Correct Answer</label>

                    {
                        question.type === 'True/False' ? (
                            <select className="form-select" name="correctAnswer" value={question?.correctAnswer}
                                    onChange={handleChange}>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select>
                        ) : (
                            <input id="wd-name" className="form-control" placeholder={"Enter Correct Answer"}
                                   name="correctAnswer" value={question?.correctAnswer}
                                   onChange={handleChange}/>
                        )
                    }
                </div>
            </div>

            <div className="mb-2">
                <button className="btn btn-danger float-end ms-2" onClick={handleSubmit}>Save</button>
                <button className="btn btn-secondary float-end" onClick={closeEdit}>Cancel</button>
            </div>

            <div className="row" style={{height: '30px', width: '100%'}}></div>
        </>
    )
}