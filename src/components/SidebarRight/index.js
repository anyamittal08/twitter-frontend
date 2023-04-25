import { TextField, styled } from '@mui/material';
import { Drawer } from '@mui/material';

import UserListB from '../WhoToFollow';

const SidebarRight = () => {
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
                <Searchbar
                    label="Search Twitter"
                    variant="outlined"
                    fullWidth
                />
                <UserListB users={users} />
            </DrawerContainer>
        </DrawerPaper>
    );
};

export default SidebarRight;
