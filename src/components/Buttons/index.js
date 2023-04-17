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

import moment from 'moment';

import 'normalize.css';
import './styles.css';

const Time = ({ timestamp }) => (
    <span className="time">{moment(timestamp).fromNow()}</span>
);
const ReplyButton = ({ replyCount, onClick }) => (
    <div style={{ display: 'flex' }}>
        <FontAwesomeIcon onClick={onClick} icon={faComment} />
        <p>{replyCount}</p>
    </div>
);

const RetweetButton = ({ retweeted, retweetCount, onClick }) => (
    <div style={{ display: 'flex' }}>
        <FontAwesomeIcon
            onClick={onClick}
            icon={faRetweet}
            color={retweeted ? 'green' : ''}
        />
        <p>{retweetCount}</p>
    </div>
);
const LikeButton = ({ liked, likeCount, onClick }) => (
    <div style={{ display: 'flex' }}>
        <FontAwesomeIcon
            onClick={onClick}
            icon={liked ? faHeartSolid : faHeartOutline}
            color={liked ? 'red' : ''}
        />
        <p>{likeCount}</p>
    </div>
);
const MoreOptionsButton = () => <FontAwesomeIcon icon={faEllipsis} />;

export { Time, ReplyButton, RetweetButton, LikeButton, MoreOptionsButton };
