/* eslint-disable react/prop-types */
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  return (
    <section className="post-grid grid grid-cols-3 gap-y-4">
      {posts.map((post) => {
        return (
          <PostCard
            key={post._id}
            title={post.title}
            //!TODO Make sure that you create a sample content variable for each post
            content=/*{post.content}*/ "Aute sit nulla anim eiusmod irure et exercitation. Cillum quis sint nisi incididunt amet nisi nisi adipisicing proident nulla qu..."
            posted={post.posted}
          />
        );
      })}
    </section>
  );
};

export default PostGrid;
