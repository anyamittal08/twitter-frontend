import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserListA';

const FollowersPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: followerData } = useQuery(
        `${username}Followers`,
        async () => {
            const response = await axios.get(
                `${config.api}/users/${userData?.id}/followers`
            );
            const responseArr = response.data.map(
                (relationship) => relationship.follower
            );
            return responseArr;
        },
        {
            enabled: !!userData?.id,
        }
    );

    console.log(followerData);

    return <UserList usersArr={followerData} />;
};

export default FollowersPage;
