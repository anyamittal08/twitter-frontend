import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Link,
    Typography,
} from '@mui/material';
import moment from 'moment';

function Tweet({ tweet }) {
    return (
        <ListItem alignItems="flex-start" divider={true}>
            <ListItemAvatar>
                <Avatar alt="profile-pic" />
            </ListItemAvatar>
            <ListItemText>
                <Link
                    underline="hover"
                    color="black"
                    sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {tweet.author.displayName}
                </Link>
                <Typography
                    compoment="span"
                    sx={{
                        display: 'inline',
                        padding: '0.3em',
                    }}
                >
                    {`@${tweet.author.username}`} ·
                </Typography>
                <Typography compoment="span" sx={{ display: 'inline' }}>
                    {moment(tweet.createdAt).fromNow()}
                </Typography>
                <Typography>{tweet.content}</Typography>
            </ListItemText>
        </ListItem>
    );
}

export default Tweet;
