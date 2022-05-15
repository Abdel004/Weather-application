import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./comments.module.css";

function Comments(props) {
    const [comment, setComment] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        axios.get(`/location/${props.name}`)
            .then(response => response.data.response ? setComment(response.data.response.comments) : [])
    }, [props.name, refresh]);

    const handleChange = (e) => {
        const { value } = e.target
        setNewComment(value)
    }

    const addComment = () => {
        axios.post("/newComment",
            {
                name: props.name,
                userName: props.username,
                comment: newComment
            }).then(() => {
                setRefresh(old => !old)
                setNewComment("")
            })
    }

    const displayComments = comment.map((comment, i) =>
        <div className={`card ${styles.commentbox}`} key={i}>
            <div className="card-body">
                <h5 className="card-title">{comment.userName}</h5>
                <p className={`card-text ${styles.commentbody}`}>{comment.comment}</p>
            </div>
        </div>
    );

    return (
        <div className={`container ${styles.commentcontainer}`}>
            <h3 className={styles.commenthead}>Comments</h3>
            <br></br>
            {displayComments}
            <div className="addcoment">
                <textarea placeholder="Add a comment" className={styles.writecomment} rows={3} value={newComment} required onChange={handleChange}></textarea>
                <br></br>
                <button type="submit" className={`btn btn-primary btn-lg ${styles.commentbutton}`} onClick={() => addComment()}>Add Comment</button>
            </div>
        </div>
    )
}

export default Comments;