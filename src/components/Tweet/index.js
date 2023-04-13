import axios from 'axios';
import {
    Box,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Link,
    Typography,
    Button,
} from '@mui/material';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

import config from '../../config';
import { UserContext } from '../../contexts/auth';
import { useContext } from 'react';

function Tweet({ tweet, retweeters }) {
    const auth = useContext(UserContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
                queryClient.invalidateQueries({ queryKey: ['tweets'] });
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
                queryClient.invalidateQueries({ queryKey: ['tweets'] });
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

    const { mutate: undoRetweet } = useMutation(
        async () => {
            await axios.delete(`${config.api}/tweets/${tweet._id}/retweet`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['feed'] });
                queryClient.invalidateQueries({ queryKey: ['tweets'] });
            },
        }
    );

    const { mutate: sendRetweet } = useMutation(
        async () => {
            await axios.post(
                `${config.api}/tweets/${tweet._id}/retweet`,
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
                queryClient.invalidateQueries({ queryKey: ['tweets'] });
            },
        }
    );

    const retweetAndUndo = async (e) => {
        e.preventDefault();
        if (e.target.innerText === 'RETWEET') {
            sendRetweet();
        } else if (e.target.innerText === 'UNDO RT') {
            undoRetweet();
        }
    };

    return (
        <ListItem
            alignItems={'flex-start'}
            divider={true}
            key={tweet._id}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
                navigate(`/${tweet.author.username}/status/${tweet._id}`)
            }
        >
            {/* <Link
                component={ReactRouterLink}
                to={`/${retweeters[0]?.username}`}
                underline="hover"
                color="black"
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            >
                {retweeters.length > 0
                    ? `${retweeters[0].displayName} Retweeted`
                    : ''}
            </Link> */}
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
            <Typography>{tweet.likeCount}</Typography>
            <Button variant="contained" onClick={retweetAndUndo}>
                {tweet.retweeted ? `UNDO RT` : `RETWEET`}
            </Button>
            <Typography>{tweet.retweetCount}</Typography>
        </ListItem>
    );
}

export default Tweet;
