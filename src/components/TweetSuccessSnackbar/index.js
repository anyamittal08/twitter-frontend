import { Link } from 'react-router-dom';

import { Snackbar, Typography, Alert } from '@mui/material';

const TweetSuccessSnackbar = ({ open, close, tweet }) => {
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={close}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    sx={{
                        width: '100%',
                        backgroundColor: '#1DA1F2',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '20px',
                        paddingRight: '30px',
                    }}
                    icon={false}
                    action={
                        <Typography
                            component={Link}
                            to={`/${tweet?.author?.username}/status/${tweet?._id}`}
                            color="#fff"
                            style={{ cursor: 'pointer' }}
                        >
                            View
                        </Typography>
                    }
                >
                    <Typography
                        sx={{
                            color: 'white',
                            padding: '0px',
                        }}
                    >
                        {' '}
                        Your tweet was sent.{' '}
                    </Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TweetSuccessSnackbar;
