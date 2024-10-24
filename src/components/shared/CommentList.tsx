import { Comment } from "@/types/product";
import React, { FC } from "react";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="container mx-auto flex flex-col gap-4 py-2 max-h-[400px] overflow-y-auto">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
