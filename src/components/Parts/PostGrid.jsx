/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  return (
    <section className="post-grid grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
      {posts.map((post) => {
        return (
          <Link key={post._id} to={`/post/${post._id}`}>
            <PostCard
              key={post._id}
              title={post.title}
              //!TODO Make sure that you create a sample content variable for each post
              content={post.content}
              posted={post.posted}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default PostGrid;
