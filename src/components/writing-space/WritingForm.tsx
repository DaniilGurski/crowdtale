import { Button } from "@components/ui/button";

export default function WritingForm() {
  return (
    <form className="writing-form-grid bg-card relative justify-items-end">
      {/* I am using the standard textarea because I want the form to be styled as the one from Shadcn */}
      <textarea
        className="caret-primary w-full resize-none border-none p-4 shadow-none focus:outline-0"
        placeholder="..."
      />
      <Button className="m-2 px-12"> Send </Button>
    </form>
  );
}
