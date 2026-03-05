import { TurnBlock } from "@components/writing-space/TurnBlock";
import type { Turn, Profile } from "@T/index";

export function TurnsList({
  turns,
}: {
  turns: (Turn & { profiles: Pick<Profile, "username"> | null })[];
}) {
  return (
    <>
      {turns.map(({ content, profiles }, index) => (
        <TurnBlock
          key={index}
          text={content}
          author={profiles!.username}
          isOpening={index <= 0}
        />
      ))}
    </>
  );
}
