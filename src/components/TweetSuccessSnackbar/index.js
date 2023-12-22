import { Snackbar, Typography, Alert, Link } from '@mui/material';

const TweetSuccessSnackbar = ({ open, close }) => {
    return (
        <div>
            {/* <Button onClick={handleClick}>Open snackbar</Button> */}
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
                        <Link color="#fff" sx={{ cursor: 'pointer' }}>
                            View
                        </Link>
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
