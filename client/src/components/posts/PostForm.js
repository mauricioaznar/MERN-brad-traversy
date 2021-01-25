import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addPost} from "../../actions/post";

const PostForm = props => {

  const [text, setText] = React.useState('')

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={e => {
        e.preventDefault()
        props.addPost({
          text
        })
        setText('')
      }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          />
        <input
          type="submit"
          className="btn btn-dark my-1"
          value="Submit"
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, {addPost})(PostForm);