import { Link, List, ListItem, Paper, Typography } from '@mui/material';

import UserWithoutBio from '../User/UserWithoutBio';
import { FollowButton } from '../Buttons';

const WhoToFollow = ({ users }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                height: 'auto',
                bgcolor: '#F5F8FA',
                marginTop: '25px',
                padding: '10px',
                borderRadius: '15px',
            }}
        >
            <Typography variant="h6">Who to follow</Typography>
            <List>
                {users?.map((user) => (
                    <ListItem>
                        <UserWithoutBio
                            user={user}
                            style={{
                                '&:hover': { backgroundColor: 'lightGrey' },
                            }}
                            action={'Follow'}
                        />
                        <FollowButton />
                    </ListItem>
                ))}
                <ListItem
                    sx={{
                        '&:hover': { backgroundColor: 'lightgrey' },
                        cursor: 'pointer',
                    }}
                >
                    <Link sx={{ cursor: 'pointer' }}>Show more</Link>
                </ListItem>
            </List>
        </Paper>
    );
};

export default WhoToFollow;
