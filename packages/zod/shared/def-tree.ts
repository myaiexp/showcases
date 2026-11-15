// Core kit: a schema's _zod.def read as a tree of types and checks
import './def-tree.css';
import type * as core from 'zod/v4/core';

export interface TreeNode {
  /** The field or slot the node sits in: "email", "element", "0", "checks". */
  key?: string;
  /** def.type, or "check" for an entry of def.checks. */
  type: string;
  detail?: string;
  children: TreeNode[];
}

type Def = Record<string, unknown> & { type?: string; checks?: core.$ZodCheck[] };

const primitive = (v: unknown): v is string | number | boolean | bigint => ['string', 'number', 'boolean', 'bigint'].includes(typeof v);

function show(v: unknown): string {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'function') return show((v as () => unknown)());
  if (Array.isArray(v)) return v.map(show).join(' | ');
  if (v && typeof v === 'object') return `{ ${Object.keys(v).join(', ')} }`;
  return String(v);
}

/** One check as "check: min_length", with its small settings as detail ("minimum 3"). */
function checkNode(check: core.$ZodCheck): TreeNode {
  const def = check._zod.def as unknown as Record<string, unknown>;
  const bits = Object.entries(def)
    .filter(([k, v]) => k !== 'check' && k !== 'abort' && k !== 'type' && primitive(v))
    .map(([k, v]) => `${k} ${show(v)}`);
  return { type: String(def['check']), detail: bits.join(', ') || undefined, children: [] };
}

/** Walks a schema the way a code generator would: switch on def.type, recurse into the slots. */
export function defTree(schema: core.$ZodType, key?: string): TreeNode {
  const def = schema._zod.def as unknown as Def;
  const type = String(def.type);
  const sub = (s: unknown, k: string): TreeNode => defTree(s as core.$ZodType, k);
  const node: TreeNode = { key, type, children: [] };
  switch (type) {
    case 'object':
      for (const [k, v] of Object.entries(def['shape'] as Record<string, unknown>)) node.children.push(sub(v, k));
      break;
    case 'array':
      node.children.push(sub(def['element'], 'element'));
      break;
    case 'set':
      node.children.push(sub(def['valueType'], 'valueType'));
      break;
    case 'record':
    case 'map':
      node.children.push(sub(def['keyType'], 'key'), sub(def['valueType'], 'value'));
      break;
    case 'tuple':
      (def['items'] as unknown[]).forEach((s, i) => node.children.push(sub(s, String(i))));
      if (def['rest']) node.children.push(sub(def['rest'], 'rest'));
      break;
    case 'union':
      (def['options'] as unknown[]).forEach((s, i) => node.children.push(sub(s, String(i))));
      if (def['discriminator']) node.detail = `discriminator ${show(def['discriminator'])}`;
      break;
    case 'pipe':
      node.children.push(sub(def['in'], 'in'), sub(def['out'], 'out'));
      break;
    case 'default':
    case 'prefault':
      node.detail = `value ${show(def['defaultValue'])}`;
      node.children.push(sub(def['innerType'], 'innerType'));
      break;
    case 'enum':
      node.detail = show(Object.values(def['entries'] as object));
      break;
    case 'literal':
      node.detail = show(def['values']);
      break;
    default:
      if (def['innerType']) node.children.push(sub(def['innerType'], 'innerType'));
      if (typeof def['format'] === 'string') node.detail = `format ${def['format']}`;
  }
  for (const check of def.checks ?? []) node.children.push({ ...checkNode(check), key: 'checks' });
  return node;
}

/** Draws the tree: indented rows, key then type then detail. `onRow` lets a card reveal rows one by one. */
export function drawTree(node: TreeNode, onRow?: (row: HTMLElement, i: number) => void): HTMLElement {
  const root = document.createElement('div');
  root.className = 'zd-dtree';
  let n = 0;
  const walk = (t: TreeNode, depth: number): void => {
    const row = document.createElement('div');
    row.className = 'zd-dt-row';
    row.dataset['kind'] = t.key === 'checks' ? 'check' : 'type';
    row.style.marginLeft = `${depth * 14}px`;
    if (t.key) {
      const k = document.createElement('span');
      k.className = 'zd-dt-key';
      k.textContent = t.key === 'checks' ? 'check' : t.key;
      row.append(k);
    }
    const ty = document.createElement('b');
    ty.className = 'zd-dt-type';
    ty.textContent = t.type;
    row.append(ty);
    if (t.detail) {
      const d = document.createElement('span');
      d.className = 'zd-dt-detail';
      d.textContent = t.detail;
      row.append(d);
    }
    root.append(row);
    onRow?.(row, n++);
    for (const c of t.children) walk(c, depth + 1);
  };
  walk(node, 0);
  return root;
}

/** How many nodes the tree has, for a caption. */
export function treeSize(node: TreeNode): number {
  return 1 + node.children.reduce((sum, c) => sum + treeSize(c), 0);
}
