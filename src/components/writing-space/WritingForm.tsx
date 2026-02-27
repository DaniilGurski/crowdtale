import { Textarea } from "@components/ui/textarea";

export default function WritingForm() {
  return (
    <form>
      <Textarea className="bg-card resize-none border-none" placeholder="..." />
    </form>
  );
}
