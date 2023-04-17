import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import config from '../../config';
import UserList from '../UserList';

const RetweetedByPage = () => {
    const { tweetId } = useParams();

    const { data: retweetingUsers } = useQuery('retweetingUsers', () =>
        axios.get(`${config.api}/tweets/${tweetId}/retweetedBy`).then((res) => {
            console.log(res.data);
            return res.data;
        })
    );

    return <UserList usersArr={retweetingUsers} />;
};

export default RetweetedByPage;
