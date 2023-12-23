import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import axios from 'axios';
import { Divider, TextField } from '@mui/material';

import config from '../../config';

import { UserContext } from '../../contexts/auth';
import Tweet from '../../components/Tweet';
import { TweetButton } from '../../components/Buttons';
import TweetList from '../../components/TweetList';
import Gravatar from '../../components/Gravatar';

const TweetRepliesPage = ({}) => {
    const auth = useContext(UserContext);
    const { tweetId } = useParams();

    const [newReply, setNewReply] = useState('');

    const { isLoading, isError, data, error, refetch } = useQuery(
        `${tweetId}Replies`,
        () =>
            axios
                .get(`${config.api}/tweets/replies/${tweetId}`, {
                    headers: { authorization: `Bearer ${auth.token}` },
                })
                .then((res) => {
                    return res.data;
                })
    );

    const { mutate } = useMutation(async (body) => {
        await axios.post(`${config.api}/tweets/reply/${tweetId}`, body, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        refetch();
        setNewReply('');
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{`And error occured: ${error}`}</div>;

    const tweet = data.tweet;
    const threadArr = data.thread.slice(1);
    const repliesArr = data.replies;

    const postReply = (e) => {
        e.preventDefault();
        mutate({ content: newReply });
    };

    return (
        <div className="tweetRepliesContainer">
            <div
                style={{
                    padding: '10px 20px',
                    position: 'sticky',
                    top: '0',
                    zIndex: '999',
                    background: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                <h2 style={{ margin: '0px' }}>Thread</h2>
            </div>
            <div className="tweetContainer">
                <Tweet tweet={tweet} />
                <>
                    {tweet.likeCount > 0 ? (
                        <>
                            <div style={{ margin: '15px 10px' }}>
                                <span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {tweet.likeCount}
                                    </span>{' '}
                                    <span>
                                        {tweet.likeCount === 1
                                            ? 'Like'
                                            : 'Likes'}
                                    </span>
                                </span>
                            </div>
                            <Divider />
                        </>
                    ) : null}
                </>
            </div>

            {/* <div className="actionBtns">

                </div> */}
            <form
                style={{
                    display: 'flex',
                    margin: '20px 15px',
                    gap: '15px',
                }}
            >
                <Gravatar
                    email={auth.user.email}
                    username={auth.user.username}
                />
                <TextField
                    hiddenLabel
                    variant="standard"
                    placeholder="Tweet your reply"
                    size="large"
                    sx={{ flexGrow: '3' }}
                    InputProps={{
                        disableUnderline: true,
                        style: { fontSize: 20 },
                    }}
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                />
                <TweetButton onClick={postReply} />
            </form>
            <Divider />
            <div className="thread">
                <TweetList tweets={threadArr} />
            </div>
            <div className="replies">
                <TweetList tweets={repliesArr} />
            </div>
        </div>
    );
};
export default TweetRepliesPage;
