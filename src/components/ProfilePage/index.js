import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import Tweet from '../Tweet';

function ProfilePage() {
    const { username } = useParams();

    const fetchTweets = async (username) => {
        const { data: data1 } = await axios.get(
            `${config.api}/users/${username}`
        );

        const id = data1.userId;

        const { data: data2 } = await axios.get(
            `${config.api}/users/${id}/tweets`
        );
        return data2;
    };

    const {
        isLoading,
        isError,
        data: tweets,
        error,
    } = useQuery(['tweets', username], () => fetchTweets(username));

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            {tweets.map((tweet) => {
                return <Tweet tweet={tweet} key={tweet.id} />;
            })}
        </>
    );
}
export default ProfilePage;
