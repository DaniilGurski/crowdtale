import { getDrawingUrl } from "@/lib/utils";

interface WritingTurnBlockProps {
  text: string;
  author: string;
  drawingPath?: string | null;
  isOpening?: boolean;
}

export function WritingTurnBlock({
  text,
  author,
  drawingPath,
  isOpening = false,
}: WritingTurnBlockProps) {
  return (
    <div className="grid gap-y-2">
      <div className="bg-card grid gap-y-4 rounded-xl p-4 wrap-anywhere shadow-sm">
        <p>"{text}"</p>
        <span className="text-xs">
          - {isOpening ? `Opening by` : `By`} {author}
        </span>
      </div>
      {drawingPath && (
        <img className="w-full" src={getDrawingUrl(drawingPath)} alt="" />
      )}
    </div>
  );
}
