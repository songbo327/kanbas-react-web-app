import React from "react";
import {BsFillGearFill, BsFunnel} from "react-icons/bs";
import {BiImport} from "react-icons/bi";
import {LiaFileImportSolid} from "react-icons/lia";

export default function Grades() {
    return (
        <div className="container">
            <button className="btn btn-secondary float-end">
                <BsFillGearFill  className="fs-5"/>
            </button>
            <button className="btn btn-secondary float-end mx-2 dropdown-toggle">
                <BiImport className="me-2 fs-5"/>
                Export
            </button>
            <button className="btn btn-secondary float-end">
                <LiaFileImportSolid className="me-2 fs-5"/>
                Import
            </button>
            <br/>
            <div className="row mt-4">
                <div className="col">
                    <label htmlFor="wd-student-names" className="form-label"><b>Student Names</b></label>
                    <select id="wd-student-names" className="form-select">
                        <option selected>Search Students</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="wd-assignment-names" className="form-label"><b>Assignment Names</b></label>
                    <select id="wd-assignment-names" className="form-select">
                        <option selected>Search Assignments</option>
                    </select>
                </div>
            </div>
            <div className="row my-3 row-cols-auto">
                <button className="btn btn-secondary ms-2">
                    <BsFunnel className="me-2"/>
                    Apply Filters
                </button>
            </div>
            <div className="row my-3">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead>
                        <tr>
                            <th scope="col" className="fs-6 fw-normal" style={{width: "20%"}}>Student Name</th>
                            <th scope="col" className="fs-6 fw-normal text-center" style={{width: "20%"}}>
                                A1 SETUP<br/>
                                Out of 100
                            </th>
                            <th scope="col" className="fs-6 fw-normal text-center" style={{width: "20%"}}>
                                A2 HTML<br/>
                                Out of 100
                            </th>
                            <th scope="col" className="fs-6 fw-normal text-center" style={{width: "20%"}}>
                                A3 CSS<br/>
                                Out of 100
                            </th>
                            <th scope="col" className="fs-6 fw-normal text-center" style={{width: "20%"}}>
                                A4 BOOTSTRAP<br/>
                                Out of 100
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" className="text-danger">Jane Adams</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Christina Allen</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Samreen Ansari</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Han Bao</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Mahi Sai Srinivas Bobbili</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        <tr>
                            <th scope="row" className="text-danger">Siran Cao</th>
                            <td className="text-center">100%</td>
                            <td className="text-center">100%</td>
                            <td className="text-center">
                                <input type="percentile" value="100%" className="form-control text-center"/>
                            </td>
                            <td className="text-center">100%</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}