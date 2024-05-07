import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as DateUtils from "../../lib/dateUtils";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import DOMPurify from "dompurify";

const PostPage = ({ ...props }) => {
  const { postId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/blog/post/${postId}`, {
        method: "GET",
        mode: "cors",
      });

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
      <section className="content flex flex-col items-center justify-center w-full h-svh">
        <h2>Uh oh, there is no post here...</h2>
        <span>Error: {error.message}</span>
      </section>
    );
  }

  const prettyDate = DateUtils.prettifyDate(data.posted);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //! Move this to the backend
  //! Converting from DELTA to HTML should be done on the backend.
  //! Sanitation should also be done on the backend.
  const converter = new QuillDeltaToHtmlConverter(
    JSON.parse(data.content).ops,
    {
      customCssClasses: (op) => {
        if (op.attributes.header) {
          switch (op.attributes.header) {
            case 1:
              return [
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mt-4",
              ];
            case 2:
              return [
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2 mt-2",
              ];
            case 3:
              return [
                "scroll-m-20 text-2xl font-semibold tracking-tight mb-2 mt-4",
              ];
            case 4:
              return [
                "scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4",
              ];
          }
        } else {
          return ["leading-7 [&:not(:first-child)]:mt-6"];
        }
      },
    }
  );

  const contentHtml = converter.convert();
  const contentHtmlSanitized = DOMPurify.sanitize(contentHtml);

  //! Move this to the backend
  //! Converting from DELTA to HTML should be done on the backend.
  //! Sanitation should also be done on the backend.
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (
    <section className="content flex flex-col items-start justify-start w-full gap-4 p-4">
      <div className="header mb-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data.title}
        </h1>
        <span className="posted text-sm text-muted-foreground">
          {prettyDate}
        </span>
      </div>
      <div
        className="post-text"
        dangerouslySetInnerHTML={{ __html: contentHtmlSanitized }} //! <-- This should be changed to take pure formatted html.
      ></div>
    </section>
  );
};

export default PostPage;
