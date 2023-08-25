import axios from 'axios';
import moment from 'moment';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContext } from 'react';

import { Avatar, Box, Divider, Link, Tab, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import config from '../../config';
import { UserContext } from '../../contexts/auth';

import TweetList from '../../components/TweetList';

import { FollowButton } from '../../components/Buttons';

function ProfilePage() {
    const auth = useContext(UserContext);
    const { username } = useParams();

    const { data: userData } = useQuery(`${username}Data`, () =>
        axios.get(`${config.api}/users/${username}`).then((res) => {
            console.log(res.data);
            return res.data;
        })
    );

    const { data: tweets } = useQuery(
        `${username}Tweets`,
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/tweets`, {
                    headers: { authorization: `Bearer ${auth.token}` },
                })
                .then((res) => {
                    return res.data.map((tweet) => tweet);
                }),
        {
            enabled: !!userData?.id,
        }
    );

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
                                    border: '1px solid red',
                                }}
                            >
                                <FollowButton
                                    style={{ alignSelf: 'flex-end' }}
                                    actionText={'Follow'}
                                />
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
                                <Typography>{`@${userData?.username}`}</Typography>
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
                                        sx={{
                                            color: '#657786',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Replies"
                                        sx={{
                                            color: '#657786',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Media"
                                        sx={{
                                            color: '#657786',
                                            '&:hover': {
                                                backgroundColor: '#E1E8ED',
                                            },
                                        }}
                                    />
                                    <Tab
                                        label="Likes"
                                        component={ReactRouterLink}
                                        to={`/${username}/likes`}
                                        sx={{
                                            color: '#657786',
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
