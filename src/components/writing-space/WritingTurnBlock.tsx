interface WritingTurnBlockProps {
  text: string;
  author: string;
  isOpening?: boolean;
}

export function WritingTurnBlock({
  text,
  author,
  isOpening = false,
}: WritingTurnBlockProps) {
  return (
    <div className="bg-card grid gap-y-4 rounded-xl p-4">
      <p>"{text}"</p>
      <span className="text-xs">
        - {isOpening ? `Opening by` : `By`} {author}
      </span>
    </div>
  );
}
