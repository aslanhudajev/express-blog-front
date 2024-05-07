/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import * as DateUtils from "../../lib/dateUtils";

const PostCard = ({ title, content, posted }) => {
  const prettyDate = DateUtils.prettifyDate(posted);

  return (
    <Card className={cn("w-full h-full")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <CardDescription>
            <span>{prettyDate}</span>
          </CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content.substring(0, 200) + " ..."}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
