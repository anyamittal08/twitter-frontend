import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemText = styled(ListItemText)(({}) => ({
    '& .MuiListItemText-primary:hover': {
        textDecoration: 'underline',
    },
}));

const UserWithoutBio = ({ user }) => {
    return (
        <>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <StyledListItemText
                primary={user.displayName}
                secondary={`@${user.username}`}
            />
        </>
    );
};

export default UserWithoutBio;
