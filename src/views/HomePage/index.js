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
import { TweetButton } from '../../components/Buttons';
import { LoadingState, ErrorState } from '../../components/StatusComponents';
import Gravatar from '../../components/Gravatar';

function HomePage() {
    const auth = useContext(UserContext);
    const [newTweet, setNewTweet] = useState('');

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

    console.log(auth);

    const { mutate } = useMutation(async (body) => {
        await axios.post(`${config.api}/tweets/post`, body, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });

        refetch();
        setNewTweet('');
    });

    const postTweet = (e) => {
        e.preventDefault();
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
                                <Gravatar
                                    email={auth.user.email}
                                    username={auth.user.username}
                                />
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
                {isLoading ? (
                    <LoadingState />
                ) : error ? (
                    <ErrorState />
                ) : (
                    tweets.data.map((tweet) => (
                        <Tweet tweet={tweet} key={tweet._id} />
                    ))
                )}
            </List>
            <Divider orientation="vertical" flexItem />
        </>
    );
}

export default HomePage;
