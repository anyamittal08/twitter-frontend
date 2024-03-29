import axios from 'axios';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import config from '../../../config';
import { UserContext } from '../../../contexts/auth';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FollowButton, FollowingButton } from '../../Buttons';
import Gravatar from '../../Gravatar';

const StyledListItemText = styled(ListItemText)(({}) => ({
    '& .MuiListItemText-primary:hover': {
        textDecoration: 'underline',
    },
}));

const UserWithoutBio = ({ user }) => {
    const auth = useContext(UserContext);
    const [isFollowed, setIsFollowed] = useState(false);

    const { mutate: followUser } = useMutation(async () => {
        await axios.post(
            `${config.api}/users/${user?._id}/follow`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }
        );
    });

    const { mutate: unfollowUser } = useMutation(async () => {
        await axios.delete(`${config.api}/users/${user?._id}/unfollow`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });
    });

    const handleFollow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        followUser();
        setIsFollowed(true);
    };

    const handleUnfollow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        unfollowUser();
        setIsFollowed(false);
    };

    return (
        <ListItem
            component={Link}
            to={`/${user.username}`}
            sx={{
                width: '100%',
                textDecoration: 'none',
                color: 'black',
                '&:hover': { backgroundColor: '#E1E8ED' },
            }}
        >
            <ListItemAvatar>
                <Gravatar email={user.email} username={user.username} />
            </ListItemAvatar>
            <StyledListItemText
                primary={user.displayName}
                secondary={`@${user.username}`}
            />
            {isFollowed ? (
                <FollowingButton onClick={handleUnfollow} />
            ) : (
                <FollowButton onClick={handleFollow} />
            )}
        </ListItem>
    );
};

export default UserWithoutBio;
