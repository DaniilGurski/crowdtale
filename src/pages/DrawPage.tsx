import { Button } from "@components/ui/button";
import { Slider } from "@components/ui/slider";
import { Input } from "@components/ui/input";
import { EraserIcon, Pen, Redo, Undo, X, ArrowLeft } from "lucide-react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import useWritingForm from "@hooks/useWritingForm";

export default function DrawPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(12);
  const [eraserWidth, setEraserWidth] = useState(12);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");
  const { drawingPaths, setDrawingPaths, setDrawingImage } =
    useOutletContext<ReturnType<typeof useWritingForm>>();

  const handlePenClick = () => {
    setIsEraserMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setIsEraserMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;

    const paths = await canvasRef.current.exportPaths();

    // If canvas is empty, unattach drawing
    if (!paths.length) {
      setDrawingImage(null);
      setDrawingPaths([]);
      navigate(-1);
      return;
    }

    const image = await canvasRef.current.exportImage("png");
    setDrawingImage(image);
    setDrawingPaths(paths);
    navigate(-1);
  };

  // Load saved drawing
  useEffect(() => {
    if (!canvasRef.current) return;

    if (drawingPaths?.length) {
      canvasRef.current.loadPaths(drawingPaths);
    }
  }, [drawingPaths]);

  return (
    <div className="bg-card flex h-screen flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Draw</h1>
      </div>

      <p className="text-muted-foreground text-sm">
        Draw a picture for your part of the story
      </p>

      <div className="flex-1 overflow-auto">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          strokeColor={strokeColor}
          canvasColor={canvasColor}
          height="100%"
        />
      </div>

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

        <div className="grid grid-cols-5 gap-2">
          <Button
            variant="outline"
            onClick={handlePenClick}
            disabled={!isEraserMode}
          >
            <span className="sr-only">Toggle pen mode</span>
            <Pen />
          </Button>
          <Button
            variant="outline"
            onClick={handleEraserClick}
            disabled={isEraserMode}
          >
            <span className="sr-only">Toggle eraser mode</span>
            <EraserIcon />
          </Button>
          <Button variant="outline" onClick={() => canvasRef.current?.undo()}>
            <span className="sr-only">Undo</span>
            <Undo />
          </Button>
          <Button variant="outline" onClick={() => canvasRef.current?.redo()}>
            <span className="sr-only">Redo</span>
            <Redo />
          </Button>
          <Button
            variant="outline"
            onClick={() => canvasRef.current?.clearCanvas()}
          >
            <span className="sr-only">Clear canvas</span>
            <X />
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            aria-label="canvas stroke color"
            className="h-10 w-1/2"
          />
          <Input
            type="color"
            value={canvasColor}
            onChange={(e) => setCanvasColor(e.target.value)}
            aria-label="canvas color"
            className="h-10 w-1/2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
