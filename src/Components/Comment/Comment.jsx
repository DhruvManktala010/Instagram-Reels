const Comment = (props) => {
    return (
    <div className="post-user-comment">
      <img src={props.data.photo} />
      <div>
        <h5>{props.data.name}</h5>
        <span>{props.data.commentInfo}</span>
      </div>
    </div>);
}
 
export default Comment;