// aframe example: renderer: maxCanvasWidth and maxCanvasHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "renderer: maxCanvasWidth and maxCanvasHeight",
  summary: "The renderer's maxCanvasWidth and maxCanvasHeight cap the canvas in device pixels (size times pixel ratio). A cap of 160 by 100 makes the whole scene render small and get stretched to fit, which is visibly blocky; the caption reads the canvas's real pixel size. These properties are fixed once the scene has started.",
  section: 'Components',
  tags: ["renderer", "maxCanvasWidth", "maxCanvasHeight", "canvas", "devicePixelRatio"],
  docs: ["repo/docs/components/renderer.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
