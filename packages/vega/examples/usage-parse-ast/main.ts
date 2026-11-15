// parse(spec, config, {ast: true}) keeps each expression's syntax tree
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// vega-interpreter, the package that evaluates these trees without the Function constructor, is not
// installed in this gallery, so the example stops at what the usage page's step 2 produces: the AST.
interface Ast {
  type: string;
  [key: string]: unknown;
}
const expressions = [
  'a * 2 + max(a, 3)',
  'a > 5 ? "big" : "small"',
  'a * (1 - discount) >= 100 && !flag',
  'format(a, ".1f") + " of " + data("t")[0].v',
];

const label = (n: Ast): string => {
  const extra = n.operator ?? (n.name as string | undefined) ?? n.raw ?? '';
  return `${n.type.replace('Expression', '')}${extra ? ` ${String(extra)}` : ''}`;
};
const kids = (n: Ast): Ast[] => {
  const keys = ['test', 'left', 'right', 'callee', 'arguments', 'consequent', 'alternate', 'argument', 'object', 'property', 'elements'];
  return keys.flatMap((k) => {
    const v = n[k];
    if (Array.isArray(v)) return v as Ast[];
    return v && typeof v === 'object' ? [v as Ast] : [];
  });
};

interface Laid {
  nodes: { id: number; text: string; x: number; y: number }[];
  links: { x: number; y: number; x2: number; y2: number }[];
}
// Leaves take successive columns; a parent sits above the mean of its children.
function layout(root: Ast, width: number): Laid {
  const nodes: Laid['nodes'] = [];
  const links: Laid['links'] = [];
  let leaves = 0;
  const leafCount = (n: Ast): number => (kids(n).length ? kids(n).reduce((s, c) => s + leafCount(c), 0) : 1);
  const total = leafCount(root);
  const place = (n: Ast, depth: number): { x: number; y: number } => {
    const children = kids(n).map((c) => ({ c, pos: place(c, depth + 1) }));
    const x = children.length ? children.reduce((s, k) => s + k.pos.x, 0) / children.length : ((leaves++ + 0.5) / total) * width;
    const y = 18 + depth * 38;
    nodes.push({ id: nodes.length, text: label(n), x, y });
    for (const k of children) links.push({ x, y, x2: k.pos.x, y2: k.pos.y });
    return { x, y };
  };
  place(root, 0);
  return { nodes, links };
}

const parsedFor = (expr: string): { ast: Ast; code: string } => {
  const spec: Spec = { signals: [{ name: 'a', value: 2 }, { name: 'discount', value: 0.1 }, { name: 'flag', value: false }, { name: 'out', update: expr }], data: [{ name: 't', values: [{ v: 9 }] }] };
  const runtime = vega.parse(spec, null as never, { ast: true });
  // The spec's own signal is the operator whose update reads signal `a` (others belong to layout).
  type Update = { code: string; ast?: Ast };
  const found = runtime.operators
    .map((o) => (o as { update?: Update }).update)
    .find((u): u is Update => !!u?.ast && u.code.includes('"$a"'));
  return { ast: found?.ast ?? { type: 'Literal', raw: '?' }, code: found?.code ?? '' };
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const W = 460;
  const build = (expr: string): { laid: Laid; code: string; head: string } => {
    const { ast, code } = parsedFor(expr);
    return { laid: layout(ast, W), code, head: expr };
  };
  const first = build(expressions[0] ?? '');

  const spec: Spec = {
    width: W,
    height: 190,
    padding: { left: 8, right: 8, top: 22, bottom: 30 },
    signals: [{ name: 'head', value: first.head }, { name: 'code', value: first.code }],
    data: [{ name: 'nodes', values: first.laid.nodes }, { name: 'links', values: first.laid.links }],
    marks: [
      { type: 'rule', from: { data: 'links' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, x2: { field: 'x2' }, y2: { field: 'y2' }, stroke: { value: '#4b5565' } } } },
      { type: 'rect', from: { data: 'nodes' }, encode: { update: { xc: { field: 'x' }, yc: { field: 'y' }, width: { signal: 'max(34, length(datum.text) * 6.2 + 10)' }, height: { value: 20 }, cornerRadius: { value: 4 }, fill: { value: '#1d2a3f' }, stroke: { value: '#7dd3fc' } } } },
      { type: 'text', from: { data: 'nodes' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, align: { value: 'center' }, baseline: { value: 'middle' }, text: { field: 'text' }, fill: { value: '#e6e8ee' }, font: { value: 'monospace' }, fontSize: { value: 10.5 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -8 }, text: { signal: "'expression: ' + head" }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { signal: 'height + 22' }, text: { signal: "'generated code: ' + code" }, limit: { signal: 'width' }, fill: { value: '#a6acb8' }, font: { value: 'monospace' }, fontSize: { value: 10 } } } },
    ],
  };
  const view = await stage.render(spec);

  const apply = async (expr: string): Promise<void> => {
    const b = build(expr);
    view.data('nodes', b.laid.nodes).data('links', b.laid.links).signal('head', b.head).signal('code', b.code);
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'expression', expressions, expressions[0] ?? '', (v) => void apply(v));
  if (stage.preview) stage.every(1800, (i) => apply(expressions[i % expressions.length] ?? ''));
  return () => stage.dispose();
};

export default mount;
