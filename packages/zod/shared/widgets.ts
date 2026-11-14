// Small pieces for Zod examples: a code line, stat pills, a plain note
import './views.css';

/** One line of code (the schema or the call the example is about), cut with … in cards. */
export function codeLine(parent: HTMLElement, text: string): HTMLElement {
  const el = document.createElement('code');
  el.className = 'zd-call';
  el.textContent = text;
  parent.append(el);
  return el;
}

export type PillTone = 'ok' | 'bad' | 'warn' | 'info';

/** A row of "label value" pills; returns a setter for each pill by index. */
export function pills(parent: HTMLElement, labels: readonly string[]): ((value: string, tone?: PillTone) => void)[] {
  const row = document.createElement('div');
  row.className = 'zd-pills';
  parent.append(row);
  return labels.map((label) => {
    const pill = document.createElement('span');
    pill.className = 'zd-pill';
    const b = document.createElement('b');
    pill.append(`${label} `, b);
    row.append(pill);
    return (value: string, tone: PillTone = 'info') => {
      b.textContent = value;
      pill.dataset['tone'] = tone;
    };
  });
}

/** A paragraph of plain text in the scene, e.g. what a TypeScript type would say. */
export function note(parent: HTMLElement, text = ''): HTMLElement {
  const el = document.createElement('div');
  el.className = 'zd-note-box';
  el.textContent = text;
  parent.append(el);
  return el;
}

/** "1 issue", "3 issues". */
export function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}
