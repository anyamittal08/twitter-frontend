import { Stack } from '@mui/system';

import User from '../User';

const UserList = ({ usersArr }) => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
            {usersArr?.map((user) => (
                <User user={user} />
            ))}
        </Stack>
    );
};

export default UserList;
