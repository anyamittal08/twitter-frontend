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
        const response1 = await fetch(`${config.api}/users/${username}`);
        const data1 = await response1.json();

        const id = data1.userId;
        console.log(id);

        const response2 = await fetch(`${config.api}/users/${id}/tweets`);
        const data2 = await response2.json();
        console.log(data2);
        return data2;
    };

    useEffect(() => {
        fetchTweets(username).then((res) => setTweets(res));
    }, []);

    console.log(tweets);

    return (
        <>
            {tweets.map((tweet) => (
                <Tweet tweet={tweet} />
            ))}
        </>
    );
}
export default ProfilePage;
