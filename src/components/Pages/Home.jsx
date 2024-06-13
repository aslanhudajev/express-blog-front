import { useQuery } from "@tanstack/react-query";
import PostGrid from "../Parts/PostGrid";
import PostCardSkeleton from "../Parts/PostCardSkeleton";

const HomePage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `http://${import.meta.env.VITE_API_URL}/api/blog/posts`,
        {
          method: "GET",
          mode: "cors",
        }
      );

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

  if (data.length > 0) {
    return (
      <section className="content">
        <PostGrid posts={data} />
      </section>
    );
  } else {
    return (
      <section className="flex flex-col justify-center items-center h-svh">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Uh oh.. There is nothing here
        </h1>
      </section>
    );
  }
};

export default HomePage;
