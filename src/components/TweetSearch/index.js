import axios from 'axios';
import { useQuery } from 'react-query';
import config from '../../config';
import TweetList from '../TweetList';

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
        <div className="container">
            <div
                style={{
                    padding: '0px 20px',
                    position: 'sticky',
                    top: '0',
                    zIndex: '999',
                    background: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                <h2 style={{ margin: '0px' }}>Search Results</h2>
            </div>
            <div>
                <TweetList tweets={searchResults} />
            </div>
        </div>
    );
};

export default TweetSearch;
