import axios from 'axios';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import { Avatar, Divider } from '@mui/material';
import { styled } from '@mui/system';

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
import Gravatar from '../Gravatar';

const TweetContainer = styled('div')({
    minHeight: '68px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    lineHeight: '18px',
    paddingBottom: '0px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#F5F8FA',
    },
});

function Tweet({ tweet }) {
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
                queryClient.invalidateQueries();
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
                queryClient.invalidateQueries();
            },
        }
    );

    const likeAndUnlikeTweet = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!tweet.liked) {
            sendLike();
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
                queryClient.invalidateQueries();
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
                queryClient.invalidateQueries();
            },
        }
    );

    const retweetAndUndo = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!tweet.retweeted) {
            sendRetweet();
        } else if (tweet.retweeted) {
            undoRetweet();
        }
    };

    return (
        <div>
            <TweetContainer
                onClick={() =>
                    navigate(`/${tweet.author.username}/status/${tweet._id}`)
                }
            >
                <Retweeters
                    retweeters={tweet?.followedRetweeters}
                    retweetedByUser={tweet?.retweetedByUser}
                    // displayName={displayName}
                />
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            marginRight: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Gravatar
                            email={tweet?.author.email}
                            alt={tweet?.author.username}
                            style={{ marginRight: '0px' }}
                        />
                        <>
                            {tweet?.isThread ? (
                                tweet.nextTweetInThreadId ? (
                                    <div
                                        className="threadLine"
                                        style={{
                                            width: '2px',
                                            backgroundColor: '#AAB8C2',
                                            height: '100%',
                                            marginTop: '2px',
                                        }}
                                    />
                                ) : null
                            ) : null}
                        </>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="content">
                            <Author author={tweet?.author} />
                            <Time timestamp={tweet?.createdAt} />
                            <Message content={tweet?.content} />
                        </div>
                        <div
                            className="buttons"
                            style={{
                                width: '80%',
                                marginTop: '0px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ReplyButton replyCount={tweet?.replyCount} />
                            <RetweetButton
                                onClick={retweetAndUndo}
                                retweetCount={tweet?.retweetCount}
                                retweeted={tweet?.retweeted}
                            />
                            <LikeButton
                                onClick={likeAndUnlikeTweet}
                                likeCount={tweet?.likeCount}
                                liked={tweet?.liked}
                            />
                            <MoreOptionsButton />
                        </div>
                    </div>
                </div>
            </TweetContainer>
            <>
                {tweet?.isThread ? (
                    tweet.nextTweetInThreadId ? null : (
                        <Divider />
                    )
                ) : (
                    <Divider />
                )}
            </>
        </div>
    );
}

export default Tweet;
