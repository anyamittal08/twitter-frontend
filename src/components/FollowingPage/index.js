import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserList';

const FollowingPage = () => {
    const { username } = useParams();

    const { data: userData } = useQuery('userData', () =>
        axios.get(`${config.api}/users/${username}`).then((res) => res.data)
    );

    const { data: followingData } = useQuery(
        'followingData',
        () =>
            axios
                .get(`${config.api}/users/${userData?.id}/following`)
                .then((res) =>
                    res.data.map((relationship) => relationship.targetUser)
                ),
        {
            enabled: !!userData?.id,
        }
    );

    return <UserList usersArr={followingData} />;
};

export default FollowingPage;
