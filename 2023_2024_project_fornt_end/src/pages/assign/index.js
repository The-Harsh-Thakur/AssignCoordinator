import React, { useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SessionYearMenu from "./components/sessionyear";
import SessionMenu from "./components/session";
import CourseList from "./components/course";

const Assign = () => {
    const [sessionYear, setSessionYear] = useState('');
    const [session, setSession] = useState('');
    const [showCourseList, setShowCourseList] = useState(false); // State to control visibility of CourseList

    const handleGetSubjects = () => {
        // Fetch subjects here
        // Once subjects are fetched, set showCourseList to true to make CourseList visible
        setShowCourseList(true);
    };

    return (
        <div>
            <Typography variant='h1' 
                sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    fontSize: '2.2rem !important'
                }}>Assign Course Co-ordinator</Typography>
            <hr />
            <br />
            <br/>
            <div className='dropdowns' style={{ display: "flex" }}>
                <SessionYearMenu setSessionYear={setSessionYear} />
                <SessionMenu setSession={setSession} />
                <Button variant="contained" onClick={handleGetSubjects} sx={{ marginLeft: 25 }}>Get Subjects</Button>
            </div>
            <br />
            <br/>
            {showCourseList && <CourseList sessionYear={sessionYear} session={session} />} {/* Render CourseList if showCourseList is true */}
        </div>
    );
}

export default Assign;
