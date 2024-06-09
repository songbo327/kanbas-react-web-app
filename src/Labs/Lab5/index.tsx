import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import {QueryParameters} from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";

export default function Lab5() {
    return (
        <div id="wd-lab5" className="container-fluid">
            <h2>Lab 5</h2>
            <div className="list-group">
                <a href="http://localhost:4000/lab5/welcome"
                   className="list-group-item">
                    Welcome
                </a>
            </div>
            <hr/>
            <EnvironmentVariables/>
            <PathParameters/>
            <QueryParameters/>
            <WorkingWithObjects/>
            <WorkingWithArrays/>
            <HttpClient/>
            <WorkingWithObjectsAsynchronously/>
            <WorkingWithArraysAsynchronously/>
        </div>
    );
}

