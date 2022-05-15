import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./comments.module.css";

function Comments(props) {
    const [comment, setComment] = useState([]);

    useEffect(() => {
        axios.get("/locations/${props.name}")
            .then(response => response.comment ? setComment(response.comment.response) : [])
    }, []);

    const addComment = (data) => {
        axios.post("/newComment", 
        {
            userName: props.username,
            values: data
        }).then(res => console.log(res.json()))
    }

    const displayComments = comment.map((comment, i) =>
        <div className={`card ${styles.commentbox}`} key={i}>
            <div className="card-body">
                <h5 className="card-title">{comment.user}</h5>
                <p className={`card-text ${styles.commentbody}`}>{comment.values}</p>
            </div>
        </div>    
    );

    return (
        <div className={`container ${styles.commentcontainer}`}>
            <h3 className={styles.commenthead}>Comments</h3>
            <br></br>
            {displayComments}
            {/* <div className={`card ${styles.commentbox}`} >
                 <div className="card-body">
                     <h5 className="card-title">User 1234</h5>
                     <p className={`card-text ${styles.commentbody}`}>Hi There!</p>
                 </div>
            </div>    
            <div className={`card ${styles.commentbox}`} >
                 <div className="card-body">
                     <h5 className="card-title">User 1234</h5>
                     <p className={`card-text ${styles.commentbody}`}>Hi There!</p>
                 </div>
            </div> */}
            <div className="addcoment">
                <textarea placeholder="Add a comment" className={styles.writecomment} rows={3} required></textarea>
                <br></br>
                <button type="submit" className={`btn btn-primary btn-lg ${styles.commentbutton}`} onClick={addComment}>Add Comment</button>
            </div>
        </div>
    )
}

export default Comments;