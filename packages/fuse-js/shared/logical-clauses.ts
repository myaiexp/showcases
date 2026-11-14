// Full-view editors for a few "key: text" clauses, with one-click presets
import { button } from './controls.ts';

export interface Clause {
  key: string;
  text: string;
}

/**
 * Fills `bar` with a key menu and a text box per clause, plus a button per preset.
 * Edits write straight into `clauses`, then call `onChange`.
 */
export function clauseBar(bar: HTMLElement, clauses: Clause[], keys: readonly string[], presets: readonly (readonly [string, readonly Clause[]])[], onChange: () => void): void {
  const sync: (() => void)[] = [];
  clauses.forEach((clause) => {
    const wrap = document.createElement('label');
    const sel = document.createElement('select');
    for (const k of keys) sel.add(new Option(k, k));
    const input = document.createElement('input');
    input.type = 'text';
    input.size = 12;
    input.spellcheck = false;
    const show = (): void => {
      sel.value = clause.key;
      input.value = clause.text;
    };
    show();
    sync.push(show);
    sel.addEventListener('change', () => {
      clause.key = sel.value;
      onChange();
    });
    input.addEventListener('input', () => {
      clause.text = input.value;
      onChange();
    });
    wrap.append(sel, input);
    bar.append(wrap);
  });
  for (const [label, set] of presets) {
    button(bar, label, () => {
      clauses.forEach((c, i) => Object.assign(c, set[i] ?? { text: '' }));
      sync.forEach((fn) => fn());
      onChange();
    });
  }
}
