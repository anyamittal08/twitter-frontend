import axios from 'axios';
import { useState } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserListA';
import { List, ListItem, Typography, Tab } from '@mui/material';

const FollowersAndFollowingPage = () => {
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState('followers');

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: userList } = useQuery(
        `${username}${activeTab}`,
        async () => {
            const response = await axios.get(
                `${config.api}/users/${userData?.id}/${activeTab}`
            );
            const responseArr = response.data.map((relationship) => {
                const user =
                    activeTab === 'followers'
                        ? relationship.follower
                        : relationship.targetUser;
                return user;
            });
            return responseArr;
        },
        {
            enabled: !!userData?.id,
        }
    );

    console.log(userList);

    return (
        <>
            <List sx={{ paddingTop: '10px' }}>
                <ListItem
                    divider={true}
                    sx={{
                        paddingTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        paddingBottom: '0px',
                    }}
                >
                    <Typography variant="h6">{`${userData?.displayName}`}</Typography>{' '}
                    <Typography
                        sx={{
                            margin: '0px',
                            color: '#657786',
                            fontSize: '0.9em',
                        }}
                    >{`@${userData?.username}`}</Typography>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            color: '#657786',
                            width: '100%',
                            margin: '0px',
                            padding: '0px',
                        }}
                    >
                        <Tab
                            label="followers"
                            onClick={() => setActiveTab('followers')}
                            component={ReactRouterLink}
                            to={`/${username}/followers`}
                            sx={{
                                color: '#657786',
                                borderBottom:
                                    activeTab === 'followers'
                                        ? '5px solid #1DA1F2'
                                        : '',
                                '&:hover': {
                                    backgroundColor: '#E1E8ED',
                                },
                            }}
                        />
                        <Tab
                            label="following"
                            onClick={() => setActiveTab('following')}
                            component={ReactRouterLink}
                            to={`/${username}/following`}
                            sx={{
                                color: '#657786',
                                borderBottom:
                                    activeTab === 'following'
                                        ? '5px solid #1DA1F2'
                                        : '',
                                '&:hover': {
                                    backgroundColor: '#E1E8ED',
                                },
                            }}
                        />
                    </div>
                </ListItem>
            </List>
            <UserList usersArr={userList} />
        </>
    );
};

export default FollowersAndFollowingPage;
