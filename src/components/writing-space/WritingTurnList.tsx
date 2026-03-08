import { WritingTurnBlock } from "@/components/writing-space/WritingTurnBlock";
import type { Turn, Profile } from "@T/index";

export default function WritingTurnsList({
  turns,
}: {
  turns: (Turn & { profiles: Pick<Profile, "username"> | null })[];
}) {
  return (
    <>
      {turns.map(({ content, profiles }, index) => (
        <WritingTurnBlock
          key={index}
          text={content}
          author={profiles!.username}
          isOpening={index <= 0}
        />
      ))}
    </>
  );
}
