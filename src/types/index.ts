export interface StoryContent {
  userId: string;
  text: string;
}

export interface Story {
  id: number;
  title: string;
  genres: string[];
  contents: StoryContent[];
  creatorName: string;
  createdAt: Date;
}
