import { Component, useContext, useEffect, useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import v1 from "../../Videos/v1.mp4";
import "../VideoCard/videoCard.css";
import Comment from "../Comment/Comment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { firestore } from "../../Firebase/firebase";
import { AuthContext } from "../../AuthProvider";
let VideoCard = (props) => {
  const user = useContext(AuthContext);
  const [playing, setPlaying] = useState(false);
  const [comment, setComment] = useState("");
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [allComments, setAllComments] = useState("");

  // useEffect(() => {
  //   async function f() {
  //     let commentArr = props.data.comments;
  //     let arr = [];
  //     commentArr.map(async (e1) => {
  //       let data = await firestore.collection("comments").doc(e1).get();
  //       arr.push(data.data());
  //     });
  //     setAllComments(arr);
  //   }
  //   f();
  // }, [props])
  let currUserLiked;
  if (user) {
    currUserLiked = props.data.likes.includes(user.uid);
  }

  useEffect(() => {
    let f = async () => {
      let commentsArr = props.data.comments;
      let arr = [];
      for (let i = 0; i < commentsArr.length; i++) {
        let commentDoc = await firestore
          .collection("comments")
          .doc(commentsArr[i])
          .get();

        arr.push(commentDoc.data());
      }

      setAllComments(arr);
    };
    f();
  }, [props]);

  const handleComment = async () => {
    let docRef = await firestore.collection("comments").add({
      name: user.displayName,
      uid: user.uid,
      photo: user.photoURL,
      commentInfo: comment
    });
    let doc = await docRef.get()
    let commentId = doc.id;
    let postDoc = await firestore.collection("posts").doc(props.data.id).get();
    let postCommentArr = postDoc.data().comments;
    postCommentArr.push(commentId);
    await firestore.collection("posts").doc(props.data.id).update({
      comments: postCommentArr,
    });
    setComment("");
  }

  return (
    <div className="video-card">
      <p className="video-card-username">{props.data.name}</p>
      <span className="video-card-music">
        <MusicNoteIcon />
        <marquee>some song</marquee>
      </span>
      <ChatBubbleOutlineIcon className="video-card-comment" onClick={(e) => {
        if (commentBoxOpen) {
          setCommentBoxOpen(false);
        } else {
          setCommentBoxOpen(true);
        }
      }} />
      <span className="video-card-like" onClick={()=>{
        let likesArr = props.data.likes;
        if (currUserLiked) {
          likesArr = likesArr.filter((el) => el != user.uid);
        } else {
          likesArr.push(user.uid);
        }
        firestore
          .collection("posts")
          .doc(props.data.id)
          .update({ likes: likesArr });
      }}>
      {currUserLiked 
      ? <FavoriteIcon  onClick={()=>{}} /> 
      : <FavoriteBorderIcon/>}
      </span>



      {/* CommentBox */}
      {commentBoxOpen ? (
        <div className="video-card-comment-box">
          <div className="actual-comments">
            {allComments.map((e1, idx) => {
              return <Comment data={e1} key={idx} />
            })}
          </div>
          <div className="comment-form">
            <TextField id="standard-basic" label="Enter your comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
            <Button variant="contained" color="primary" onClick={handleComment} >
              Post
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}



      <video
        onClick={(e) => {
          if (playing) {
            e.currentTarget.pause();
            setPlaying(false);
          } else {
            e.currentTarget.play();
            setPlaying(true);
          }
        }}
        loop
        src={props.data.videoUrl}
        className="video-card-video"
      ></video>
    </div>
  );
};

export default VideoCard;