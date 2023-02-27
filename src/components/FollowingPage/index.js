import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';

const FollowingPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: followingData } = useQuery(
        'followingData',
        () =>
            axios
                .get(`${config.api}/users/${userData?.userId}/following`)
                .then((res) => res.data),
        {
            enabled: !!userData?.userId,
        }
    );

    return (
        <div>
            {followingData?.map((following) => {
                return (
                    <ul>
                        <li>{following.targetUser.displayName}</li>
                    </ul>
                );
            })}
        </div>
    );
};

export default FollowingPage;
