import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SessionYearMenu = ({ setSessionYear }) => {
    const [sessionYears, setSessionYears] = useState([]);

    useEffect(() => {
        const fetchSessionYears = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session-years'); // Update the endpoint as per your Laravel route
                setSessionYears(response.data);
            } catch (error) {
                console.error('Error fetching session years:', error);
            }
        };

        fetchSessionYears();
    }, []);

    return (
        <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
                <InputLabel id="sessionyear-label">Year</InputLabel>
                <Select
                    labelId="sessionyear-label"
                    id="sessionyear"
                    onChange={(event) => setSessionYear(event.target.value)} // Pass the selected session year value to the parent component
                    label="Session Year"
                >
                    {sessionYears.map((year) => (
                        <MenuItem key={year.id} value={year.session_year}>
                            {year.session_year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SessionYearMenu;
