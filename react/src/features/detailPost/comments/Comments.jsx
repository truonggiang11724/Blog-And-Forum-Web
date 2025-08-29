import React, { useEffect, useState } from 'react';
import styles from './comments.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, fetchComments, updateComment } from './commentsSlice'
import moment from 'moment';

const Comments = () => {
    // fetch comments
    const { id } = useParams();
    const { listComment, loading } = useSelector((state) => state.comments)
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) dispatch(fetchComments({ post_id: id }));
    }, [])

    // create comment
    const [comment, setComment] = useState('');
    const handleComment = (e) => {
        e.preventDefault();
        if (document.getElementById('submitButton').innerText == "Sửa") {
            dispatch(updateComment({ id: commentEdit, commentData: { content: comment } }));
            document.getElementById('submitButton').innerText = "Gửi";
            cancelButton.style.display = 'none';
        } else
            dispatch(createComment({
                post_id: id,
                content: comment,
            }));
        setComment('');
        setCommentEdit(null);
    }

    // edit comment
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    let cancelButton = document.getElementById('cancelButton');
    const [commentEdit, setCommentEdit] = useState(null);

    const handleEdit = (idEdit, content) => {
        setCommentEdit(idEdit);
        cancelButton.style.display = 'inline-block';
        setComment(content);
        document.getElementById('commentInput').focus();
        document.getElementById('submitButton').innerText = "Sửa";
    }

    const handleCancel = () => {
        setCommentEdit(null);
        cancelButton.style.display = 'none';
        document.getElementById('submitButton').innerText = "Gửi";
        setComment('');
    }

    return (
        <>
            <div className={styles.commentList}>
                {listComment.data && ( !loading ?
                    listComment.data.map(c => (
                        <div key={c.id} className={styles.comment}>
                            <strong className={styles.commentAuthor}>{c.user_name}</strong>
                            <span className={styles.commentTime}>{moment(c.created_at).format('h:mmA DD-MM-YYYY')}</span>
                            <p className={styles.com}>{c.content}</p>
                            {user_id === c.user_id &&
                                <button className={styles.editButton} onClick={() => handleEdit(c.id, c.content)}>Sửa</button>
                            }
                        </div>
                    ))
                    : <p>Loading...</p>
                )}

            </div>
            <form onSubmit={handleComment}>
                <textarea id='commentInput' className={styles.commentInput} placeholder="Viết bình luận..."
                    value={comment} onChange={e => setComment(e.target.value)}
                />
                <button id='submitButton' className={styles.commentButton} type="submit">Gửi</button>
                <button id='cancelButton' className={styles.cancelButton} onClick={handleCancel} type='button'>Hủy</button>
            </form>
        </>
    );
}

export default Comments;
