import { useQuery } from 'react-query';
import axios from 'axios';
import config from '../../config';
import User from '../User';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get('q');

    const {
        isLoading,
        isError,
        data: userSearchResults,
        error,
    } = useQuery('userSearch', () =>
        axios
            .get(`${config.api}/users/search/${searchQuery}`)
            .then((res) => res.data)
    );

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>{error.message}</span>;

    console.log(userSearchResults);

    return (
        <>
            <Link to={`/search/tweets?q=${searchQuery}`}>Tweets</Link>
            {userSearchResults?.map((user) => (
                <User user={user} />
            ))}
        </>
    );
};

export default SearchResultsPage;
