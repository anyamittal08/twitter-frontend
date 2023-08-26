import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart as faHeartOutline,
    faComment,
} from '@fortawesome/free-regular-svg-icons';
import {
    faRetweet,
    faHeart as faHeartSolid,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'normalize.css';
import './styles.css';

const ButtonText = styled(Typography)(() => ({
    variant: 'body2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2em',
}));

const BasicButton = styled(Button)(() => ({
    borderRadius: '35px',
    padding: '6px 12px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        borderRadius: 30,
    },
}));

const FollowButton = ({ onClick }) => (
    <BasicButton
        variant="contained"
        sx={{ backgroundColor: 'black', padding: '3px 15px 3px 15px' }}
        onClick={onClick}
    >
        <ButtonText>Follow</ButtonText>
    </BasicButton>
);

const FollowingButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <BasicButton
            variant={isHovered ? 'contained' : 'outlined'}
            sx={{
                // backgroundColor: isHovered ? 'red' : '',
                padding: '3px 15px 3px 15px',
                color: isHovered ? 'red' : 'black',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {isHovered ? 'Unfollow' : 'Following'}
        </BasicButton>
    );
};

const EditProfileButton = ({ onClick }) => {
    return (
        <BasicButton
            variant="outlined"
            sx={{
                padding: '3px 15px 3px 15px',
            }}
            onClick={onClick}
        >
            Edit Profile
        </BasicButton>
    );
};

const LogoutButton = ({ onClick }) => (
    <BasicButton
        variant="contained"
        sx={{ backgroundColor: 'black', padding: '3px 15px 3px 15px' }}
        onClick={onClick}
    >
        <ButtonText>Logout</ButtonText>
    </BasicButton>
);

const TweetButton = ({ width, onClick }) => (
    <BasicButton
        variant="contained"
        color="primary"
        sx={{ width: width }}
        onClick={onClick}
    >
        <ButtonText>Tweet</ButtonText>
    </BasicButton>
);

const ReplyButton = ({ replyCount, onClick }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <FontAwesomeIcon
            onClick={onClick}
            icon={faComment}
            style={{ cursor: 'pointer' }}
        />
        <p>{replyCount}</p>
    </div>
);

const RetweetButton = ({ retweeted, retweetCount, onClick }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <FontAwesomeIcon
            onClick={onClick}
            icon={faRetweet}
            color={retweeted ? 'green' : ''}
            style={{ cursor: 'pointer' }}
        />
        <p>{retweetCount}</p>
    </div>
);
const LikeButton = ({ liked, likeCount, onClick }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <FontAwesomeIcon
            onClick={onClick}
            icon={liked ? faHeartSolid : faHeartOutline}
            color={liked ? 'red' : ''}
            style={{ cursor: 'pointer' }}
        />
        <p>{likeCount}</p>
    </div>
);
const MoreOptionsButton = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEllipsis} />
    </div>
);

export {
    ReplyButton,
    RetweetButton,
    LikeButton,
    MoreOptionsButton,
    TweetButton,
    FollowButton,
    FollowingButton,
    LogoutButton,
    EditProfileButton,
};
