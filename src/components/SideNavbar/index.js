import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Person2Icon from '@mui/icons-material/Person2';
import TwitterIcon from '@mui/icons-material/Twitter';

import { TweetButton, LogoutButton } from '../Buttons';
import UserWithoutBio from '../User/UserWithoutBio';

const SideNavbar = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('auth')).user;
    const navigate = useNavigate();

    const DrawerContainer = styled('div')({
        overflow: 'auto',
    });

    const DrawerPaper = styled(Drawer)(() => ({
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '25%',
        },
    }));

    const ListItemButton = styled(ListItem)(({ theme }) => ({
        borderRadius: 10,
        margin: '10px 60px',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderRadius: 30,
            width: 'fit-content',
        },
        '&:active, &:visited': {
            color: 'inherit',
        },
    }));

    const NavOptions = styled(Typography)(() => ({
        marginLeft: '0.8em',
        fontWeight: 'medium',
        variant: 'body1',
        fontSize: '1.2em',
    }));

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth');
        navigate('/');
    };

    return (
        <DrawerPaper variant="permanent">
            <DrawerContainer
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* <Router> */}
                <List sx={{ flexGrow: 1 }}>
                    <ListItemButton component={Link} to="/home">
                        <TwitterIcon fontSize="large" color="primary" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/home">
                        <HomeIcon />
                        <ListItemText primary={<NavOptions>Home</NavOptions>} />
                    </ListItemButton>
                    <ListItemButton>
                        <TagIcon />
                        <ListItemText
                            primary={<NavOptions>Explore</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/notifications">
                        <NotificationsIcon />
                        <ListItemText
                            primary={<NavOptions>Notifications</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/messages">
                        <MailIcon />
                        <ListItemText
                            primary={<NavOptions>Messages</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/bookmarks">
                        <BookmarksIcon />
                        <ListItemText
                            primary={<NavOptions>Bookmarks</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={`/${loggedInUser.username}`}
                    >
                        <Person2Icon />
                        <ListItemText
                            primary={<NavOptions>Profile</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <TweetButton width="250px" />
                    </ListItem>
                    {/* <ListItem
                        sx={{
                            marginTop: 'auto',
                        }}
                    >
                        <UserWithoutBio
                            sx={{ margin: '10px 60px' }}
                            user={loggedInUser}
                        />
                        <LogoutButton />
                    </ListItem> */}
                </List>
                <Box sx={{ marginTop: 'auto' }}>
                    <ListItem>
                        <UserWithoutBio
                            sx={{ margin: '10px 60px' }}
                            user={loggedInUser}
                        />
                        <LogoutButton onClick={handleLogout} />
                    </ListItem>
                </Box>
                {/* </Router> */}
            </DrawerContainer>
        </DrawerPaper>
    );
};

export default SideNavbar;
