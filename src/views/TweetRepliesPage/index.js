import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Tweet from '../../components/Tweet';
import axios from 'axios';
import config from '../../config';
import { List } from '@mui/material';

const TweetRepliesPage = ({}) => {
    const { tweetId } = useParams();

    const {
        isLoading,
        isError,
        data: replies,
        error,
    } = useQuery('replies', () =>
        axios
            .get(`${config.api}/tweets/replies/${tweetId}`)
            .then((res) => res.data)
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{`And error occured: ${error}`}</div>;

    console.log(replies);

    return (
        <List>
            {replies?.map((reply) => (
                <Tweet tweet={reply} key={reply._id} />
            ))}
        </List>
    );
};
export default TweetRepliesPage;
