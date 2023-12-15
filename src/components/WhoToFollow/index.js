import { List, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import UserWithoutBio from '../User/UserWithoutBio';
import { FollowButton } from '../Buttons';

const WhoToFollow = ({ users }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                bgcolor: '#F5F8FA',
                marginTop: '25px',
                paddingTop: '20px',
                borderRadius: '15px',
            }}
        >
            <Typography
                variant="h6"
                sx={{ paddingLeft: '20px', fontWeight: 'bold' }}
            >
                Who to follow
            </Typography>
            <List sx={{ width: '100%', paddingBottom: '0px' }}>
                {users?.map((user) => (
                    <ListItem
                        component={Link}
                        to={`/${user.username}`}
                        sx={{
                            width: '100%',
                            textDecoration: 'none',
                            color: 'black',
                            '&:hover': { backgroundColor: '#E1E8ED' },
                        }}
                    >
                        <UserWithoutBio user={user} action={'Follow'} />
                        <FollowButton />
                    </ListItem>
                ))}
                <ListItem
                    component={Link}
                    sx={{
                        flex: '1',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px',
                        '&:hover': { backgroundColor: '#E1E8ED' },
                        paddingBottom: '10px',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#1DA1F2',
                            textDecoration: 'none',
                        }}
                        component={Link}
                    >
                        Show more
                    </Typography>
                </ListItem>
            </List>
        </Paper>
    );
};

export default WhoToFollow;
