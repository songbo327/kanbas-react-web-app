import {createSlice} from "@reduxjs/toolkit";
// import {quizzes} from "../../Database";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuizzes: (state, {payload: quizzes}) => {
            const newItem: any = {
                _id: quizzes._id,
                title: quizzes.title,
                course: quizzes.course,
                description: quizzes.description,
                points: quizzes.points,
                due: quizzes.due,
                available: quizzes.available,
                until: quizzes.until,
            };
            state.quizzes = [...state.quizzes, newItem] as any;
        },

        deleteQuizzes: (state, {payload: quizzesId}) => {
            state.quizzes = state.quizzes.filter((m: any) => m._id !== quizzesId);
        },

        updateQuizzes: (state, {payload: quizzes}) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quizzes._id ? quizzes : m
            ) as any;
        },

        editQuizzes: (state, {payload: quizzesId}) => {
            state.quizzes = state.quizzes.map((m: any) =>
                m._id === quizzesId ? {...m, editing: true} : m
            ) as any;
        },
    },
});

export const {
    addQuizzes,
    deleteQuizzes,
    updateQuizzes,
    editQuizzes,
    setQuizzes
} = quizzesSlice.actions;
export default quizzesSlice.reducer;