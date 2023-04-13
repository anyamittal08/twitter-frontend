import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import Tweet from '../Tweet';

import { UserContext } from '../../contexts/auth';
import { useContext } from 'react';

function ProfilePage() {
    const auth = useContext(UserContext);
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: tweets } = useQuery(
        'tweets',
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/tweets`, {
                    headers: { authorization: `Bearer ${auth.token}` },
                })
                .then((res) => res.data.map((tweet) => tweet)),
        {
            enabled: !!userData?.id,
        }
    );

    return (
        <>
            {tweets?.map((tweet) => {
                const retweeter = tweet.retweetedByUser ? [userData] : [];
                return (
                    <Tweet
                        tweet={tweet}
                        user={username}
                        key={tweet._id}
                        retweeters={retweeter}
                    />
                );
            })}
        </>
    );
}
export default ProfilePage;
