import { Link } from '@mui/material';

import './styles.css';

const Message = ({ content }) => {
    return <div className="message">{content}</div>;
};

const Author = ({ author }) => {
    return (
        <span className="author">
            <span className="name">{author.displayName}</span>{' '}
            <span className="handle">{`@${author.username}`}</span>
        </span>
    );
};

const Retweeters = ({ retweeters, retweetedByUser, displayName }) => (
    <Link className="retweeters">
        {retweetedByUser
            ? `${displayName} retweeted`
            : retweeters?.length > 0
            ? `${retweeters[0].displayName} retweeted`
            : ''}
    </Link>
);
export { Message, Author, Retweeters };
