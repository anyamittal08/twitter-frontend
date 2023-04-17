import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserList';

const LikedByPage = () => {
    const { tweetId } = useParams();

    const { data: likingUsers } = useQuery('likeingUsers', () =>
        axios.get(`${config.api}/tweets/${tweetId}/likedBy`).then((res) => {
            return res.data;
        })
    );

    return <UserList usersArr={likingUsers} />;
};

export default LikedByPage;
