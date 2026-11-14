// Further Reading and viewport/canvas API examples: read-out text, preset grid data
import type { EdgeData, NodeData } from '@antv/g6';
import { readout } from './controls.ts';
import type { Stage } from './graph.ts';

/**
 * A text line for live values: under the graph in the full view, and a small overlay on the
 * graph in a card (cards have no room below). Returns the setter; the DOM goes with the stage.
 */
export function hud(stage: Stage, el: HTMLElement): (text: string) => void {
  if (stage.preview) {
    const box = document.createElement('div');
    box.style.cssText =
      'position:absolute;left:6px;top:4px;font:11px/1.35 ui-monospace,monospace;color:#9fe3b4;white-space:pre-wrap;word-break:break-all;max-width:calc(100% - 12px);text-shadow:0 0 3px #000,0 0 3px #000;pointer-events:none;z-index:2';
    stage.container.append(box);
    return (text) => {
      box.textContent = text;
    };
  }
  const pre = readout(el);
  stage.onCleanup(() => pre.remove());
  return (text) => {
    pre.textContent = text;
  };
}

/** Rounds a point for display, x and y only: `[12.5, -3]`. */
export function fmt(p: ArrayLike<number>, digits = 1): string {
  return `[${Array.from(p, (n) => Number(n.toFixed(digits))).slice(0, 2).join(', ')}]`;
}

/**
 * A cols x rows lattice with preset positions (no layout), so viewport calls move a graph
 * whose canvas coordinates are known: node-<col>-<row> sits at (ox + col*gap, oy + row*gap).
 */
export function gridData(cols: number, rows: number, gap = 60, ox = 40, oy = 40) {
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({ id: `n-${c}-${r}`, data: { col: c, row: r }, style: { x: ox + c * gap, y: oy + r * gap } });
      if (c > 0) edges.push({ id: `e-h-${c}-${r}`, source: `n-${c - 1}-${r}`, target: `n-${c}-${r}` });
      if (r > 0) edges.push({ id: `e-v-${c}-${r}`, source: `n-${c}-${r - 1}`, target: `n-${c}-${r}` });
    }
  }
  return { nodes, edges };
}

/** A ring of n nodes joined in a cycle; the layout is left to the example. */
export function ringData(n: number) {
  const nodes: NodeData[] = Array.from({ length: n }, (_, i) => ({ id: `r-${i}`, data: { i } }));
  const edges: EdgeData[] = nodes.map((_, i) => ({ id: `re-${i}`, source: `r-${i}`, target: `r-${(i + 1) % n}` }));
  return { nodes, edges };
}

/**
 * Shows an exported image: a thumbnail over the graph in a card, a captioned <img> below the
 * graph in the full view. Returns the setter; the DOM is removed with the stage.
 */
export function imageBox(stage: Stage, el: HTMLElement): (url: string, caption: string) => void {
  const img = document.createElement('img');
  img.alt = 'exported graph';
  if (stage.preview) {
    img.style.cssText =
      'position:absolute;right:6px;bottom:6px;width:42%;max-height:45%;object-fit:contain;border:1px solid #556;background:#222;z-index:2';
    stage.container.append(img);
    return (url) => {
      img.src = url;
    };
  }
  const wrap = document.createElement('figure');
  wrap.style.cssText = 'margin:10px 0 0;display:flex;gap:12px;align-items:flex-start';
  img.style.cssText = 'max-width:55%;max-height:260px;border:1px solid #556;background:#222';
  const cap = document.createElement('figcaption');
  cap.style.cssText = 'font:12px/1.5 ui-monospace,monospace;white-space:pre-wrap';
  wrap.append(img, cap);
  el.append(wrap);
  stage.onCleanup(() => wrap.remove());
  return (url, caption) => {
    img.src = url;
    cap.textContent = caption;
  };
}

/** The size in bytes of a data URL's payload, for showing how options change the file. */
export function dataUrlBytes(url: string): number {
  const body = url.slice(url.indexOf(',') + 1);
  return Math.round((body.length * 3) / 4);
}

/**
 * Feeds client coordinates to `onPoint`: the real pointer over the stage in the full view, and
 * in a card (no pointer) a point that wanders over the stage on a timer. Returns the stage box.
 */
export function pointerDrive(
  stage: Stage,
  onPoint: (clientX: number, clientY: number) => void,
  wander: (i: number) => [number, number] = (i) => [0.5 + 0.38 * Math.sin(i * 0.11), 0.5 + 0.32 * Math.sin(i * 0.17 + 1)],
): () => DOMRect {
  const box = () => stage.container.getBoundingClientRect();
  if (stage.preview) {
    stage.every(120, (i) => {
      const r = box();
      const [fx, fy] = wander(i);
      onPoint(r.left + fx * r.width, r.top + fy * r.height);
    });
  } else {
    stage.container.addEventListener('pointermove', (e) => onPoint(e.clientX, e.clientY), { signal: stage.signal });
  }
  return box;
}

/** A scrolling event log built on hud(): newest lines last, 5 in a card and `keep` in the full view. */
export function lineLog(stage: Stage, el: HTMLElement, keep = 10): { log: (line: string) => void; clear: () => void } {
  const show = hud(stage, el);
  const max = stage.preview ? 5 : keep;
  const lines: string[] = [];
  return {
    log(line) {
      lines.push(line);
      if (lines.length > max) lines.shift();
      show(lines.join('\n'));
    },
    clear() {
      lines.length = 0;
      show('');
    },
  };
}
