import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SessionMenu = ({ setSession }) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session'); // Update the endpoint as per your Laravel route
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, []);

    return (
        <Box sx={{ minWidth: 250, marginLeft: 25 }}>
            <FormControl fullWidth>
                <InputLabel id="session-label">Session</InputLabel>
                <Select
                    labelId="session-label"
                    id="session"
                    onChange={(event) => setSession(event.target.value)} // Pass the selected session value to the parent component
                    label="Session"
                >
                    {sessions.map((sessionItem) => (
                        <MenuItem key={sessionItem.id} value={sessionItem.session}>
                            {sessionItem.session}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SessionMenu;
