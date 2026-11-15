// Defaults kit: two titled columns side by side, each with a body and a result line
import './side-by-side.css';

export interface Column {
  body: HTMLElement;
  /** A line under the body for the outcome of an attempt. */
  log: HTMLElement;
}

/** Sets the log line: "ok" in green, "bad" in red. */
export function logLine(col: Column, text: string, tone: 'ok' | 'bad' | 'info' = 'info'): void {
  col.log.textContent = text;
  col.log.dataset['tone'] = tone;
}

/** Two (or more) equal columns, one per title, each a box with a body and a log line. */
export function columns(parent: HTMLElement, titles: readonly string[]): Column[] {
  const grid = document.createElement('div');
  grid.className = 'zd-sbs';
  grid.style.gridTemplateColumns = `repeat(${titles.length}, minmax(0, 1fr))`;
  parent.append(grid);
  return titles.map((title) => {
    const box = document.createElement('div');
    box.className = 'zd-sbs-box';
    const head = document.createElement('div');
    head.className = 'zd-sbs-head';
    head.textContent = title;
    const body = document.createElement('div');
    const log = document.createElement('div');
    log.className = 'zd-sbs-log';
    box.append(head, body, log);
    grid.append(box);
    return { body, log };
  });
}
