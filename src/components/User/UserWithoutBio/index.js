import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';

const UserWithoutBio = ({ user }) => {
    return (
        <>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={user.displayName}
                secondary={`@${user.username}`}
            />
        </>
    );
};

export default UserWithoutBio;
