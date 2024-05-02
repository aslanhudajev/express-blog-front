/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  return (
    <section className="post-grid grid grid-cols-4">
      {posts.map((post) => {
        return (
          <PostCard
            key={post._id}
            title={post.title}
            content={post.content}
            posted={post.posted}
          />
        );
      })}
    </section>
  );
};

export default PostGrid;
