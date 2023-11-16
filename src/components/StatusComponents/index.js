import { CircularProgress, Typography } from '@mui/material';

const LoadingState = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
        }}
    >
        <CircularProgress />
    </div>
);

const ErrorState = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15px',
        }}
    >
        <Typography>Server Error. Please check your connection.</Typography>
    </div>
);

export { LoadingState, ErrorState };
