import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate('/');
    };

    return <Button onClick={handleClick}>Logout</Button>;
}

export default LogoutBtn;
