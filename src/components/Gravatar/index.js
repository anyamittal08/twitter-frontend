import md5 from 'crypto-js/md5';

import { Avatar } from '@mui/material';

const Gravatar = ({ email, username, style }) => {
    const cleanedEmail = email?.trim().toLowerCase();
    const hashedEmail = md5(cleanedEmail).toString();
    return (
        <Avatar
            alt={`${username}-img`}
            src={`https://www.gravatar.com/avatar/${hashedEmail}?d=wavatar&s=200`}
            sx={style}
        />
    );
};

export default Gravatar;
