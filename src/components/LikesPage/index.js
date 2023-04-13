import axios from 'axios';
import config from '../../config';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Tweet from '../Tweet';

const LikesPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: likedTweets } = useQuery(
        'likedTweets',
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/likes`)
                .then((res) => res.data.map((like) => like.tweet)),
        {
            enabled: !!userData?.id,
        }
    );

    return (
        <>
            {likedTweets?.map((tweet) => {
                console.log(tweet);
                return <div>{JSON.stringify(tweet)}</div>;
            })}
        </>
    );
};

export default LikesPage;
