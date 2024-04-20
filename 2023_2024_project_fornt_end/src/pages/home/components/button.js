import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

const AssignButton = () => {
    const router = useRouter();
  
    const handleClick = () => {
      router.push('/assign');
    };
  
    return (
      <div style={{marginLeft: 25, marginTop: 40}}>
      <Button variant="contained" onClick={handleClick}>
        Assign Course Coordinator
      </Button>
      </div>
    );
  };

export default AssignButton;
  