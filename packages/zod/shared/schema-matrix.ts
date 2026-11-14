// A grid: each row is an input, each column a schema, each cell ✓ or ✗
import './tour.css';
import type { Stage } from './stage.ts';
import { leaf } from './value-view.ts';
import type { Result } from './verdict.ts';

export interface MatrixColumn {
  /** Column title, e.g. the schema in a few characters. */
  head: string;
  /** Title in a card, where columns are narrow. Defaults to `head`. */
  short?: string;
  schema: { safeParse(input: unknown): Result };
}

export interface MatrixRow {
  /** Written in the first column, e.g. "undefined" or "{ a: undefined }". */
  label: string;
  value: unknown;
}

/**
 * Draws the grid. In a card the verdicts light up row by row, forever; in the full view
 * every cell is there at once and says why it failed.
 */
export function schemaMatrix(parent: HTMLElement, stage: Stage, columns: readonly MatrixColumn[], rows: readonly MatrixRow[]): void {
  const grid = document.createElement('div');
  grid.className = 'zd-matrix';
  grid.style.gridTemplateColumns = `minmax(0, ${columns.length > 2 ? 1.5 : 1.8}fr) repeat(${columns.length}, minmax(0, 1fr))`;
  const cells: HTMLElement[][] = [];
  const head = (text: string): void => {
    const h = document.createElement('div');
    h.className = 'zd-mhead';
    h.textContent = text;
    grid.append(h);
  };
  head('Input');
  for (const c of columns) head(stage.preview ? (c.short ?? c.head) : c.head);
  for (const row of rows) {
    const label = document.createElement('div');
    label.className = 'zd-mlabel';
    label.textContent = row.label;
    grid.append(label);
    const line: HTMLElement[] = [];
    for (const c of columns) {
      const result = c.schema.safeParse(row.value);
      const cell = document.createElement('div');
      cell.className = 'zd-mcell';
      cell.dataset['ok'] = String(result.success);
      const icon = document.createElement('b');
      icon.textContent = result.success ? '✓' : '✗';
      cell.append(icon);
      if (result.success) {
        if (!stage.preview) cell.append(' ', leaf(result.data));
      } else if (!stage.preview) {
        const why = document.createElement('span');
        why.className = 'zd-mwhy';
        why.textContent = result.error.issues[0]?.message ?? '';
        cell.append(why);
      }
      line.push(cell);
      grid.append(cell);
    }
    cells.push(line);
  }
  parent.append(grid);
  if (!stage.preview) return;
  const hide = (on: boolean): void => {
    for (const line of cells) for (const cell of line) cell.style.visibility = on ? 'hidden' : 'visible';
  };
  hide(true);
  stage.play(async (wait) => {
    hide(true);
    for (const line of cells) {
      await wait(500);
      for (const cell of line) {
        cell.style.visibility = 'visible';
        cell.animate([{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' });
      }
    }
    await wait(2600);
  });
}
