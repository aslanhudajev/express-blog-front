import { useQuery } from "@tanstack/react-query";
import PostGrid from "../Parts/PostGrid";
import PostCardSkeleton from "../Parts/PostCardSkeleton";

//!TODO Add fetch to get posts
//!TODO Specify which props, instead of destructuring props with ...
const HomePage = ({ ...props }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/blog/posts", {
        method: "GET",
        mode: "cors",
      });

      const data = await res.json();
      return data;
    },
  });

  if (isPending) {
    return (
      <section className="content grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="content">
        <h2>Uh oh, there are no posts here...</h2>
        <span>Error: {error.message}</span>
      </section>
    );
  }

  return (
    <section className="content">
      <PostGrid posts={data} />
    </section>
  );
};

export default HomePage;
