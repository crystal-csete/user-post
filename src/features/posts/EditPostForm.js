/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postUpdated, selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <div className='editPost__container'>
      <section>
        <h2>Edit your post</h2>
        <form className='editPost__form'>
          <label htmlFor='postTitle'>Post Title:</label>
          <input
            type='text'
            id='postTitle'
            name='postTitle'
            placeholder="what's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor='postContent'>Content:</label>
          <textarea
            id='postContent'
            name='postContent'
            value={content}
            onChange={onContentChanged}
          />
          <button
            className='editPost__btn'
            type='button'
            onClick={onSavePostClicked}>
            Update Post
          </button>
        </form>
      </section>
    </div>
  );
};
