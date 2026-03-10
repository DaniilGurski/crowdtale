import { Filter } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { getAllGenres } from "@services/api";
import { selectedGenresAtom } from "@lib/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

const HEADER_HEIGHT = 56;

export default function DiscoverFeedHeader() {
  const [selectedGenres, setSelectedGenres] = useAtom(selectedGenresAtom);

  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenres,
  });

  return (
    <header
      className="flex items-center justify-between py-3"
      style={{ height: HEADER_HEIGHT }}
    >
      <h1 className="text-xl font-semibold">Discover</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="size-4" />
            Genres
            {selectedGenres.length > 0 && (
              <span className="bg-primary text-primary-foreground ml-1 flex size-5 items-center justify-center rounded-full text-xs">
                {selectedGenres.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="max-w-64">
          <div className="grid gap-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Filter by genre</p>
              {selectedGenres.length > 0 && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setSelectedGenres([])}
                >
                  Clear
                </Button>
              )}
            </div>
            <ToggleGroup
              type="multiple"
              variant="outline"
              value={selectedGenres}
              onValueChange={setSelectedGenres}
              className="flex flex-wrap justify-start"
              spacing={2}
            >
              {genres.map((genre) => (
                <ToggleGroupItem
                  key={genre.id}
                  value={genre.id.toString()}
                  className="cursor-pointer rounded-full px-3 text-xs"
                >
                  {genre.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
