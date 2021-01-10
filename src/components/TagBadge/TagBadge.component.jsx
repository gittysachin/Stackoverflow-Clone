import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const TagBadge = ({ tag_name, size, padding, display, float , link, href, marginRight}) => {
    return <Fragment>
        <div className='tags-badge' style={{display, float, 'margin-right': marginRight}}>
            {href===true ?
                <a className={`${size}`} style={{padding}} href={link ? link : `/tags/${tag_name}`}>
                    {tag_name}
                </a> : <Link className={`${size}`} style={{padding}} to={link ? link : `/tags/${tag_name}`}>
                    {tag_name}
                </Link>
            }

        </div>
    </Fragment>
}

export default TagBadge;