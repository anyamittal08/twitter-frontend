import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import {
    List,
    Divider,
    ListItem,
    Typography,
    ListItemAvatar,
    Avatar,
    TextField,
} from '@mui/material';

import config from '../../config';
import { UserContext } from '../../contexts/auth';
import Tweet from '../../components/Tweet';
import LogoutBtn from '../../components/LogoutBtn';
import { TweetButton } from '../../components/Buttons';

function HomePage() {
    const auth = useContext(UserContext);
    const [newTweet, setNewTweet] = useState('');
    const [searchQuery, setQuery] = useState('');

    const navigate = useNavigate();

    const {
        isLoading,
        error,
        data: tweets,
        refetch,
    } = useQuery('feed', () =>
        axios.get(`${config.api}/users/home`, {
            headers: { authorization: `Bearer ${auth.token}` },
        })
    );

    const { mutate } = useMutation(async (body) => {
        await axios.post(`${config.api}/tweets/post`, body, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        refetch();
        setNewTweet('');
    });

    async function fetchSearchResults(e) {
        e.preventDefault();
        await axios
            .get(`${config.api}/tweets/search/${searchQuery}`)
            .then((res) => console.log(res.data));
        navigate(`/search?q=${searchQuery}`);
    }

    const storeRecentSearchHistory = (searchQuery) => {
        localStorage.getItem('searchHistory')
            ? localStorage.getItem('searchHistory').append(searchQuery)
            : localStorage.setItem(
                  'searchHistory',
                  JSON.stringify([searchQuery])
              );

        console.log(localStorage.getItem('searchHistory'));
    };

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>error!!</div>;

    const postTweet = (e) => {
        e.preventDefault();
        console.log('here');
        mutate({ content: newTweet });
    };

    return (
        <>
            <Divider orientation="vertical" flexItem />
            <List sx={{ paddingTop: '10px' }}>
                <ListItem divider={true} sx={{ paddingTop: '0px' }}>
                    <Typography variant="h6">Home</Typography>
                </ListItem>
                <ListItem>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            paddingTop: '15px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <TextField
                                variant="standard"
                                label="What's Happening?"
                                style={{
                                    flex: '1',
                                }}
                                value={newTweet}
                                onChange={(e) => setNewTweet(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                marginTop: '15px',
                            }}
                        >
                            <TweetButton width="100px" onClick={postTweet} />
                        </div>
                    </div>
                </ListItem>
                <Divider />
                {tweets.data.map((tweet) => (
                    <Tweet
                        tweet={tweet}
                        key={tweet._id}
                        retweeters={tweet.retweetingFollows}
                    />
                ))}
            </List>
            <Divider orientation="vertical" flexItem />
        </>
    );
}

export default HomePage;
