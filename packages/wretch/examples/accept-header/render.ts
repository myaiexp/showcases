// Shows an answer the way the app would: a table for JSON, plain text for CSV, source for HTML
export interface AnswerView {
  show(contentType: string, text: string): void;
}

/** `rows` limits how many JSON rows the table shows (cards are small). */
export function renderAnswer(parent: HTMLElement, rows = Infinity): AnswerView {
  const box = document.createElement('div');
  box.className = 'answer';
  const title = document.createElement('div');
  title.className = 'answer-title';
  const body = document.createElement('div');
  box.append(title, body);
  parent.append(box);

  return {
    show(contentType, text) {
      const kind = contentType.split(';')[0]!;
      title.textContent = `The app received ${kind}`;
      body.replaceChildren();
      if (kind === 'application/json') {
        const table = document.createElement('table');
        for (const row of (JSON.parse(text) as { name: string; price: number }[]).slice(0, rows)) {
          const tr = table.insertRow();
          tr.insertCell().textContent = row.name;
          tr.insertCell().textContent = `${row.price} €`;
        }
        body.append(table);
      } else {
        // CSV and HTML arrive as text: show them as written.
        const pre = document.createElement('pre');
        pre.textContent = text;
        body.append(pre);
      }
      box.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 300 });
    },
  };
}
