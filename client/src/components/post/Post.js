import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getPost} from '../../actions/post'
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";


const Post = (props) => {
  const {getPost, post: {post, loading}, match} = props
  console.log(props)
  React.useEffect(() => {
    getPost(match.params.id)
  }, [getPost])

  return (
    loading || post === null
      ? <Spinner/>
      : <React.Fragment>
        <Link
          to="/posts"
          className="btn"
        />
        <PostItem
          post={post}
          showActions={false}
        />
        <CommentForm postId={post._id}/>
        <div className="comments">
          {
            post.comments.map(comment => {
              return <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            })
          }
        </div>
      </React.Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
})


export default connect(mapStateToProps, {getPost})(Post);