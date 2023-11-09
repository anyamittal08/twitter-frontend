import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Link as ReactRouterLink } from 'react-router-dom';
import { Tab, TextField, styled, Divider } from '@mui/material';

import config from '../../config';

import UserList from '../UserListA';
import TweetList from '../../components/TweetList';

const Searchbar = styled(TextField)(({ theme }) => ({
    marginTop: '20px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '25px',
        },
    },
}));

const SearchResultsPage = ({ startingTab }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(queryParams.get('q'));

    const [activeTab, setActiveTab] = useState(startingTab);

    const {
        isLoading,
        isError,
        data: searchResults,
        error,
        refetch,
    } = useQuery(`${activeTab}Search`, async () => {
        const res = await axios.get(
            `${config.api}/${activeTab}/search/${searchQuery}`
        );
        return res.data;
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        refetch();
    };

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>{error.message}</span>;

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <form onSubmit={handleFormSubmit} style={{ width: '90%' }}>
                    <Searchbar
                        value={searchQuery}
                        label="Search Twitter"
                        variant="outlined"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    color: '#657786',
                    width: '100%',
                    margin: '0px',
                    padding: '0px',
                }}
            >
                <Tab
                    label="people"
                    onClick={() => setActiveTab('users')}
                    component={ReactRouterLink}
                    to={'/search'}
                    sx={{
                        color: '#657786',
                        borderBottom:
                            activeTab === 'users' ? '5px solid #1DA1F2' : '',
                        '&:hover': {
                            backgroundColor: '#E1E8ED',
                        },
                    }}
                />
                <Tab
                    label="tweets"
                    onClick={() => setActiveTab('tweets')}
                    component={ReactRouterLink}
                    to={'/search/tweets'}
                    sx={{
                        color: '#657786',
                        borderBottom:
                            activeTab === 'tweets' ? '5px solid #1DA1F2' : '',
                        '&:hover': {
                            backgroundColor: '#E1E8ED',
                        },
                    }}
                />
            </div>
            <Divider />
            {activeTab === 'users' ? (
                <UserList usersArr={searchResults} />
            ) : (
                <TweetList tweets={searchResults} />
            )}
        </>
    );
};

export default SearchResultsPage;
