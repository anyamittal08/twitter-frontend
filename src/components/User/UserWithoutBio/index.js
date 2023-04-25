import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { FollowButton } from '../../Buttons';
const UserWithoutBio = ({ user }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={user.displayName}
                secondary={`@${user.username}`}
            />
            <FollowButton sx={{ float: 'right' }} />
        </ListItem>
    );
};

export default UserWithoutBio;
