// Event log for the Event API examples: a read-out in the full view, an overlay in a card
import { readout } from './controls.ts';
import type { Stage } from './graph.ts';

/** Returns log(line): appends a line, keeping the newest `keep` lines. */
export function eventLog(stage: Stage, el: HTMLElement, keep = 12, cardLines = 3): (line: string) => void {
  const lines: string[] = [];
  let paint: (text: string) => void;
  if (stage.bar) {
    const out = readout(el);
    out.style.minHeight = `${keep * 1.45}em`;
    out.style.maxHeight = 'none';
    paint = (t) => (out.textContent = t);
  } else {
    stage.container.style.position = 'relative';
    const tag = document.createElement('div');
    tag.style.cssText =
      'position:absolute;left:0;bottom:0;right:0;padding:14px 8px 5px;z-index:2;pointer-events:none;font:11px/1.3 ui-monospace,monospace;color:#cfe;white-space:pre;overflow:hidden;background:linear-gradient(transparent,rgba(0,0,0,.75) 45%)';
    stage.container.append(tag);
    paint = (t) => (tag.textContent = t);
  }
  const max = stage.bar ? keep : cardLines;
  return (line) => {
    lines.push(line);
    if (lines.length > max) lines.shift();
    paint(lines.join('\n'));
  };
}

/** Short text for an event target: `node n1`, `edge e1` or `canvas`. */
export function who(e: { targetType?: string; target: unknown }): string {
  const id = (e.target as { id?: string } | undefined)?.id;
  return e.targetType === 'canvas' || !id ? 'canvas' : `${e.targetType} ${id}`;
}

/** Lights an element with the `active` state for a moment, so the card shows which one fired. */
export function flash(stage: Stage, graph: { setElementState(id: string, s: string | string[], a?: boolean): Promise<void>; destroyed: boolean }, id: string, ms = 500): void {
  void graph.setElementState(id, 'active', false);
  stage.after(ms, () => (graph.destroyed ? undefined : graph.setElementState(id, [], false)));
}

/** A dispatched DOM event on the canvas element, for types the pointer helpers do not cover. */
export function canvasDom(graph: { getCanvas(): { getContextService(): { getDomElement(): unknown } } }): HTMLElement {
  return graph.getCanvas().getContextService().getDomElement() as HTMLElement;
}
