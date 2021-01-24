import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

function ProfileItem(props) {

  const {
    profile,
    status,
    company,
    location,
    skills = []
  } = props

  const {user} = profile

  if (!user) return null

  return (
    <div className="profile bg-light">
      <img  src={user.avatar} alt="" className="round-img" />
      <div>
        <h2>{user.name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${user._id}`} className="btn btn-primary">View profile</Link>
      </div>
      <ul>

        {skills.slice(0, 4).map((skill, index) => {
          return <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        })}
      </ul>
    </div>
  );
}

export default ProfileItem;