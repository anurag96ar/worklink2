import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/state";
import PostWidget from "./PostWidget";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { instance } from "../../services/axiosInterceptor";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  const [posts, setPostData] = useState([]);
  const [post, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const token = useSelector((state) => state.token);
  const email = useSelector((state) => state.user.email);

  const getPosts = async (fromCallback = false,index=0) => {
   
    try {
      const formData = new FormData();
      formData.append("email", email);

      formData.append("page", fromCallback?index: page );


      const response = await instance.post(
        "/getPost",
        formData,
        {
          headers: {
            
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      // dispatch(setPostData(data));
       await delay(800);
        if (data.length > 0) {
       
         // Assuming 'posts' is your existing data array and 'newData' is the updated data

         if(fromCallback){

         
const updatedPosts = posts.map((post) => {
  
  // Find the corresponding post in 'newData' based on a unique identifier (e.g., 'id')
  const updatedPost = data.find((newPost) => newPost._id === post._id);
 
  // If there's an updated post in 'newData', merge the changes
  if (updatedPost) {
    return  {...post, ...updatedPost };
    
  }

  // If no update is found, return the original post
  return post;
});

// Update the state with the updated 'posts' array
setPostData(updatedPosts);

         }
         else{
          setPostData([...posts, ...data]);
          setPage(page + 1);
         }
         
        } else {
       
          setHasMore(false);
        
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle errors here
    }
  };

  const getUserPosts = async (fromCallback=false, index=0) => {
  
    try {
      const response = await instance.get(
        `/posts/${userId}/${fromCallback?index: page}/posts`,
        
      );
      const data = response.data;
      // dispatch(setPostData(data));
     
      if (data.length > 0) {
     
       // Assuming 'posts' is your existing data array and 'newData' is the updated data

       if(fromCallback){

       
const updatedPosts = posts.map((post) => {

// Find the corresponding post in 'newData' based on a unique identifier (e.g., 'id')
const updatedPost = data.find((newPost) => newPost._id === post._id);

// If there's an updated post in 'newData', merge the changes
if (updatedPost) {
  return  {...post, ...updatedPost };
  
}

// If no update is found, return the original post
return post;
});

// Update the state with the updated 'posts' array
setPostData(updatedPosts);

       }
       else{
        setPostData([...posts, ...data]);
        setPage(page + 1);
       }
       
      } else {
       
        setHasMore(false);
      
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Handle errors here
  }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function CallBack(data,postId) {
   
if(postId!=undefined){
  const updatedPosts = posts.filter((post) => post._id !== postId);

// Update the state with the updated 'posts' array
setPostData(updatedPosts);
}else{
  if (isProfile) {
    getUserPosts(true,data);
  } else {
    getPosts(true,data);
  }
}
}

function delay(t) {
  return new Promise(resolve => setTimeout(resolve, t));
}
    

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={isProfile ? getUserPosts : getPosts}
        hasMore={hasMore}
        loader={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            {" "}
            <img src={"/loader.gif"}></img>
          </div>
        }
      >
        {posts.map(
          (
            {
              _id,
              userId,
              email,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
              isBlocked,
            },
            postIndex
          ) => (
            <PostWidget
              handleCallback={CallBack}
              isProfile={isProfile}
              key={_id}
              postId={_id}
              postUserId={userId}
              postEmail={email}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              isBlocked={isBlocked}
              index={postIndex}
            />
          )
        )}
      </InfiniteScroll>
    </>
  );
};

export default PostsWidget;
