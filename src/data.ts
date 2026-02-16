export const activeStories = [
  {
    id: 1,
    title: "The Last Starship",
    genres: ["Sci-Fi", "Adventure"],
    contents: [
      {
        userId: "user-1",
        text: "The engines hummed as Captain Elena gazed through the viewport at the dying sun. They had forty-eight hours to find a new home for humanity.",
      },
      {
        userId: "user-2",
        text: "First Officer Chen appeared at her side, datapad in hand. 'We've detected a signal from the Kepler system. It could be our salvation—or our doom.'",
      },
    ],
    creator: {
      userId: "user-1",
      username: "Elena Wright",
    },
    created_at: "2025-12-28",
  },
  {
    id: 2,
    title: "Whispers in the Garden",
    genres: ["Romance", "Mystery"],
    contents: [
      {
        userId: "user-3",
        text: "The old manor's garden held secrets older than the stone walls themselves. Maya discovered the first letter hidden beneath the rosebush.",
      },
      {
        userId: "user-4",
        text: "The handwriting was elegant, speaking of a love forbidden by two rival families. Someone had left these letters for her to find.",
      },
    ],
    creator: {
      userId: "user-3",
      username: "James Chen",
    },
    created_at: "2025-08-28",
  },
];
export const completedStories = [
  {
    id: 3,
    title: "The Dragon's Apprentice",
    genres: ["Fantasy", "Coming-of-Age"],
    contents: [
      {
        userId: "user-5",
        text: "No one believed Finn when he said the dragon spoke to him. But every night, Ember's voice echoed in his dreams, teaching him the old ways.",
      },
      {
        userId: "user-6",
        text: "On his sixteenth birthday, Finn woke to find scales forming on his forearms. The transformation had begun.",
      },
    ],
    creator: {
      userId: "user-5",
      username: "Sofia Rodriguez",
    },
    created_at: "2025-10-01",
  },
  {
    id: 4,
    title: "Midnight at the Diner",
    genres: ["Horror", "Thriller"],
    contents: [
      {
        userId: "user-7",
        text: "The neon sign flickered: 'OPEN 24 HOURS.' But the customers who came after midnight were... different.",
      },
      {
        userId: "user-8",
        text: "Waitress Carla noticed they never ordered food. They just watched. And every night, there was one more of them.",
      },
    ],
    creator: {
      userId: "user-7",
      username: "Marcus Webb",
    },
    created_at: "2025-04-05",
  },
];
export const GENRES = [
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Mystery",
  "Horror",
  "Adventure",
];
