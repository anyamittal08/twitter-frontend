import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';

import config from '../../config';
import { UserContext } from '../../contexts/auth';

function HomePage() {
    const auth = useContext(UserContext);

    const { isLoading, error, data } = useQuery('feed', () =>
        axios.get(`${config.api}/users/home`, {
            headers: { authorization: `Bearer ${auth.token}` },
        })
    );

    console.log(data);

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>error!!</div>;

    return (
        <>
            {data.data.map((tweet) => (
                <div>{tweet.content}</div>
            ))}
        </>
    );
}

export default HomePage;
