import axios from "axios";
import exp from "node:constants";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

const axiosWithCredentials = axios.create({withCredentials: true});

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const createQuizzes = async (courseId: string, quizzes: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quizzes);
    return response.data;
};

export const deleteQuizzes = async (quizzesId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizzesId}`);
    return response.data;
};

export const updateQuizzes = async (quizzes: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizzes._id}`, quizzes);
    return response.data;
};

export const findQuizzesById = async (quizzesId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizzesId}`);
    return response.data;
};

export const findQuestionsForQuizzes = async (quizzesId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizzesId}/questions`);
    return response.data;
};

export const createQuestion = async (quizzesId: string, question: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizzesId}/questions`, question);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const updateQuestion = async (question: any) => {
    const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const findQuestionById = async (quizzesId: string) => {
    const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${quizzesId}`);
    return response.data;
};

export const findAnswersByQuizzesId = async (quizzesId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizzesId}/answers`);
    return response.data;
}

export const postQuizzesAnswer = async (quizzesId: string, answer: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizzesId}/answers`, answer);
    return response.data;
}