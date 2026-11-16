// A parser lab: SVG source, the browser's drawing of it, fabric's canvas
import { Canvas, type FabricObject } from 'fabric';
import type { MountContext } from '@/types.ts';
import { briefStatus, svgPanel } from './code-panel.ts';
import { createStage, type Stage } from './stage.ts';

export interface SvgLab {
  stage: Stage;
  /** The canvas the parsed objects go on (the last pane). */
  canvas: Canvas;
  /** Puts `svg` into the editor and the browser picture; it does not parse. */
  setSource(svg: string): void;
  say(text: string): void;
}

export interface SvgLabOptions {
  scene: readonly [number, number];
  hint: string;
  /** Called with the text whenever the reader edits the source (full view only). */
  onEdit(svg: string): void;
  /** Pane width cap for the full view (default 900 for three panes). */
  width?: number;
}

/** Replaces every object on the canvas with `objects`, centred on the scene. */
export function showParsed(canvas: Canvas, objects: FabricObject[]): void {
  canvas.remove(...canvas.getObjects());
  canvas.add(...objects);
  canvas.requestRenderAll();
}

export function svgLab(el: HTMLElement, ctx: MountContext, opts: SvgLabOptions): SvgLab {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['browser', 'fabric'] : ['SVG source (editable)', 'the browser draws it', 'fabric parsed it'],
    scene: opts.scene,
    width: opts.width ?? 900,
    hint: opts.hint,
  });
  const canvasPane = stage.panes.at(-1)!;
  const canvas = stage.own(new Canvas(canvasPane.el), canvasPane);
  const draw = svgPanel(stage.panes.at(-2)!, '#fff');
  const say = briefStatus(stage, canvasPane);

  let box: HTMLTextAreaElement | null = null;
  if (!stage.preview) {
    const pane = stage.panes[0]!;
    pane.el.style.display = 'none';
    box = document.createElement('textarea');
    box.spellcheck = false;
    box.style.cssText = `position:absolute;inset:0;width:100%;height:100%;box-sizing:border-box;resize:none;border:0;padding:8px;
      font:12px/1.35 ui-monospace,monospace;color:#2b2a33;background:#fffdf7;white-space:pre;overflow:auto`;
    box.addEventListener('input', () => {
      draw(box!.value);
      opts.onEdit(box!.value);
    });
    pane.frame.append(box);
  }
  return {
    stage,
    canvas,
    say,
    setSource(svg) {
      draw(svg);
      if (box) box.value = svg;
    },
  };
}
