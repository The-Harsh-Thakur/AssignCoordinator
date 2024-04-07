import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

const AssignButton = () => {
    const router = useRouter();
  
    const handleClick = () => {
      router.push('/assign');
    };
  
    return (
      <Button variant="contained" onClick={handleClick}>
        Assign
      </Button>
    );
  };

export default AssignButton;
  