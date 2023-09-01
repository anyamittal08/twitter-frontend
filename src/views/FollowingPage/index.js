import axios from 'axios';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserListA';
import { Divider, List, ListItem, Typography, Tab } from '@mui/material';

const FollowingPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: followingData } = useQuery(
        `${username}Following`,
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/following`)
                .then((res) =>
                    res.data.map((relationship) => relationship.targetUser)
                ),
        {
            enabled: !!userData?.id,
        }
    );

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
                            component={ReactRouterLink}
                            to={`/${username}/followers`}
                            sx={{
                                color: '#657786',
                                '&:hover': {
                                    backgroundColor: '#E1E8ED',
                                },
                            }}
                        />
                        <Tab
                            label="following"
                            component={ReactRouterLink}
                            to={`/${username}/following`}
                            sx={{
                                color: '#657786',
                                '&:hover': {
                                    backgroundColor: '#E1E8ED',
                                },
                            }}
                        />
                    </div>
                </ListItem>
            </List>
            <UserList usersArr={followingData} />
        </>
    );
};

export default FollowingPage;
