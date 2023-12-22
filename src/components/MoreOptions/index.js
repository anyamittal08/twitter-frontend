import axios from 'axios';
import { useMutation } from 'react-query';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const MoreOptions = ({ clickHandler }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon
                style={{ cursor: 'pointer' }}
                icon={faEllipsis}
                onClick={clickHandler}
            />
        </div>
    );
};

export default MoreOptions;
