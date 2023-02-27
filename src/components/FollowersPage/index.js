import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';

const FollowersPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: followerData } = useQuery(
        'followerData',
        () =>
            axios
                .get(`${config.api}/users/${userData?.userId}/followers`)
                .then((res) => res.data),
        {
            enabled: !!userData?.userId,
        }
    );

    return (
        <div>
            {followerData?.map((follower) => {
                return (
                    <ul>
                        <li>{follower.follower.displayName}</li>
                    </ul>
                );
            })}
        </div>
    );
};

export default FollowersPage;
