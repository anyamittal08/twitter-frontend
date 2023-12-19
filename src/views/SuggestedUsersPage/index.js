import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';

import { List, ListItem, Typography } from '@mui/material';

import config from '../../config';
import { UserContext } from '../../contexts/auth';

import UserList from '../UserListA';
import { LoadingState, ErrorState } from '../../components/StatusComponents';

const SuggestedUsers = () => {
    const auth = useContext(UserContext);

    const {
        isLoading,
        error,
        data: suggestedUsers,
    } = useQuery('suggested', async () => {
        const res = await axios.get(`${config.api}/users/suggested/users`, {
            headers: { authorization: `Bearer ${auth.token}` },
        });
        return res.data;
    });

    return (
        <List sx={{ paddingTop: '10px' }}>
            <ListItem divider={true} sx={{ paddingTop: '0px' }}>
                <Typography variant="h6">Suggested for you</Typography>
            </ListItem>
            {isLoading ? (
                <LoadingState />
            ) : error ? (
                <ErrorState />
            ) : (
                <UserList usersArr={suggestedUsers} />
            )}
        </List>
    );
};

export default SuggestedUsers;
