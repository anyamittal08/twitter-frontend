import axios from 'axios';
import moment from 'moment';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useContext, useState } from 'react';

import { Avatar, Box, Divider, Link, Tab, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import config from '../../config';
import { UserContext } from '../../contexts/auth';

import TweetList from '../../components/TweetList';

import {
    EditProfileButton,
    FollowButton,
    FollowingButton,
} from '../../components/Buttons';

function ProfilePage() {
    const authenticatedUser = JSON.parse(localStorage.getItem('auth')).user;
    const auth = useContext(UserContext);
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState('tweets');
    const queryClient = useQueryClient();

    const { data: userData } = useQuery(`${username}UserData`, () =>
        axios.get(`${config.api}/users/${username}`).then((res) => {
            return res.data;
        })
    );

    const { data: tweets } = useQuery(
        `${username}${activeTab}`,
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/${activeTab}`, {
                    headers: { authorization: `Bearer ${auth.token}` },
                })
                .then((res) => {
                    return res.data.map((tweet) => tweet);
                }),
        {
            enabled: !!userData?.id,
        }
    );

    console.log(tweets);

    const { data: relationship } = useQuery(
        `${username}Relationship`,
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/relationship`, {
                    headers: { authorization: `Bearer ${auth.token}` },
                })
                .then((res) => {
                    return res.data;
                }),
        {
            enabled: !!userData?.id,
        }
    );

    const { mutate: followUser } = useMutation(
        async () => {
            await axios.post(
                `${config.api}/users/${userData?.id}/follow`,
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
                queryClient.invalidateQueries({
                    queryKey: [`${username}Relationship`],
                });
                queryClient.invalidateQueries({
                    queryKey: [`${username}UserData`],
                });
            },
        }
    );

    const { mutate: unfollowUser } = useMutation(
        async () => {
            await axios.delete(`${config.api}/users/${userData?.id}/unfollow`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [`${username}Relationship`],
                });
                queryClient.invalidateQueries({
                    queryKey: [`${username}UserData`],
                });
            },
        }
    );

    const handleRelationshipChange = (e) => {
        e.preventDefault();
        if (relationship?.userIsFollowed) unfollowUser();
        else followUser();
    };

    return (
        <>
            <div className="profilePage">
                <div
                    style={{
                        padding: '0px 20px',
                        position: 'sticky',
                        top: '0',
                        zIndex: '999',
                        background: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    <h2 style={{ margin: '0px' }}>{userData?.displayName}</h2>
                    <p
                        style={{
                            margin: '0px',
                            color: '#657786',
                            fontSize: '0.9em',
                        }}
                    >
                        {`${tweets?.length} posts`}
                    </p>
                </div>
                <div className="profileHeader">
                    <div className="photos">
                        <div
                            className="headerPhoto"
                            style={{
                                backgroundColor: '#CFD9DE',
                                height: '200px',
                            }}
                        ></div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '60px',
                            }}
                        >
                            <div
                                style={{
                                    width: 'fit-content',
                                    position: 'relative',
                                    bottom: '62.5px',
                                    left: '15px',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 125,
                                        height: 125,
                                        border: '3px solid white',
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    margin: '10px 15px',
                                }}
                            >
                                {authenticatedUser.id === userData?.id ? (
                                    <EditProfileButton />
                                ) : relationship?.userIsFollowed ? (
                                    <FollowingButton
                                        style={{ alignSelf: 'flex-end' }}
                                        onClick={handleRelationshipChange}
                                    />
                                ) : (
                                    <FollowButton
                                        style={{ alignSelf: 'flex-end' }}
                                        onClick={handleRelationshipChange}
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            className="userInfo"
                            style={{
                                margin: '10px 0px 0px',
                            }}
                        >
                            <h2
                                style={{
                                    fontWeight: 'bolder',
                                    margin: '0px 10px',
                                }}
                            >
                                {userData?.displayName}
                            </h2>
                            <div
                                style={{ color: '#657786', margin: '0px 10px' }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography>{`@${userData?.username}`}</Typography>
                                    {relationship?.userIsFollower ? (
                                        <div
                                            style={{
                                                backgroundColor: '#E1E8ED',
                                                marginLeft: '5px',
                                                padding: '0px 5px',
                                                borderRadius: '5px',
                                                lineHeight: '1',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: '10px' }}
                                            >
                                                Follows You
                                            </Typography>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        gap: '5px',
                                    }}
                                >
                                    <CalendarMonthIcon />
                                    <Typography>
                                        {' '}
                                        {`Joined ${moment(
                                            userData?.createdAt
                                        ).format('MMMM YYYY')}`}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Link
                                        component={ReactRouterLink}
                                        to={`/${username}/followers`}
                                        variant="body2"
                                        color="#657786"
                                        underline="hover"
                                        sx={{
                                            fontWeight: 'medium',
                                        }}
                                    >
                                        {`${userData?.followerCount} followers`}
                                    </Link>
                                    <Link
                                        component={ReactRouterLink}
                                        to={`/${username}/following`}
                                        variant="body2"
                                        color="#657786"
                                        underline="hover"
                                        sx={{
                                            fontWeight: 'medium',
                                        }}
                                    >
                                        {`${userData?.followingCount} following`}
                                    </Link>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: '#657786',
                                    }}
                                >
                                    <Tab
                                        label="Tweets"
                                        onClick={() => setActiveTab('tweets')}
                                        sx={{
                                            color: '#657786',
                                            borderBottom:
                                                activeTab === 'tweets'
                                                    ? '5px solid #1DA1F2'
                                                    : '',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Media"
                                        sx={{
                                            color: '#657786',
                                            borderBottom:
                                                activeTab === 'media'
                                                    ? '5px solid #1DA1F2'
                                                    : '',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Likes"
                                        component={ReactRouterLink}
                                        to={`/${username}/likes`}
                                        onClick={() => setActiveTab('likes')}
                                        sx={{
                                            color: '#657786',
                                            borderBottom:
                                                activeTab === 'likes'
                                                    ? '5px solid #1DA1F2'
                                                    : '',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <TweetList
                    tweets={tweets}
                    displayName={userData?.displayName}
                />
            </div>
        </>
    );
}

export default ProfilePage;
