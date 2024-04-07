import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SessionMenu = () => {
    const [session, setSession] = useState([]);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session'); // Update the endpoint as per your Laravel route
                setSession(response.data);
            } catch (error) {
                console.error('Error fetching session years:', error);
            }
        };

        fetchSession();
    }, []);

    return (
        
        <Box sx={{ minWidth: 250, marginLeft: 25 }}>
      <FormControl fullWidth>
        <InputLabel id="session">Session</InputLabel>
        <Select label="Session"
        labelId="session-select"
          id="session"
         >
            {session.map((session) => (
                <MenuItem key={session.id} value={session.session}>
                    {session.session}
                </MenuItem>
            ))}
        </Select>
        
          
      </FormControl>
    </Box>
    );
};

export default SessionMenu;
