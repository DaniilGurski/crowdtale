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
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Slider } from "@components/ui/slider";
import { HexColorPicker } from "react-colorful";

export default function DrawDialog() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [isStrokeColorMode, setIsStrokeColorMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [eraserWidth, setEraserWidth] = useState(12);
  const [strokeColor, setStrokeColor] = useState("");
  const [canvasColor, setCanvasColor] = useState("");

  const handlePenClick = () => {
    setIsEraserMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setIsEraserMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleColorChange = (newColor: string) => {
    if (isStrokeColorMode) {
      setStrokeColor(newColor);
    } else {
      setCanvasColor(newColor);
    }
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
        <div className="grid">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={strokeWidth}
            eraserWidth={eraserWidth}
            strokeColor={strokeColor}
            canvasColor={canvasColor}
            height="300px"
          />
          <div className="flex flex-wrap gap-2">
            {/* Should this be a list ? */}
            <div className="flex">
              <Button
                variant="outline"
                onClick={handlePenClick}
                disabled={!isEraserMode}
              >
                Pen
              </Button>
              <Button
                variant="outline"
                onClick={handleEraserClick}
                disabled={isEraserMode}
              >
                Eraser
              </Button>
            </div>

            <div className="flex">
              {/* TODO: Add proper label for accessibility */}
              <div>
                Stroke Width
                <Slider
                  defaultValue={[strokeWidth]}
                  max={20}
                  step={1}
                  className="w-full max-w-xs"
                  onValueChange={(value) => setStrokeWidth(value[0])}
                  disabled={isEraserMode}
                />
              </div>

              {/* TODO: Add proper label for accessibility */}
              <div>
                Eraser Width
                <Slider
                  defaultValue={[eraserWidth]}
                  max={20}
                  step={1}
                  className="w-full max-w-xs"
                  onValueChange={(value) => setEraserWidth(value[0])}
                  disabled={!isEraserMode}
                />
              </div>
            </div>

            <div className="flex">
              <Button
                variant="outline"
                onClick={() => setIsStrokeColorMode(true)}
                disabled={isStrokeColorMode}
              >
                Stroke Color
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsStrokeColorMode(false)}
                disabled={!isStrokeColorMode}
              >
                Canvas Color
              </Button>
            </div>

            {/* If it becomes hard to fit everything, it might be better to use vanilla color pickers */}
            <HexColorPicker onChange={handleColorChange} />

            <div>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.undo()}
              >
                Undo
              </Button>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.redo()}
              >
                Redo
              </Button>
              <Button
                variant="outline"
                onClick={() => canvasRef.current?.clearCanvas()}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
