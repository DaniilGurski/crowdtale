import { WritingTurnBlock } from "@components/writing-space/WritingTurnBlock";
import type { Turn, Profile } from "@T/index";

export default function WritingTurnsList({
  turns,
}: {
  turns: (Turn & { profiles: Pick<Profile, "username"> | null })[];
}) {
  return (
    <>
      {turns.map(({ content, profiles, drawing_path }, index) => (
        <WritingTurnBlock
          key={index}
          text={content}
          drawingPath={drawing_path}
          author={profiles!.username}
          isOpening={index <= 0}
        />
      ))}
    </>
  );
}
