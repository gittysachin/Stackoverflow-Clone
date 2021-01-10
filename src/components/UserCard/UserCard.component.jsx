import React, {Fragment} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './UserCard.styles.scss';

const UserCard = ({
        creation_date,
        last_edit_date,
        last_activity_date,
        user,
        dateType,
        float,
        backgroundColor
    }) => {

    return <Fragment>
        <div className='owner' style={{float: float, backgroundColor: backgroundColor}}>
            <div className='user-block fc-black-500'>
                <div className='action-time'>
                    {last_edit_date ? 'modified' : 'asked'} { moment.unix(last_edit_date || creation_date).fromNow(true) } ago 
                    <Link className='user-profile-link fc-blue-600' to={`/users/${user.user_id}`}> [ {user.display_name} ] </Link>
                </div>
                {/* <div className='user-logo'>
                    <Link className='user-link' to={`/users/${user.user_id}`}>
                        <div className='logo-wrapper'>
                            <img alt='user_logo' src={`https://secure.gravatar.com/avatar/${user.user_id}?s=164&d=identicon`}/>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>
    </Fragment>
};

export default UserCard;