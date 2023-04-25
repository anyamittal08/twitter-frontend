import axios from 'axios';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import { ListItemAvatar, Avatar, Link, Divider } from '@mui/material';

import config from '../../config';
import { UserContext } from '../../contexts/auth';
import { useContext } from 'react';

import {
    ReplyButton,
    RetweetButton,
    LikeButton,
    MoreOptionsButton,
} from '../Buttons';
import { Message, Author, Retweeters, Time } from '../TweetComponents';

import './styles.css';

function Tweet({ tweet, displayName }) {
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
            await axios.delete(`${config.api}/tweets/${tweet._id}/like`, {
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
        if (!tweet.liked) {
            sendLike();
            console.log('liked');
        } else if (tweet.liked) {
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
        if (!tweet.retweeted) {
            sendRetweet();
        } else if (tweet.retweeted) {
            undoRetweet();
        }
    };

    return (
        <div>
            <div className="tweet-container" style={{ paddingBottom: '0px' }}>
                <Retweeters
                    retweeters={tweet.followedRetweeters}
                    retweetedByUser={tweet.retweetedByUser}
                    displayName={displayName}
                />
                <div className="tweet">
                    <Avatar className="avatar" alt="profile-pic" />

                    <div className="content">
                        <Author author={tweet.author} />
                        <Time timestamp={tweet.createdAt} />
                        <Message content={tweet.content} />
                    </div>
                </div>
                <div className="buttons" style={{ marginTop: '0px' }}>
                    <ReplyButton replyCount={tweet.replyCount} />
                    <RetweetButton
                        onClick={retweetAndUndo}
                        retweetCount={tweet.retweetCount}
                        retweeted={tweet.retweeted}
                    />
                    <LikeButton
                        onClick={likeAndUnlikeTweet}
                        likeCount={tweet.likeCount}
                        liked={tweet.liked}
                    />
                    <MoreOptionsButton />
                </div>
            </div>
            <Divider />
        </div>
    );
}

export default Tweet;
