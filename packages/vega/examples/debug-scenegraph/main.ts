// view.scenegraph().root is the tree of groups, marks and items behind the picture
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole, show } from '../../shared/api-kit.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Node {
  marktype?: string;
  role?: string;
  items?: (Node & { datum?: unknown; x?: number; y?: number; width?: number; height?: number; fill?: string })[];
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 270, y: 0, width: 330, rows: 14, title: 'view.scenegraph().root' });

  const spec: Spec = {
    width: 220,
    height: 150,
    padding: 8,
    signals: [{ name: 'count', value: 5, bind: { input: 'range', min: 2, max: 9, step: 1 } }],
    data: [{ name: 'table', values: Array.from({ length: 9 }, (_, i) => ({ k: i, v: 20 + ((i * 47) % 70) })), transform: [{ type: 'filter', expr: 'datum.k < count' }] }, con.data],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 3 }],
    marks: [{ type: 'rect', name: 'bars', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } } } }, ...con.marks],
  };
  spec.width = 220;
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 14);

  // Walk the tree: each mark is a node with `items`; group items hold the marks inside them.
  const walk = (node: Node, depth: number, lines: string[]): void => {
    if (!node.marktype || lines.length > 40) return;
    const items = node.items ?? [];
    const label = node.role ? `${node.marktype} (${node.role})` : node.marktype;
    lines.push(`${'  '.repeat(depth)}${label} × ${items.length}`);
    if (node.marktype === 'group') for (const g of items) for (const child of (g as unknown as { items?: Node[] }).items ?? []) walk(child, depth + 1, lines);
  };
  const inspect = async (): Promise<void> => {
    const root = (view.scenegraph() as unknown as { root: Node }).root;
    const lines: string[] = [];
    walk(root, 0, lines);
    // Skip the axis internals and the console: keep the interesting top of the tree short.
    const keep = lines.filter((l) => !/axis-(tick|label|domain|title)|text × [0-9]+$/.test(l) || /^ {0,2}\S/.test(l)).slice(0, 10);
    const bars = ((root.items?.[0] as unknown as { items?: Node[] })?.items ?? []).find((m) => m.role === 'mark' && m.marktype === 'rect');
    const first = bars?.items?.[0];
    out.clear();
    out.push(...keep, first ? `first rect: x ${show(first.x)} y ${show(first.y)} w ${show(first.width)} h ${show(first.height)}` : 'no rect yet', first ? `  datum ${show(first.datum)}` : '');
    await out.show();
  };
  await inspect();
  const set = async (n: number): Promise<void> => {
    view.signal('count', n);
    await view.runAsync();
    await inspect();
  };
  if (stage.bar) slider(stage.bar, 'bars shown', [2, 9, 1], 5, (v) => void set(v));
  if (stage.preview) stage.every(1300, (i) => set(2 + ((i * 3) % 8)));
  return () => stage.dispose();
};

export default mount;
