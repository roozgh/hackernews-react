import { useState, useEffect } from "react";
import { Comment as AntComment, Spin } from "antd";
import { formatDistanceToNow } from "date-fns";
import { config } from "../config";
import { Comment, CommentTree } from "../types/hackernews";
import { getItemsDetails } from "../services/api";

interface FlatCommentsProps {
  comments?: CommentTree;
}

interface CommentsProps {
  kids: number[];
}

const FlatComments = ({ comments }: FlatCommentsProps) => {
  if (!comments) return <></>;
  return (
    <>
      {comments.map(({ id, text, by, time, childComments }) => (
        <AntComment
          key={id}
          content={<p dangerouslySetInnerHTML={{ __html: text }}></p>}
          author={by}
          datetime={<span>{formatDistanceToNow(time * 1000)} ago</span>}
          children={<FlatComments comments={childComments} />}
        />
      ))}
    </>
  );
};

export const Comments = ({ kids }: CommentsProps) => {
  const [comments, setComments] = useState<CommentTree>([]);

  useEffect(() => {
    const fetch = async () => {
      const getCommentsRecursively = async (kids: number[], commentTree: CommentTree = []) => {
        const commentsDetails = await getItemsDetails(kids);
        for (let i = 0; i < kids.length; i++) {
          const commentID = kids[i];
          const comment = commentsDetails.find(({ id }) => id === commentID) as Comment;
          if (comment.kids) {
            comment.childComments = await getCommentsRecursively(comment.kids);
          }
          commentTree.push(comment);
        }
        return commentTree.slice(0, config.MAX_COMMENTS);
      };
      const comments = await getCommentsRecursively(kids);
      setComments(comments);
    };
    fetch();
  }, [kids]);

  return (
    <>
      {!comments.length ? (
        <Spin size="large" style={{ margin: 50, marginLeft: 250 }} />
      ) : (
        <FlatComments comments={comments} />
      )}
    </>
  );
};
