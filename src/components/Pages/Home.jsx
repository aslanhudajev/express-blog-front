import { useQuery } from "@tanstack/react-query";
import PostGrid from "../Parts/PostGrid";

//!TODO Add fetch to get posts
//!TODO Specify which props, instead of destructuring props with ...
const HomePage = ({ ...props }) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/blog/posts", {
        method: "GET",
        mode: "cors",
      });
      return res.json();
    },
  });

  return (
    <section className="content">
      <PostGrid posts={data} />
    </section>
  );
};

export default HomePage;
