import { useParams } from 'react-router-dom';

const FollowingPage = () => {
    const { username } = useParams();

    return <pre>{`${username}'s following list`}</pre>;
};

export default FollowingPage;
