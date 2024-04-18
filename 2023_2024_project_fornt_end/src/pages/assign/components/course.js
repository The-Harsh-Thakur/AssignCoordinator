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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const CourseList = ({ sessionYear, session }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null); // State to store the selected subject
    const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const [faculties, setFaculties] = useState([]); // State to store faculties
    const [selectedFaculty, setSelectedFaculty] = useState(null); // State to store the selected faculty
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // State to control the confirmation dialog visibility
    const [alertMessage, setAlertMessage] = useState(''); // State to store the alert message
    const [alertSeverity, setAlertSeverity] = useState('success'); // State to store the alert severity

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
                const response = await axios.get('http://localhost:8000/api/faculty'); // Update the endpoint as per your Laravel route
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
    };

    const handleCloseDialog = () => {
        if (!selectedFaculty) {
            setAlertMessage('Please select a faculty.');
            setAlertSeverity('error');
            return;
        }
        setConfirmDialogOpen(true);
    };

    const handleConfirmAssign = async () => {
        try {
            await axios.post('http://localhost:8000/api/assign-coordinator', {
                sub_code: selectedSubject.sub_code,
                offered_to_name: selectedFaculty.offered_to_name
            });
            setAlertMessage('Course coordinator assigned successfully.');
            setAlertSeverity('success');
        } catch (error) {
            console.error('Error assigning course coordinator:', error);
            setAlertMessage('Error assigning course coordinator. Please try again.');
            setAlertSeverity('error');
        }
        setOpenDialog(false);
        setConfirmDialogOpen(false);
    };

    const handleCancelAssign = () => {
        setOpenDialog(false);
        setConfirmDialogOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };

    // Filter subjects based on the search query
    const filteredSubjects = subjects.filter(subject =>
        subject.sub_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <hr />
            <Typography variant="h4" sx={{ mt: 3, ml: 3, fontSize: '1.5rem !important' }}>Course List</Typography>
            <Box sx={{ ml: 3 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mt: 2, mb: 2, width: '100%' }}
                />
            </Box>
            <List sx={{ ml: 3 }}>
                {filteredSubjects.map(subject => (
                    <ListItem key={subject.id}>
                        <Button onClick={() => handleClick(subject)} style={{ backgroundColor: 'green', color: 'white' }}>
                            <ListItemText primary={subject.sub_name} />
                        </Button>
                    </ListItem>
                ))}
            </List>

            {/* Dialog for assigning course coordinator */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Assign Course Coordinator</DialogTitle>
                <DialogContent>
                    {/* Content of the dialog */}
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
                                            value={faculty.offered_to_name}
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
                    <Button onClick={handleCloseDialog} color="primary">
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog */}
            <Dialog open={confirmDialogOpen} onClose={handleCancelAssign}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>Are you sure you want to assign this course coordinator?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAssign} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmAssign} color="primary">OK</Button>
                </DialogActions>
            </Dialog>

            {/* Alert */}
            <Snackbar open={alertMessage !== ''} autoHideDuration={6000} onClose={() => setAlertMessage('')}>
                <Alert onClose={() => setAlertMessage('')} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CourseList;
