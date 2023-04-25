import {
    Avatar,
    Button,
    Container,
    Grid,
    Typography,
    Stack,
    Link,
} from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

const User = ({ user }) => {
    return (
        <Container maxWidth="sm">
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={`${user.username}-img`} />
                </Grid>
                <Grid container item xs zeroMinWidth>
                    <Grid container justifyContent="space-between">
                        <Grid maxWidth>
                            <Link
                                component={ReactRouterLink}
                                to={`/${user.username}`}
                                underline="hover"
                                color="black"
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                {user.displayName}
                            </Link>
                            <Typography
                                color="grey"
                                fontSize="13px"
                            >{`@${user.username}`}</Typography>
                        </Grid>
                        <Grid>
                            <Stack direction="row" justifyContent="end">
                                <Button variant="contained">Following</Button>
                            </Stack>
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
        </Container>
    );
};

export default User;
