export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML"/>
            <br/>
            <br/>
            <textarea id="wd-description" rows={10} cols={60}>
                The assignment is available online Submit a
                link to the landing page of your Web
                application running on Netlify. The landing
                page should include the following:Your full
                name and section Links to each of the lab
                assignments Link to the Kanbas application
                Links to all relevant source code repositories
                The Kanbas application should include a link
                to navigate back to the landing page.
            </textarea>

            <br/>
            <table>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>


                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="">Percentage</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="">Online</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">

                    </td>
                    <td>
                        <label htmlFor="wd-text-entry">Online Entry Options</label>
                        <br/>
                        <br/>

                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <input type="checkbox" id="wd-text-entry"/><br/>

                        <label htmlFor="wd-website-url">Website URL</label>
                        <input type="checkbox" id="wd-website-url"/><br/>

                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <input type="checkbox" id="wd-media-recordings"/><br/>

                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                        <input type="checkbox" id="wd-student-annotation"/><br/>

                        <label htmlFor="wd-file-upload">File Uploads</label>
                        <input type="checkbox" id="wd-file-upload"/><br/>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-file-upload">Assign Assign to</label>
                    </td>

                    <td>
                        <input type="input" id="wd-assign-to" value={'Everyone'}/><br/>
                    </td>
                </tr>


                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-available-from">Due</label>
                    </td>

                    <td>
                        <input type="date" id="wd-available-from" value="05/13/2024"/><br/>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">

                    </td>

                    <td>
                        <label htmlFor="wd-available-from">Available from</label>
                        <input type="date" id="wd-available-from" value="05/06/2024"/>

                        <label htmlFor="wd-available-until">Until</label>
                        <input type="date" id="wd-available-until" value="05/20/2024"/><br/>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
}