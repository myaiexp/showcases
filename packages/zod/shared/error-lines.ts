// Errors kit: a list of tagged lines (language, parse number, rung) with room for long messages
import './error-lines.css';

export interface Line {
  tag: string;
  text: string;
  /** Extra small words after the tag, e.g. a language name. */
  sub?: string;
  tone?: 'ok' | 'bad';
}

export interface LineTable {
  el: HTMLElement;
  /** Replaces the lines; in a card they arrive one by one. */
  show(lines: readonly Line[], stagger?: boolean): void;
}

export function lineTable(parent: HTMLElement, animate: (fn: () => void, i: number) => void): LineTable {
  const el = document.createElement('div');
  el.className = 'el-lines';
  parent.append(el);
  let gen = 0;
  const build = (line: Line): HTMLElement => {
    const row = document.createElement('div');
    row.className = 'el-line';
    if (line.tone) row.dataset['tone'] = line.tone;
    const tag = document.createElement('b');
    tag.textContent = line.tag;
    if (line.sub) tag.title = line.sub;
    const text = document.createElement('span');
    text.textContent = line.text;
    text.dir = 'auto';
    row.append(tag, text);
    return row;
  };
  return {
    el,
    show(lines, stagger = false) {
      const mine = ++gen;
      el.replaceChildren();
      lines.forEach((line, i) => {
        const add = (): void => {
          if (mine !== gen) return;
          const row = build(line);
          el.append(row);
          row.animate([{ opacity: 0, transform: 'translateX(-5px)' }, { opacity: 1, transform: 'none' }], { duration: 220 });
        };
        if (stagger) animate(add, i);
        else add();
      });
    },
  };
}
