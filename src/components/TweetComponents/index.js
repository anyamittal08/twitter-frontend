import { Link as ReactRouterLink } from 'react-router-dom';

import { Link } from '@mui/material';
import moment from 'moment';

import { faRetweet } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = ({ content }) => {
    return <div className="message">{content}</div>;
};

const Author = ({ author }) => {
    return (
        <span className="author">
            <Link
                component={ReactRouterLink}
                to={`/${author.displayName}`}
                underline="hover"
                color="black"
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            >
                {author.displayName}
            </Link>
            <span
                className="handle"
                style={{ paddingLeft: '8px' }}
            >{`@${author.username}`}</span>
        </span>
    );
};

const Retweeters = ({ retweeters, retweetedByUser, displayName }) => (
    <div style={{ display: 'flex', gap: '12px', paddingLeft: '30px' }}>
        {retweetedByUser ? (
            <>
                <FontAwesomeIcon
                    icon={faRetweet}
                    style={{ color: '#657786' }}
                />{' '}
                <Link
                    component={ReactRouterLink}
                    to={`/${displayName}`}
                    className="retweeters"
                    underline="hover"
                    sx={{
                        cursor: 'pointer',
                        color: '#657786',
                        fontWeight: 'bold',
                        paddingBottom: '0px',
                    }}
                >
                    {' '}
                    {displayName} Retweeted{' '}
                </Link>
            </>
        ) : retweeters?.length > 0 ? (
            <>
                <FontAwesomeIcon
                    icon={faRetweet}
                    style={{ color: '#657786' }}
                />{' '}
                <Link
                    component={ReactRouterLink}
                    to={`/${retweeters[0].displayName}`}
                    className="retweeters"
                    underline="hover"
                    sx={{
                        cursor: 'pointer',
                        color: '#657786',
                        fontWeight: 'bold',
                        paddingBottom: '5px',
                    }}
                >
                    {' '}
                    {retweeters[0].displayName} Retweeted{' '}
                </Link>
            </>
        ) : (
            ''
        )}
    </div>
);

const Time = ({ timestamp }) => (
    <span className="time">{moment(timestamp).fromNow()}</span>
);

export { Message, Author, Retweeters, Time };
