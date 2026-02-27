import { Badge } from "@components/ui/badge";
import { cn } from "@lib/utils";

interface GenreListProps {
  storyGenres: { genres: { genre_id: number; name: string } }[] | undefined;
  className?: string;
}

export default function GenreList({ storyGenres, className }: GenreListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {storyGenres?.map(({ genres }) => {
        return (
          <li key={genres.genre_id}>
            <Badge key={genres.genre_id}> {genres.name} </Badge>
          </li>
        );
      })}
    </ul>
  );
}
