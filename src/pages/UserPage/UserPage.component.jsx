import React, {useEffect, Fragment} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { getTags } from '../../redux/tags/tags.actions';
import { getTopPostsByUser } from '../../redux/posts/posts.actions';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/LogoGlyphMd.svg';


import PostItem from '../../components/PostItem/PostItem.component';
import LinkButton from '../../components/LinkButton/LinkButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner.component';
import TagBadge from '../../components/TagBadge/TagBadge.component';

import './UserPage.styles.scss'

const UserPage = ({ getUser, user: { user, loading }, match, getTags, tag: { tags }, getTopPostsByUser, post: { posts } }) => {
    useEffect(() => {
        getUser(match.params.id);
        getTags(match.params.id);
        getTopPostsByUser(match.params.id);
        // eslint-disable-next-line
    }, [getUser, getTags, getTopPostsByUser]);

    return loading || user === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`User ${user.username} - CLONE Stack Overflow`}/>
        <div id='mainbar' className='user-main-bar pl24 pt24'>
            <div className='user-card'>
                <div className="grid--cell s-navigation mb16">
                    <Link to="#" className="s-navigation--item is-selected"
                          data-shortcut="P">Profile</Link>
                    <Link to="#" className="s-navigation--item"
                          data-shortcut="A">Activity</Link>
                </div>
                <div className='grid'>
                          {console.log(user)}
                    <div className='img-card'>
                        <div className='avatar-card'>
                            <div className='avatar'>
                                <Link className='avatar-link' to={`/users/${user.user_id}`}>
                                    <div className='logo-wrapper'>
                                        <img src={user.profile_image} alt='user-logo'/>
                                    </div>
                                </Link>
                            </div>
                            <div className='title'>
                                <div className='grid fc-black-800'>
                                    {user.reputation}
                                    &nbsp;
                                    <span className='fc-light'>
                                        REPUTATION
                                    </span>
                                </div>
                            </div>
                            <div className='badges'>
                                <div className='flex gs4 flex__fl1'>
                                    <div class="flex--cell">
                                        <div class="flex ai-center s-badge s-badge__gold" title={`4 gold badges`}>
                                            <span class="flex--cell badge1"></span>
                                            <span class="flex flex__center fl1">{user.badge_counts['gold']}</span>
                                        </div>
                                    </div>

                                    <div class="flex--cell">
                                        <div class="flex ai-center s-badge s-badge__silver" title="26 silver badges">
                                            <span class="flex--cell badge2"></span>
                                            <span class="flex flex__center fl1">{user.badge_counts['silver']}</span>
                                        </div>
                                    </div>

                                    <div class="flex--cell">
                                        <div class="flex ai-center s-badge s-badge__bronze" title="40 bronze badges">
                                            <span class="flex--cell badge3"></span>
                                            <span class="flex flex__center fl1">{user.badge_counts['bronze']}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-card'>
                        <div className='content-grid'>
                            <div className='info-cell'>
                                <div className='info'>
                                    <div className='details'>
                                        <h2>{user.display_name}</h2>
                                    </div>
                                    <div className='details'>
                                        <h2>{user.location}</h2>
                                    </div>
                                    <div className='details'>
                                        <Link to={user.link} className='-link'>{user.link}</Link>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row-grid'>
                <div className='grid-cell1'>
                    <div className='cell-layout'>
                        <div className='community'>
                            <h3 className='bc-black-3'>
                                    <span className='icon'>
                                        <svg aria-hidden='true' className='svg-icon native icon-logo-sex' width='18' height='18' viewBox='0 0 18 18'>
                                            <path d='M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2H3z' fill='#8FD8F7'/>
                                            <path d='M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2z' fill='#155397'/>
                                            <path fill='#46A2D9' d='M3 5h12v2H3z'/><path fill='#2D6DB5' d='M3 8h12v2H3z'/>
                                        </svg>
                                    </span>
                                <span className='text fw-bold fc-dark bc-black-3'>Communities</span>
                            </h3>
                            <ul>
                                <li className='item'><Link to='/'>
                                    <span><Logo className='logo'/></span>
                                    <span className='fc-blue-600 fs-body2'>Stack Overflow</span>
                                </Link></li>
                            </ul>
                        </div>
                        <div className='user-posts'>
                            <h3 className='fw-bold fc-dark bc-black-3'>
                                Top network posts
                            </h3>
                            <p className='fc-light'>
                                We respect a laser-like focus on one topic.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='grid-cell2'>
                    <div className='top-tags'>
                        <h3 className='fw-bold fc-dark bc-black-3'>
                            Top Tags
                        </h3>
                        {tags.map(tag => (
                            <div className='top-tags-sec'>
                                <div className='top-tags-cells'>
                                    <div className='top-cell'>
                                        <div className='tag-cell bg-black-025'>
                                            <TagBadge
                                                tag_name={tag.name}
                                                size={'s-tag s-tag__lg'}
                                                float={'left'}
                                                />
                                            <div className='score'>
                                                <div className='score-txt'>
                                                    <div className='score-tab'>
                                                        <span className='txt fc-light'>SCORE</span>
                                                        <span className='number fc-black-800'>{tag.count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='row-grid bl1'>
                <div className='questions-grid'>
                    <h3 className='questions-headline'>Top Questions</h3>
                    <div className="questions-btn">
                        <LinkButton
                            text={'Ask Question'}
                            link={'/add/question'}
                            type={'s-btn__primary'}
                        />
                    </div>
                </div>
                <div className='questions-tabs'>
                    <span>{new Intl.NumberFormat('en-IN').format(posts.length)} questions</span>
                </div>
                <div className='questions'>
                    {posts.map(post => (
                        <PostItem key={post.id} post={post}/>
                    ))}
                </div>
            </div>
        </div>
    </Fragment>
};

UserPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    getTags: PropTypes.func.isRequired,
    getTopPostsByUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    tag: state.tag,
    post: state.post
});

export default connect(mapStateToProps, { getUser, getTags, getTopPostsByUser })(UserPage);