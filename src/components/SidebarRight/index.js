import { useState } from 'react';
import axios from 'axios';

import { TextField, styled } from '@mui/material';
import { Drawer } from '@mui/material';

import UserListB from '../WhoToFollow';
import { useNavigate } from 'react-router-dom';

import config from '../../config';

const DrawerContainer = styled('div')({
    paddingTop: '5px',
    overflow: 'auto',
});

const DrawerPaper = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: '25%',
        padding: '5px 25px',
    },
}));

const Searchbar = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '25px',
        },
    },
}));

const SidebarRight = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const users = [
        {
            displayName: 'Anya M',
            username: 'anyamittal',
        },
        {
            displayName: 'Anya M',
            username: 'anyamittal',
        },
        {
            displayName: 'Anya M',
            username: 'anyamittal',
        },
    ];

    // const { mutate } = useMutation(async (body) => {
    //     await axios.post(`${config.api}/tweets/post`, body, {
    //         headers: {
    //             Authorization: `Bearer ${auth.token}`,
    //         },
    //     });

    //     refetch();
    //     setNewTweet('');
    // });

    async function fetchSearchResults(e) {
        e.preventDefault();
        console.log('here');
        await axios
            .get(`${config.api}/tweets/search/${searchQuery}`)
            .then((res) => console.log(res.data));

        navigate(`/search?q=${searchQuery}`);

        setSearchQuery('');
    }

    // const storeRecentSearchHistory = (searchQuery) => {
    //     localStorage.getItem('searchHistory')
    //         ? localStorage.getItem('searchHistory').append(searchQuery)
    //         : localStorage.setItem(
    //               'searchHistory',
    //               JSON.stringify([searchQuery])
    //           );

    //     console.log(localStorage.getItem('searchHistory'));
    // };

    return (
        <DrawerPaper
            anchor={'right'}
            variant="permanent"
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            }}
        >
            <DrawerContainer sx={{ overflow: 'auto' }}>
                <form onSubmit={fetchSearchResults}>
                    <Searchbar
                        value={searchQuery}
                        label="Search Twitter"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                <UserListB users={users} />
            </DrawerContainer>
        </DrawerPaper>
    );
};

export default SidebarRight;
