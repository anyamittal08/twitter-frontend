import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import config from '../../config';

const FollowersPage = () => {
    const { username } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        async function fetchFollowers() {
            try {
                const { data: userData } = await axios.get(
                    `${config.api}/users/${username}`
                );
                const userId = userData.userId;

                const { data: followersData } = await axios.get(
                    `${config.api}/users/${userId}/followers`
                );
                const followers = followersData.map(
                    (relationship) => relationship.follower
                );

                setFollowers(followers);
            } catch (err) {
                console.log(err);
            }
        }
        fetchFollowers();
    }, []);

    return (
        <div>
            {followers.map((follower) => {
                return (
                    <ul>
                        <li>{follower.displayName}</li>
                    </ul>
                );
            })}
        </div>
    );
};

export default FollowersPage;
