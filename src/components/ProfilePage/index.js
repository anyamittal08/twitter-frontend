import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import Tweet from '../Tweet';

function ProfilePage() {
    const { username } = useParams();
    const [tweets, setTweets] = useState([]);

    const fetchTweets = async (username) => {
        const { data: data1 } = await axios.get(
            `${config.api}/users/${username}`
        );
        console.log(data1);

        const id = data1.userId;

        const { data: data2 } = await axios.get(
            `${config.api}/users/${id}/tweets`
        );
        console.log(data2);
        return data2;
    };

    useEffect(() => {
        fetchTweets(username).then((res) => setTweets(res));
    }, []);

    return (
        <>
            {tweets.map((tweet) => (
                <Tweet tweet={tweet} />
            ))}
        </>
    );
}
export default ProfilePage;
