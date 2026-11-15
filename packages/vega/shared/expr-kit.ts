// Expressions: a table of expression -> live result, drawn as text marks inside a spec
import type { Mark } from 'vega';

/** A heading line, or an expression whose source text is shown beside its live result. */
export type ExprRow = string | { head: string } | { expr: string; label?: string };

export interface ExprTableOptions {
  /** Pixel width of the expression column; default 300. */
  labelWidth?: number;
  /** Pixel width of the result column; default 220. */
  resultWidth?: number;
  /** Row height in pixels; default 18. */
  rowHeight?: number;
}

const L = (o: ExprTableOptions): number => o.labelWidth ?? 300;
const R = (o: ExprTableOptions): number => o.resultWidth ?? 220;
const H = (o: ExprTableOptions): number => o.rowHeight ?? 18;

/** The spec width and height a table of these rows needs. */
export function exprSize(rows: readonly ExprRow[], opts: ExprTableOptions = {}): { width: number; height: number } {
  return { width: L(opts) + R(opts), height: rows.length * H(opts) };
}

/**
 * Text marks for a table: each row's expression source on the left (grey, monospace) and,
 * on the right, the expression itself evaluated as a text-mark `signal`, so it re-runs
 * whenever a signal it reads changes. Results are coerced with `"" + (...)`, so arrays
 * print comma-joined instead of becoming multi-line text.
 */
export function exprMarks(rows: readonly ExprRow[], opts: ExprTableOptions = {}): Mark[] {
  const marks: Mark[] = [];
  rows.forEach((row, i) => {
    const y = i * H(opts) + H(opts) / 2;
    if (typeof row === 'object' && 'head' in row) {
      marks.push({
        type: 'text',
        encode: {
          enter: {
            x: { value: 0 },
            y: { value: y },
            text: { value: row.head },
            fill: { value: '#8fb8de' },
            fontWeight: { value: 'bold' },
            fontSize: { value: 11 },
            baseline: { value: 'middle' },
          },
        },
      });
      return;
    }
    const expr = typeof row === 'string' ? row : row.expr;
    const label = typeof row === 'string' ? row : (row.label ?? row.expr);
    marks.push({
      type: 'text',
      encode: {
        enter: {
          x: { value: 0 },
          y: { value: y },
          text: { value: label },
          limit: { value: L(opts) - 12 },
          fill: { value: '#a6acb8' },
          font: { value: 'ui-monospace, Menlo, Consolas, monospace' },
          fontSize: { value: 11 },
          baseline: { value: 'middle' },
        },
      },
    });
    marks.push({
      type: 'text',
      encode: {
        enter: { x: { value: L(opts) }, y: { value: y }, baseline: { value: 'middle' }, fontSize: { value: 11 } },
        update: {
          text: { signal: `"" + (${expr})` },
          fill: { value: '#ffb454' },
          limit: { value: R(opts) - 4 },
        },
      },
    });
  });
  return marks;
}
