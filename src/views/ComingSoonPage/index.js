import { Divider, List, ListItem, Typography } from '@mui/material';

const ComingSoon = ({ feature }) => {
    return (
        <>
            <Divider orientation="vertical" flexItem />
            <List sx={{ paddingTop: '10px' }}>
                <ListItem divider={true} sx={{ paddingTop: '0px' }}>
                    <Typography variant="h6">{feature}</Typography>
                </ListItem>
                <ListItem>This feature is coming soon.</ListItem>
            </List>
        </>
    );
};

export default ComingSoon;
