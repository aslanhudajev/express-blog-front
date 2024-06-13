import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as DateUtils from "../../lib/dateUtils";
import ReactHtmlParser from "react-html-parser";

const PostPage = () => {
  const { postId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await fetch(
        `https://${import.meta.env.VITE_API_URL}/api/blog/post/${postId}`,
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
      <section className="content flex flex-col items-start justify-start w-full gap-4 p-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Skeleton className="h-[200px] w-full" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="content flex flex-col items-center justify-center w-full h-svh gap-4">
        <h1>Uh oh, there is no post here...</h1>
        <span>Error: {error.message}</span>
      </section>
    );
  }

  const prettyDate = DateUtils.prettifyDate(data.posted);

  return (
    <section className="content flex flex-col items-start justify-start gap-4 p-4 w-full">
      <div className="w-full flex flex-col items-center">
        <div className="lg:w-1/3 md:w-1/2 flex flex-col">
          <div className="header mb-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {data.title}
            </h1>
            <span className="posted text-sm text-muted-foreground">
              {prettyDate}
            </span>
          </div>
          <div>{ReactHtmlParser(data.content)}</div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
