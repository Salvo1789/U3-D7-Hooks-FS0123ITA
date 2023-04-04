import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { useState, useEffect } from "react";

const CommentArea = (props) => {
  
  const [comments, setComments] = useState([])

  // componentDidMount ora avverrà al primo montaggio del componente, cioè dopo la prima selezione di una card nella lista
  useEffect(() => {
    fetchComments()
  }, [props.asin])

  // fetchComments viene chiamato in: componentDidMount, componentDidUpdate e anche dopo la post interna ad AddComment
  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYTIxNmM1NmIzNjAwMTMzZmU1NjMiLCJpYXQiOjE2ODA1MzIwNDgsImV4cCI6MTY4MTc0MTY0OH0.e62TCLuZDwZJwVf8hqJB86E-Xp09cW_yXxxcutaNFYc"
        }
      });

      if (response.ok) {
        const commentsArr = await response.json();
        setComments(commentsArr)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddComment asin={props.asin} fetchComments={fetchComments} />
      <CommentsList comments={comments} fetchComments={fetchComments} />
    </div>
  );
}

export default CommentArea;
