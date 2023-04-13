import axios from 'axios';
import { useQuery } from 'react-query';
import config from '../../config';

const TweetSearch = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get('q');

    const {
        isLoading,
        data: searchResults,
        isError,
        error,
    } = useQuery('searchTweets', () =>
        axios
            .get(`${config.api}/tweets/search/${searchQuery}`)
            .then((res) => res.data)
    );

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <div>
            <div>Search Results:</div>
            {searchResults.map((tweet) => (
                <>
                    <br />
                    <div key={tweet.id}>{JSON.stringify(tweet)}</div>
                </>
            ))}
        </div>
    );
};

export default TweetSearch;
