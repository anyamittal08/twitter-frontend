import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Person2Icon from '@mui/icons-material/Person2';
import TwitterIcon from '@mui/icons-material/Twitter';

import { TweetButton } from '../Buttons';

const SideNavbar = () => {
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
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderRadius: 30,
            width: 'fit-content',
        },
    }));

    const NavOptions = styled(Typography)(() => ({
        marginLeft: '0.8em',
        fontWeight: 'medium',
        variant: 'body1',
        fontSize: '1.2em',
    }));

    return (
        <DrawerPaper variant="permanent">
            <DrawerContainer sx={{ overflow: 'auto' }}>
                {/* <Router> */}
                <List>
                    <ListItemButton
                        p={2}
                        sx={{
                            cursor: 'pointer',
                            width: 'fit-content',
                            borderRadius: '50%!important',
                            border: '1px solid red',
                        }}
                        component={Link}
                        to="/home"
                    >
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
                    <ListItemButton>
                        <NotificationsIcon />
                        <ListItemText
                            primary={<NavOptions>Notifications</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <MailIcon />
                        <ListItemText
                            primary={<NavOptions>Messages</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <BookmarksIcon />
                        <ListItemText
                            primary={<NavOptions>Bookmarks</NavOptions>}
                        />
                    </ListItemButton>
                    <ListItemButton>
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
                </List>
                {/* </Router> */}
            </DrawerContainer>
        </DrawerPaper>
    );
};

export default SideNavbar;
