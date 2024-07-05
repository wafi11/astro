import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import useUserProfile from "../../layouts/classProfile";
import { Buttonlike, ButtonlikeReply } from "./Buttonlike";
import ButtonDelete from "./ButtonsDelete";

type UserType = {
  id: string;
  name: string;
  image: string | null;
};

type Likes = {
  id : string | null
  likes  : boolean
}

type CommentType = {
  id: string;
  text: string;
  likes : Likes[]
  createdAt: Date;
  user: UserType;
  replies: CommentType[];
};

type Props = {
  postId: string;
  data: CommentType[];
};

const Comment = ({ postId, data }: Props) => {
  const { userProfile } = useUserProfile();
  const [input, setInput] = useState("");
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  const [replyingTo, setReplyingTo] = useState<{ commentId: string | null, userName: string | null }>({ commentId: null, userName: null });
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };


  const handleClick = async () => {
    if (input.trim() === "") {
      return;
    }
    
    if (replyingTo.commentId) {
      await handleReplyClick(replyingTo.commentId, replyingTo.userName);
    } else {
      await handleCommentClick();
    }
  };

  const handleCommentClick = async () => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          blogId: postId,
          userId: userProfile.id,
        }),
      });

      if (response.ok) {
        setInput("");
        setReplyingTo({ commentId: null, userName: null });
        window.location.reload(); // Reload to see the new comment
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplyClick = async (parentCommentId: string, userName: string | null) => {
    try {
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          userId: userProfile.id,
          commentId:  parentCommentId,
        }),
      });

      if (response.ok) {
        setInput("");
        setReplyingTo({ commentId: null, userName: null });
        window.location.reload(); // Reload to see the new reply
      } else {
        console.error("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const toggleExpand = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  }

  const handleReplyButtonClick = (commentId: string, userName: string) => {
    setReplyingTo({ commentId, userName });
    setInput(`@${userName} `);
  };


  const formatTextWithLinks = (text : string) => {
    const mentionRegex = /@(\w+)/g;
    return text.replace(mentionRegex, (match, username) => (
        `<a href=${text} class="text-blue-500">@${username}</a>`
    ));
};
  const renderComments = (comments: CommentType[],commentId : string) => {
    return comments.map((comment) => {
      return (
      <div key={comment.id} className="p-2">
        <div className="flex items-center gap-2">
          <img
            src={comment.user.image || "/src/assets/placeholder.jpg"}
            alt="User Profile"
            className="w-10 h-10 rounded-full bg-gray-200"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-semibold">{comment.user.name}</p>
              <span dangerouslySetInnerHTML={{ __html: formatTextWithLinks(comment.text) }}></span>
              </div>
            <p className="text-gray-500 text-sm">
              {format(new Date(comment.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="flex flex-row  px-20">
          <button onClick={() => handleReplyButtonClick(commentId, comment.user.name)}>
          <FontAwesomeIcon icon={faReply} />
          </button>
          <ButtonlikeReply commentId={comment.id} />
          <ButtonDelete replyId={comment.id}/>
        </div>
      </div>
    )});
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((comment) => {
        return (
         <div key={comment.id} className="border rounded-lg p-4">
         <div className="flex items-center gap-2">
           <img
             src={comment.user.image || "/src/assets/placeholder.jpg"}
             alt="User Profile"
             className="w-10 h-10 rounded-full bg-gray-200"
           />
           <div className="flex flex-col w-full">
             <div className="flex items-center gap-2 mb-2">
               <p className="font-semibold">{comment.user.name}</p>
               <p>{comment.text}</p>
             </div>
             <p className="text-gray-500 text-sm">
               {format(new Date(comment.createdAt), "dd MMM yyyy")}
             </p>
           </div>
         </div>
         <div className="flex flex-col px-10">
          <div className="flex flex-row ">
          <button onClick={() => handleReplyButtonClick(comment.id, comment.user.name)}>
          <FontAwesomeIcon icon={faReply} />
          </button>
          <Buttonlike commentId={comment.id} />
          <ButtonDelete commentId={comment.id}/>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => toggleExpand(comment.id)} className="flex justify-start">
              {expandedComments[comment.id] ? "---- Hide results ----" : "---- Show Results ----"}
            </button>
          )}
        </div>
        {expandedComments[comment.id] && comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4">
            {renderComments(comment.replies, comment.id)}
          </div>
        )}
      </div>
      )})}
      <div className="flex items-center border-b-2 border-black">
        <textarea
          id="comment"
          placeholder="Write a comment..."
          className="w-full h-auto max-h-[300px] border-none focus:outline-none"
          onChange={handleInputChange}
          value={input}
        />
        <button
          id="sendComment"
          className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
          onClick={handleClick}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
