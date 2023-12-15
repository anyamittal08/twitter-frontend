import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';

import config from '../../config';
import { UserContext } from '../../contexts/auth';

import UserList from '../UserListA';
import { List, ListItem, Typography } from '@mui/material';

const SuggestedUsers = () => {
    const auth = useContext(UserContext);

    const { data: suggestedUsers } = useQuery('suggested', async () => {
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
            <UserList usersArr={suggestedUsers} />
        </List>
    );
};

export default SuggestedUsers;
