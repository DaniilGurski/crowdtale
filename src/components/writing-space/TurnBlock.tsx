interface TurnBlockProps {
  text: string;
  author: string;
  isOpening?: boolean;
}

export function TurnBlock({ text, author, isOpening = false }: TurnBlockProps) {
  return (
    <div className="bg-card grid gap-y-4 rounded-xl p-4">
      <p>"{text}"</p>
      <span className="text-xs">
        - {isOpening ? `Opening by` : `By`} {author}
      </span>
    </div>
  );
}
