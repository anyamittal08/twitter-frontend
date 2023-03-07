import axios from 'axios';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Link,
    Typography,
    Button,
} from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

import config from '../../config';
import { UserContext } from '../../contexts/auth';
import { useContext } from 'react';

function Tweet({ tweet }) {
    const auth = useContext(UserContext);
    const queryClient = useQueryClient();

    const { mutate: sendLike } = useMutation(
        async () => {
            await axios.post(
                `${config.api}/tweets/${tweet._id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['feed'] });
            },
        }
    );

    const { mutate: sendUnlike } = useMutation(
        async () => {
            await axios.delete(`${config.api}/tweets/${tweet._id}/unlike`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['feed'] });
            },
        }
    );

    const likeAndUnlikeTweet = async (e) => {
        e.preventDefault();
        if (e.target.innerText === 'LIKE') {
            sendLike();
        } else if (e.target.innerText === 'UNLIKE') {
            sendUnlike();
        }
    };

    return (
        <ListItem alignItems="flex-start" divider={true} key={tweet.id}>
            <ListItemAvatar>
                <Avatar alt="profile-pic" />
            </ListItemAvatar>
            <ListItemText>
                <Link
                    component={ReactRouterLink}
                    to={`/${tweet.author.username}`}
                    underline="hover"
                    color="black"
                    sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {tweet.author.displayName}
                </Link>
                <Typography
                    compoment="span"
                    sx={{
                        display: 'inline',
                        padding: '0.3em',
                    }}
                >
                    {`@${tweet.author.username}`} ·
                </Typography>
                <Typography compoment="span" sx={{ display: 'inline' }}>
                    {moment(tweet.createdAt).fromNow()}
                </Typography>
                <Typography>{tweet.content}</Typography>
            </ListItemText>
            <Button variant="contained" onClick={likeAndUnlikeTweet}>
                {tweet.liked ? `UNLIKE` : `LIKE`}
            </Button>
            <Typography>{tweet.likes.length}</Typography>
        </ListItem>
    );
}

export default Tweet;
