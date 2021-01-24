import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = props => {
  console.log(props)
  const {bio, skills, user: {name}} = props.profile
  return (
    <div className="profile-about bg-light p-2">
      {
        bio && (
          <React.Fragment>
            <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
            <p>
              {bio}
            </p>
          </React.Fragment>
        )
      }
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {
          skills.map((skill, index) => {
            return <div className="p-1" key={index}>
              <i className="fa fa-check"></i> {skill}
            </div>
          })
        }
        <div className="p-1"><i className="fa fa-check"></i> HTML</div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;