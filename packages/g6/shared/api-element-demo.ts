// Helpers for the Element API examples: a node strip, and calls run as buttons or on a timer
import type { GraphData } from '@antv/g6';
import { button, readout } from './controls.ts';
import type { Stage } from './graph.ts';

/** n nodes in a row (ids n1..nN, labelled), each joined to the next one. */
export function strip(n: number, gap = 80, y = 0): Required<Pick<GraphData, 'nodes' | 'edges'>> {
  const nodes = Array.from({ length: n }, (_, i) => ({ id: `n${i + 1}`, style: { x: i * gap, y } }));
  const edges = nodes.slice(1).map((node, i) => ({ id: `e${i + 1}`, source: `n${i + 1}`, target: node.id }));
  return { nodes, edges };
}

export interface Step {
  /** The call under demonstration, written out as it appears in the code. */
  label: string;
  /** Runs the call; a returned string is shown as its result. */
  run: () => unknown;
}

/**
 * Full view: one button per step, with the label and result in a read-out under the graph.
 * Card: the steps run in turn and the current label is pinned over the graph.
 */
export function steps(stage: Stage, el: HTMLElement, list: Step[], opts: { ms?: number; initial?: string } = {}): void {
  const out = stage.bar ? readout(el) : null;
  if (out) out.textContent = opts.initial ?? 'Press a button to run the call.';
  let tag: HTMLDivElement | null = null;
  if (!stage.bar) {
    stage.container.style.position = 'relative';
    tag = document.createElement('div');
    tag.style.cssText =
      'position:absolute;left:0;bottom:0;right:0;padding:14px 8px 5px;z-index:2;pointer-events:none;font:12px/1.3 ui-monospace,monospace;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.75) 45%)';
    stage.container.append(tag);
  }
  const go = async (s: Step): Promise<void> => {
    if (tag) tag.textContent = s.label;
    const res = await s.run();
    const tail = typeof res === 'string' ? `\n-> ${res}` : '';
    if (out) out.textContent = `${s.label}${tail}`;
    if (tag) tag.textContent = `${s.label}${tail}`;
  };
  if (stage.bar) for (const s of list) button(stage.bar, s.label, () => void go(s));
  else stage.every(opts.ms ?? 1700, (i) => go(list[(i - 1) % list.length]!));
}

/** Rounds a position or box for a read-out line. */
export const fmt = (v: unknown): string => JSON.stringify(v, (_, x) => (typeof x === 'number' ? Math.round(x * 10) / 10 : x));
