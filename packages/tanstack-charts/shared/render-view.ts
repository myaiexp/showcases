// Small panes, image previews and scene summaries for readouts
import type { ChartScene } from '@tanstack/charts';
import type { Stage } from './stage.ts';

/** A titled pane under the chart: returns the element to fill. */
export function pane(stage: Stage, title: string): HTMLElement {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0', fontSize: stage.preview ? '10px' : '12px' });
  const head = document.createElement('div');
  head.textContent = title;
  head.style.color = 'var(--fg-2)';
  const body = document.createElement('div');
  body.style.minWidth = '0';
  wrap.append(head, body);
  stage.root.append(wrap);
  stage.onDispose(() => wrap.remove());
  return body;
}

/** A blob URL that is revoked when the stage is disposed. */
export function blobUrl(stage: Stage, blob: Blob): string {
  const url = URL.createObjectURL(blob);
  stage.onDispose(() => URL.revokeObjectURL(url));
  return url;
}

/** An <img> on a dark backdrop, or a checkerboard so transparent backgrounds show. */
export function checkerImage(src: string, maxHeight: number, checker = false): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  Object.assign(img.style, {
    display: 'block',
    maxWidth: '100%',
    maxHeight: `${maxHeight}px`,
    background: checker ? 'repeating-conic-gradient(#555 0% 25%, #888 0% 50%) 0 0 / 14px 14px' : '#1b1b22',
    border: '1px solid var(--border)',
  });
  img.alt = 'Exported chart';
  return img;
}

/** A downloadable link: nothing downloads until the reader clicks it. */
export function fileLink(stage: Stage, host: HTMLElement, blob: Blob, filename: string): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = blobUrl(stage, blob);
  a.download = filename;
  a.textContent = `${filename} (${blob.size.toLocaleString('en-US')} bytes)`;
  a.style.color = 'var(--accent)';
  host.append(a);
  return a;
}

/** A text box for markup: capped height, scrolls. */
export function codeBox(host: HTMLElement, text: string, maxHeight = 160): HTMLPreElement {
  const pre = document.createElement('pre');
  pre.className = 'tc-readout';
  pre.style.maxHeight = `${maxHeight}px`;
  pre.style.overflow = 'auto';
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.wordBreak = 'break-all';
  pre.textContent = text;
  host.append(pre);
  return pre;
}

/** `text` cut to `n` characters with a count of what was left out. */
export function clip(text: string, n = 600): string {
  return text.length <= n ? text : `${text.slice(0, n)} ... (${text.length - n} more characters)`;
}

/** The numbers a scene reports without mounting anything. */
export function describeScene(scene: ChartScene): string {
  const c = scene.chart;
  const m = scene.margin;
  const scales = Object.entries(scene.scales)
    .map(([id, s]) => `${id}: ${s.type}, domain ${s.domain.length} values, ${s.ticks.length} ticks`)
    .join('\n  ');
  return [
    `size ${scene.width} x ${scene.height}`,
    `margin top ${m.top.toFixed(0)}, right ${m.right.toFixed(0)}, bottom ${m.bottom.toFixed(0)}, left ${m.left.toFixed(0)}`,
    `plot x ${c.x.toFixed(0)}, y ${c.y.toFixed(0)}, ${c.width.toFixed(0)} x ${c.height.toFixed(0)}`,
    `nodes ${scene.nodes.length}, points ${scene.points.length}`,
    `scales\n  ${scales}`,
  ].join('\n');
}

/** Counts every scene node, descending into groups. */
export function countNodes(nodes: ChartScene['nodes']): Record<string, number> {
  const out: Record<string, number> = {};
  const walk = (list: ChartScene['nodes']): void => {
    for (const n of list) {
      out[n.kind] = (out[n.kind] ?? 0) + 1;
      if (n.kind === 'group') walk(n.children);
    }
  };
  walk(nodes);
  return out;
}

/**
 * An SVG string as a blob, for an <img> source or a download link. renderChartSvg output is
 * written for innerHTML: it has no xmlns and sizes itself with 100%, so a standalone file
 * needs both added (serializeChartSvg does this itself).
 */
export function svgBlob(markup: string): Blob {
  const box = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(markup);
  let file = markup.includes('xmlns=') ? markup : markup.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  if (box) file = file.replace('width="100%" height="100%"', `width="${box[1]}" height="${box[2]}"`);
  return new Blob([file], { type: 'image/svg+xml' });
}

/** Resolves once an image has loaded, or after it failed. */
export function imageLoaded(img: HTMLImageElement): Promise<void> {
  return img.decode().catch(() => undefined);
}
