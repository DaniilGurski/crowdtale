import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "@components/ui/badge";
import { Clock, PenIcon } from "lucide-react";

export default function StoryCard() {
  return (
    <Card className="flex h-full snap-start flex-col rounded-none">
      <CardHeader>
        <CardTitle className="text-xl"> Story Name </CardTitle>
        <ul className="flex flex-wrap gap-x-2">
          <li>
            <Badge> Sci-Fi </Badge>
          </li>
          <li>
            <Badge> Romance </Badge>
          </li>
        </ul>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-4 tracking-wider italic">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          culpa nemo nam aliquid, dolore repudiandae dolores odio deleniti et
          eligendi doloremque itaque pariatur ex veniam qui vitae, recusandae
          vero velit."
        </p>
      </CardContent>

      <CardFooter className="grid gap-y-4">
        <div className="flex justify-between">
          <p className="flex gap-x-2">
            <PenIcon /> <span> By: Lorem </span>
          </p>
          <p className="flex gap-x-2">
            <Clock />
            <span> 42 days ago </span>
          </p>
        </div>
        <Button> Join Story </Button>
      </CardFooter>
    </Card>
  );
}

{
  /* <article>
  <header>
    <h3 className="font-bold"> Story Name </h3>
    <ul>
      <li>Fantasy</li>
      <li>Adventure</li>
    </ul>
  </header>
  <div className="flex-1">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis culpa
    nemo nam aliquid, dolore repudiandae dolores odio deleniti et eligendi
    doloremque itaque pariatur ex veniam qui vitae, recusandae vero velit.
  </div>
  <footer>
    <div>
      <p> By: @</p>
      <p> @ days ago </p>
    </div>
    <Button> Join Story </Button>
  </footer>
</article>; */
}
