import { Box } from '@mui/material';

import SideNavbar from '../SideNavbar';
import SidebarRight from '../SidebarRight';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                // height: '100vh',
                // width: '100vw',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box>
                <SideNavbar anchor="left" />
            </Box>
            <Box sx={{ width: '50%' }}>{children}</Box>
            <Box>
                <SidebarRight anchor="right" />
            </Box>
        </Box>
    );
};

export default Layout;
