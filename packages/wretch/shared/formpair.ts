// Your object on the left, the form fields the server received on the right
import { bodyLines } from './envelope.ts';
import { pane, type Pane } from './pane.ts';
import { columns } from './screen.ts';
import type { ServerRequest } from './server.ts';
import type { Stage } from './stage.ts';

export interface FormPair {
  left: Pane;
  right: Pane;
  /** Shows `source` as JSON on the left and the body of `req` on the right. */
  show(source: unknown, req: ServerRequest | null): void;
}

/** An object as an indented tree: one line per key, no quotes or braces. */
function treeLines(value: object, depth = 0): string[] {
  return Object.entries(value).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? [`${'  '.repeat(depth)}${k}`, ...treeLines(v as object, depth + 1)]
      : [`${'  '.repeat(depth)}${k}: ${Array.isArray(v) ? `[${v.join(', ')}]` : String(v)}`],
  );
}

export function formPair(stage: Stage, leftTitle = 'Your object', rightTitle = 'Fields the server got'): FormPair {
  const [a, b] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const left = pane(a, leftTitle);
  const right = pane(b, rightTitle);
  return {
    left,
    right,
    show(source, req) {
      left.clear();
      right.clear();
      for (const line of treeLines(source as object)) left.add(line);
      if (!req) return;
      const lines = bodyLines(req.body);
      for (const line of lines) right.add(line, /\[object Object\]/.test(line) ? 'bad' : undefined);
      if (!lines.length) right.add('(no body)', 'dim');
    },
  };
}
