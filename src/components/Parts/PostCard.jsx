/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const PostCard = ({ title, content, posted }) => {
  return (
    <Card className={cn("w-[300px]")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <CardDescription>
            <span>{posted}</span>
          </CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
