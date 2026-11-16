// Result panel for export examples: the exported image or text beside the canvas
import type { IUI } from 'leafer-ui';
import type { Stage } from './stage.ts';

export interface ExportPanel {
  /** Shows an image (a data: or blob: URL) in slot `i`, with an optional caption under it. */
  image(src: string, caption?: string, i?: number): void;
  /** Shows plain text (a data URL prefix, JSON, a size line). */
  text(text: string): void;
}

/** Puts a panel over the right part of the stage's pane; `from` is the x (px) where it starts. */
export function exportPanel(stage: Stage, from: number): ExportPanel {
  const box = document.createElement('div');
  box.style.cssText = `position:absolute;left:${from}px;top:0;right:0;bottom:0;display:flex;flex-wrap:wrap;gap:6px;
    align-content:flex-start;justify-content:center;padding:6px;overflow:hidden;pointer-events:none;
    font:${stage.preview ? 9 : 12}px/1.35 ui-monospace,monospace;color:#444`;
  stage.view.append(box);
  const slots: HTMLDivElement[] = [];
  const pre = document.createElement('pre');
  pre.style.cssText =
    'display:none;margin:0;padding:0;border:0;background:none;width:100%;white-space:pre-wrap;word-break:break-all;overflow:hidden;color:#444;font:inherit';
  box.append(pre);
  return {
    image(src, caption = '', i = 0) {
      let slot = slots[i];
      if (!slot) {
        slot = slots[i] = document.createElement('div');
        slot.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:2px';
        slot.append(document.createElement('img'), document.createElement('span'));
        const img = slot.firstChild as HTMLImageElement;
        img.style.cssText = `max-width:${stage.preview ? 80 : 200}px;max-height:${stage.preview ? 90 : 220}px;
          background:repeating-conic-gradient(#ddd 0 25%,#fff 0 50%) 0 0/12px 12px`;
        box.insertBefore(slot, pre);
        slots[i] = slot;
      }
      (slot.firstChild as HTMLImageElement).src = src;
      (slot.lastChild as HTMLSpanElement).textContent = caption;
    },
    text(t) {
      pre.textContent = t;
      pre.style.display = t ? 'block' : 'none';
    },
  };
}

/** Card helper: gives the element a new random fill every `ms` and calls `run` (the export), so the panel keeps changing. */
export function cycleFill(stage: Stage, el: IUI, run: () => unknown, ms = 1100): void {
  stage.every(ms, () => {
    el.fill = `hsl(${Math.floor(Math.random() * 360)}, 65%, 55%)`;
    void run();
  });
}
