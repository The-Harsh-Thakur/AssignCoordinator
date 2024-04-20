import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

const CourseList = ({ sessionYear, session }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [loading, setLoading] = useState(false); // State to track loading

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/subjects', {
                    params: {
                        session_year: sessionYear,
                        session: session
                    }
                });
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [sessionYear, session]);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/faculty');
                setFaculties(response.data);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };

        fetchFaculties();
    }, []);

    const handleClick = (subject) => {
        setSelectedSubject(subject);
        setOpenDialog(true);
        // Check if any faculty is already assigned to this subject
        const facultyAlreadyAssigned = faculties.find(faculty => faculty.sub_code === subject.sub_code && faculty.assigned === 1);
        if (facultyAlreadyAssigned) {
            setSelectedFaculty(facultyAlreadyAssigned.id.toString()); // Preselect the faculty already assigned
        } else {
            setSelectedFaculty(null); // If no faculty assigned, reset selected faculty
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.sub_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAssign = async () => {
        if (!selectedSubject || !selectedFaculty) return;

        try {
            // Update selected subject's assign attribute
            await axios.put(`http://localhost:8000/api/subjectstat/${selectedSubject.id}`, { assigned: 1 });

            // If a different faculty is selected, revert assigned value for the previously selected faculty
            if (selectedFaculty !== selectedSubject.offered_to_name) {
                const prevFaculty = faculties.find(faculty => faculty.sub_code === selectedSubject.sub_code && faculty.assigned === 1);
                if (prevFaculty) {
                    await axios.put(`http://localhost:8000/api/facultystat/${prevFaculty.id}`, { assigned: 0 });
                }
            }

            // Update selected faculty's assign attribute
            await axios.put(`http://localhost:8000/api/facultystat/${selectedFaculty}`, { assigned: 1 });

            // Refetch subjects and faculties data
            const updatedSubjects = await axios.get('http://localhost:8000/api/subjects', {
                params: {
                    session_year: sessionYear,
                    session: session
                }
            });
            setSubjects(updatedSubjects.data);

            const updatedFaculties = await axios.get('http://localhost:8000/api/faculty');
            setFaculties(updatedFaculties.data);
        } catch (error) {
            console.error('Error updating assignments:', error);
        }

        setOpenDialog(false);
    };

    const handleAssignSingleSubjects = async () => {
        try {
            setLoading(true); // Set loading to true
            const singleSubjects = subjects.filter(subject =>
                faculties.filter(faculty => faculty.sub_code === subject.sub_code).length === 1
            );

            for (const subject of singleSubjects) {
                const faculty = faculties.find(faculty => faculty.sub_code === subject.sub_code);
                if (faculty) {
                    await axios.put(`http://localhost:8000/api/subjectstat/${subject.id}`, { assigned: 1 });
                    await axios.put(`http://localhost:8000/api/facultystat/${faculty.id}`, { assigned: 1 });
                }
            }

            // Refetch subjects and faculties data
            const updatedSubjects = await axios.get('http://localhost:8000/api/subjects', {
                params: {
                    session_year: sessionYear,
                    session: session
                }
            });
            setSubjects(updatedSubjects.data);

            const updatedFaculties = await axios.get('http://localhost:8000/api/faculty');
            setFaculties(updatedFaculties.data);
        } catch (error) {
            console.error('Error assigning single subjects:', error);
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };

    return (
        <div>
            <hr />
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem", marginTop: "1rem"}}>
            <Typography variant="h4" sx={{ mt: 3, ml: 3, fontSize: '1.5rem !important' }}>Course List</Typography>
            <Button variant="contained" onClick={handleAssignSingleSubjects} style={{ marginLeft: '1rem' }}>Assign Single Coordinator</Button>
            </div>
            <Box sx={{ ml: 3 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mt: 2, mb: 2, width: '100%' }}
                />
            </Box>
            {loading ? ( // Show loading screen if loading is true
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List sx={{ ml: 3 }}>
                    {filteredSubjects.map(subject => (
                        <ListItem key={subject.id}>
                            <Button onClick={() => handleClick(subject)} style={{ backgroundColor: subject.assigned === 0 ? 'red' : 'green', color: 'white' }}>
                                <ListItemText primary={subject.sub_name} />
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Assign Course Coordinator</DialogTitle>
                <DialogContent>
                    {selectedSubject && (
                        <div>
                            <Typography>
                                Assign course coordinator for: {selectedSubject.sub_name}
                            </Typography>
                            <RadioGroup
                                aria-label="faculty"
                                name="faculty"
                                value={selectedFaculty}
                                onChange={handleFacultyChange}
                            >
                                {faculties
                                    .filter(faculty => faculty.sub_code === selectedSubject.sub_code)
                                    .map(faculty => (
                                        <FormControlLabel
                                            key={faculty.id}
                                            value={faculty.id.toString()}
                                            control={<Radio />}
                                            label={faculty.offered_to_name}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAssign} color="primary">
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CourseList;
