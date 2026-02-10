export interface StoryContent {
  userId: string;
  text: string;
}

export interface StoryCreator {
  userId: string;
  username: string;
}

export interface Story {
  id: number;
  title: string;
  genres: string[];
  contents: StoryContent[];
  creator: StoryCreator;
  created_at: string;
}
