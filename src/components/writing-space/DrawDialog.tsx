import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Slider } from "@components/ui/slider";
import { Input } from "@components/ui/input";
import { EraserIcon, Pen, Redo, Undo, X } from "lucide-react";

export default function DrawDialog() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [eraserWidth, setEraserWidth] = useState(12);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  const handlePenClick = () => {
    setIsEraserMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setIsEraserMode(true);
    canvasRef.current?.eraseMode(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" className="m-2 px-12">
          Draw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Draw</DialogTitle>
          <DialogDescription>
            Draw a picture for your part of the story
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-y-4">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            eraserWidth={eraserWidth}
            strokeColor={strokeColor}
            canvasColor={canvasColor}
            height="300px"
          />
          <div className="grid gap-y-4">
            <Slider
              defaultValue={[strokeWidth]}
              max={20}
              step={1}
              className="w-full"
              onValueChange={(value) => setStrokeWidth(value[0])}
              disabled={isEraserMode}
              aria-label="canvas stroke width"
            />

            <Slider
              defaultValue={[eraserWidth]}
              max={20}
              step={1}
              className="w-full"
              onValueChange={(value) => setEraserWidth(value[0])}
              disabled={!isEraserMode}
              aria-label="canvas eraser width"
            />

            <div className="grid grid-cols-5">
              <Button
                variant="outline"
                onClick={handlePenClick}
                disabled={!isEraserMode}
              >
                <span className="sr-only"> Toggle pen mode </span>
                <Pen />
              </Button>
              <Button
                variant="outline"
                onClick={handleEraserClick}
                disabled={isEraserMode}
              >
                <span className="sr-only"> Toggle eraser mode </span>
                <EraserIcon />
              </Button>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.undo()}
              >
                <span className="sr-only"> Undo </span>
                <Undo />
              </Button>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.redo()}
              >
                <span className="sr-only">Redo</span>
                <Redo />
              </Button>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.clearCanvas()}
              >
                <span className="sr-only"> Clear canvas </span>
                <X />
              </Button>
            </div>

            <div>
              <Input
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                aria-label="canvas stroke color"
              ></Input>
              <Input
                type="color"
                value={canvasColor}
                onChange={(e) => setCanvasColor(e.target.value)}
                aria-label="canvas color"
              ></Input>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Attach</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
