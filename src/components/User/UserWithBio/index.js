import { Grid, Typography, Stack, Link, styled } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import Gravatar from '../../Gravatar';

const UserContainer = styled('div')({
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

const User = ({ user }) => {
    return (
        <UserContainer>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Gravatar username={user.username} email={user.email} />
                </Grid>
                <Grid container item xs zeroMinWidth>
                    <Grid container justifyContent="space-between">
                        <Grid maxWidth>
                            <Link
                                component={ReactRouterLink}
                                to={`/${user?.username}`}
                                underline="hover"
                                color="black"
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                {user?.displayName}
                            </Link>
                            <Typography
                                color="grey"
                                fontSize="13px"
                            >{`@${user?.username}`}</Typography>
                        </Grid>
                        <Grid>
                            <Stack direction="row" justifyContent="end"></Stack>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography id="userDescription">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </UserContainer>
    );
};

export default User;
