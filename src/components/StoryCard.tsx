import { Button } from "@components/ui/button";

export default function StoryCard() {
  return (
    <article className="flex h-full snap-start flex-col py-2">
      <header>
        <h3> Story Name </h3>
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
    </article>
  );
}
