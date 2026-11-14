// A small table: one row per book, with a kept/hidden cell for each way of searching
export interface VerdictTable {
  /** Marks each book kept (true) or hidden (false) per column; null clears the marks. */
  show(columns: readonly (readonly boolean[] | null)[]): void;
}

export interface Book {
  title: string;
  author: string;
}

/** `compact` writes a tick or a cross instead of words, for narrow cards. */
export function verdictTable(parent: HTMLElement, books: readonly Book[], heads: readonly string[], compact = false): VerdictTable {
  const el = document.createElement('div');
  el.className = 'ik-table';
  el.style.gridTemplateColumns = `minmax(0, 1fr) repeat(${heads.length}, ${compact ? '4em' : '5.5em'})`;
  const cells: HTMLElement[][] = heads.map(() => []);
  el.append(document.createElement('span'));
  for (const h of heads) {
    const head = document.createElement('span');
    head.className = 'ik-head';
    head.textContent = h;
    el.append(head);
  }
  for (const b of books) {
    const name = document.createElement('span');
    name.className = 'ik-book';
    const author = document.createElement('small');
    author.textContent = b.author;
    const title = document.createElement('span');
    title.className = 'ik-title';
    title.textContent = b.title;
    name.append(title, author);
    el.append(name);
    heads.forEach((_, c) => {
      const cell = document.createElement('span');
      cell.className = 'ik-cell';
      cells[c]!.push(cell);
      el.append(cell);
    });
  }
  parent.append(el);
  return {
    show(columns) {
      columns.forEach((keep, c) => {
        cells[c]!.forEach((cell, i) => {
          const v = keep ? keep[i] : undefined;
          cell.textContent = v === undefined ? '' : v ? (compact ? '✓' : 'stays') : compact ? '✗' : 'hidden';
          cell.dataset['state'] = v === undefined ? 'idle' : v ? 'keep' : 'drop';
        });
      });
    },
  };
}
