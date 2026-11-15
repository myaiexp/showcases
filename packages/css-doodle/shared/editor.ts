// Full-view code editor for a doodle: edit to re-render, see seed and warnings
import type { CSSDoodle } from './types.ts';

export interface Editor {
  /** Replaces the editor text (does not re-render). */
  set(code: string): void;
  /** Adds a warning from the doodle's `warn` event under the editor. */
  warn(message: string): void;
}

export function attachEditor(parent: HTMLElement, doodle: CSSDoodle, code: string): Editor {
  const box = document.createElement('div');
  box.className = 'cd-editor';
  const label = document.createElement('label');
  label.textContent = 'Doodle code: edit it to re-render';
  const area = document.createElement('textarea');
  area.spellcheck = false;
  area.value = code;
  const fit = (): void => {
    area.rows = Math.min(24, Math.max(3, area.value.split('\n').length));
  };
  fit();
  label.append(area);
  const status = document.createElement('div');
  status.className = 'cd-status';
  const warnings = document.createElement('ul');
  warnings.className = 'cd-warnings';
  box.append(label, status, warnings);
  parent.prepend(box);

  let timer: ReturnType<typeof setTimeout> | undefined;
  area.addEventListener('input', () => {
    fit();
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (doodle.isConnected) doodle.update(area.value);
    }, 350);
  });
  // A render's warnings arrive as events during it; start each update with an empty list.
  doodle.addEventListener('beforeUpdate', () => warnings.replaceChildren());
  doodle.addEventListener('render', (e) => {
    if (e.target !== doodle) return;
    const n = warnings.childElementCount;
    status.textContent = `seed ${doodle.seed ?? '?'} · ${n === 0 ? 'no warnings' : n === 1 ? '1 warning' : `${n} warnings`}`;
  });

  return {
    set(text) {
      area.value = text;
      fit();
    },
    warn(message) {
      const li = document.createElement('li');
      li.textContent = message;
      warnings.append(li);
    },
  };
}
