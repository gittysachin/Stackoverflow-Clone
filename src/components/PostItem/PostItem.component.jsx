import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

import './PostItem.styles.scss';

const PostItem = ({ post: { id, title, score, tags, answer_count, view_count, creation_date, last_edit_date, last_activity_date, owner } }) => {
    const answerVoteUp = (
        <div className='vote answer'>
            <span className='vote-count fc-green-500'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    const answerVoteDown = (
        <div className='vote'>
            <span className='vote-count'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    return (
        <div className='posts'>
            <div className='stats-container fc-black-500'>
                <div className='vote'>
                    <span className='vote-count'>{score}</span>
                    <div className='count-text'>votes</div>
                </div>
                { answer_count > 0 ? answerVoteUp : answerVoteDown}
                <div className='vote'>
                    <span className='vote-count'>{view_count}</span>
                    <div className='count-text'>views</div>
                </div>
            </div>
            <div className='summary'>
                <h3><Link to={`/questions/${id}`}>
                    {title}
                </Link></h3>
                <div className='brief'>
                    {/* {body.substring(0, 200)}... */}
                </div>
                {tags.map(tag => (
                    <TagBadge
                        tag_name={tag}
                        size={'s-tag'}
                        float={'left'}
                        marginRight={'11px'}
                        padding={'0 5px'}
                    />
                ))}
                <UserCard
                    creation_date={creation_date}
                    last_edit_date={last_edit_date}
                    last_activity_date={last_activity_date}
                    user={owner}
                    float={'right'}
                    backgroundColor={'transparent'}
                />
            </div>
        </div>

    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};


export default connect(null)(PostItem);