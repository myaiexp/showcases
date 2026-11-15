// Errors kit: draws the objects z.treeifyError, z.formatError and z.flattenError return
import './error-format-view.css';

interface TreeNode {
  errors: string[];
  properties?: Record<string, TreeNode | undefined>;
  items?: (TreeNode | undefined)[];
}

function line(depth: number, label: string, text: string, tone: 'bad' | 'dim' | 'plain'): HTMLElement {
  const row = document.createElement('div');
  row.className = 'ef-row';
  row.dataset['tone'] = tone;
  row.style.paddingLeft = `${depth * 14}px`;
  const key = document.createElement('b');
  key.textContent = label;
  const value = document.createElement('span');
  value.textContent = text;
  row.append(key, value);
  return row;
}

/** The nested object of z.treeifyError: errors per node, properties for objects, items for arrays. */
export function treeView(tree: TreeNode): HTMLElement {
  const root = document.createElement('div');
  root.className = 'ef-tree';
  const walk = (node: TreeNode | undefined, label: string, depth: number): void => {
    if (!node) {
      // An array slot with no error is a hole: the value undefined.
      root.append(line(depth, label, 'undefined', 'dim'));
      return;
    }
    root.append(line(depth, label, node.errors.length ? '' : '{ }', node.errors.length ? 'plain' : 'dim'));
    for (const message of node.errors) root.append(line(depth + 1, 'errors', `✖ ${message}`, 'bad'));
    for (const [k, child] of Object.entries(node.properties ?? {})) walk(child, `properties.${k}`, depth + 1);
    // treeifyError's items array is sparse: forEach would skip the holes, so index it.
    for (let i = 0; i < (node.items?.length ?? 0); i++) walk(node.items![i], `items[${i}]`, depth + 1);
  };
  walk(tree, 'tree', 0);
  return root;
}

interface FormatNode {
  _errors: string[];
  [key: string]: FormatNode | string[];
}

/** The nested object of the deprecated z.formatError: _errors at every level, children by key. */
export function formatView(tree: FormatNode): HTMLElement {
  const root = document.createElement('div');
  root.className = 'ef-tree';
  const walk = (node: FormatNode, label: string, depth: number): void => {
    root.append(line(depth, label, '', 'plain'));
    for (const message of node._errors) root.append(line(depth + 1, '_errors', `✖ ${message}`, 'bad'));
    for (const [k, child] of Object.entries(node)) if (k !== '_errors') walk(child as FormatNode, k, depth + 1);
  };
  walk(tree, 'formatted', 0);
  return root;
}

/** z.flattenError's two parts: formErrors (top level) and fieldErrors (one list per first key). */
export function flatView(flat: { formErrors: string[]; fieldErrors: Record<string, string[] | undefined> }): HTMLElement {
  const root = document.createElement('div');
  root.className = 'ef-tree';
  root.append(line(0, 'formErrors', flat.formErrors.length ? '' : '[ ]', flat.formErrors.length ? 'plain' : 'dim'));
  for (const m of flat.formErrors) root.append(line(1, '', `✖ ${m}`, 'bad'));
  root.append(line(0, 'fieldErrors', '', 'plain'));
  for (const [k, list] of Object.entries(flat.fieldErrors)) {
    root.append(line(1, k, '', 'plain'));
    for (const m of list ?? []) root.append(line(2, '', `✖ ${m}`, 'bad'));
  }
  return root;
}

/** Plain text in a block, as z.prettifyError returns it. */
export function textBlock(text: string): HTMLElement {
  const pre = document.createElement('pre');
  pre.className = 'ef-pre';
  pre.textContent = text;
  return pre;
}
