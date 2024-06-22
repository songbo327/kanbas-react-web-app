import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}: { children: any }) {
    // console.log(children)
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    // console.log(currentUser)
    if (currentUser?.role === "FACULTY") {
        return children[0];
    } else if (currentUser?.role === "STUDENT") {
        return children[1];
    } else {
        return <Navigate to="/Kanbas/Account/Signin"/>;
    }
}
