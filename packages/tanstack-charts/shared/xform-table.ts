// Plain-text tables of derived rows for the readout panel
import type { Stage } from './stage.ts';

const cell = (v: unknown): string => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(Math.round(v * 1000) / 1000);
  if (Array.isArray(v)) return `[${v.length}]`;
  if (v === null || v === undefined) return String(v);
  return String(v);
};

/** Rows as aligned columns: the first `limit` rows, then a count of the rest. */
export function tableText(rows: readonly object[], cols: readonly string[], limit = 8): string {
  const shown = rows.slice(0, limit).map((r) => cols.map((c) => cell((r as Record<string, unknown>)[c])));
  const widths = cols.map((c, i) => Math.max(c.length, ...shown.map((r) => r[i]!.length)));
  const line = (r: readonly string[]): string => r.map((v, i) => v.padEnd(widths[i]!)).join('  ').trimEnd();
  const out = [line(cols), ...shown.map(line)];
  if (rows.length > limit) out.push(`... ${rows.length - limit} more rows (${rows.length} in all)`);
  return out.join('\n');
}

/** A readout panel in the full view; `show` replaces its text. In a card `show` does nothing. */
export function readoutPanel(stage: Stage): (text: string) => void {
  if (stage.preview) return () => {};
  const pre = stage.readout();
  return (text) => {
    pre.textContent = text;
  };
}
