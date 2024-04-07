import React from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import SessionYearMenu from "./components/sessionyear";
import SessionMenu from "./components/session";



const Assign = () => {

    const [mySession, setSession] = React.useState('');

  const handleSession = (event) => {
    setSession(event.target.value);
  };

  const [myYear, setYear] = React.useState('');

  const handleSessionYear = (event) => {
    setYear(event.target.value);
  };

  return (

    <div>
    <Typography variant='h1' 
    sx={{
        ml: 3,
        lineHeight: 1,
        fontWeight: 600,
        fontSize: '1.5rem !important'
        }}>Assign Course Co-ordinator</Typography>

    <hr />
    <br />

    

    <div className='dropdowns' 
     style={{
        display: "flex",
        }}>
    <SessionYearMenu />

    
    <SessionMenu/>

    <Button variant="contained" sx = {{marginLeft: 25}}>Get Subjects</Button>
    </div>

    </div>
    
  )
}

export default Assign