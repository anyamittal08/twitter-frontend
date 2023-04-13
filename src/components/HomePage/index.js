import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import {
    List,
    Grid,
    Divider,
    ListItem,
    Typography,
    ListItemAvatar,
    Avatar,
    TextField,
    Button,
} from '@mui/material';

import config from '../../config';
import { UserContext } from '../../contexts/auth';
import Tweet from '../Tweet';
import LogoutBtn from '../LogoutBtn';

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
        await axios.post(`${config.api}/tweets`, body, {
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
        mutate({ content: newTweet });
    };

    return (
        <>
            <div style={{ float: 'right' }}>
                <LogoutBtn />
                <form onSubmit={storeRecentSearchHistory}>
                    <TextField
                        id="filled-search"
                        label="Search Twitter"
                        type="search"
                        variant="filled"
                        value={searchQuery}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
            </div>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={6}>
                    <List>
                        <ListItem divider={true}>
                            <Typography variant="h6">Home</Typography>
                        </ListItem>
                        <ListItem divider={true}>
                            <form>
                                <Grid container>
                                    <Grid item container>
                                        <ListItemAvatar>
                                            <Avatar alt="profile-pic" />
                                        </ListItemAvatar>
                                        <TextField
                                            id="standard-basic"
                                            label="What's Happening?"
                                            variant="standard"
                                            multiline={true}
                                            value={newTweet}
                                            onChange={(e) =>
                                                setNewTweet(e.target.value)
                                            }
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={postTweet}
                                >
                                    Tweet
                                </Button>
                            </Grid>
                        </ListItem>
                        {tweets.data.map((tweet) => (
                            <Tweet
                                tweet={tweet}
                                key={tweet._id}
                                retweeters={tweet.retweetingFollows}
                            />
                        ))}
                    </List>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3}></Grid>
            </Grid>
        </>
    );
}

export default HomePage;
