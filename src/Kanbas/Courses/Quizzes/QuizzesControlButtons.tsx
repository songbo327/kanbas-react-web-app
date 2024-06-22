import React from 'react';
import {IoEllipsisVertical} from "react-icons/io5";
import {FaPlus} from "react-icons/fa6";

export default function QuizzesControlButtons() {
    return (
        <div className="float-end">
            <FaPlus/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}