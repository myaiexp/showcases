// JSON editor validated against a nested Zod schema, with path-aware issues
import type { Mount } from '@/types.ts';
import { PREVIEW_TEXTS, check } from './schema.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const editor = document.createElement('textarea');
  editor.className = 'editor';
  editor.spellcheck = false;
  editor.readOnly = preview;
  const output = document.createElement('div');
  root.append(editor, output);

  const render = (): void => {
    const problems = check(editor.value);
    output.replaceChildren();
    if (problems.length === 0) {
      const ok = document.createElement('div');
      ok.className = 'all-good';
      ok.textContent = 'Valid order: passes every rule, including the total check.';
      output.append(ok);
      return;
    }
    const ul = document.createElement('ul');
    ul.className = 'issues';
    for (const p of problems) {
      const li = document.createElement('li');
      li.className = 'issue';
      const path = document.createElement('span');
      path.className = 'path';
      path.textContent = p.path;
      const msg = document.createElement('span');
      msg.textContent = p.message;
      li.append(path, msg);
      ul.append(li);
    }
    output.append(ul);
  };

  let timer: ReturnType<typeof setInterval> | undefined;
  if (preview) {
    let i = 0;
    const show = (): void => {
      editor.value = PREVIEW_TEXTS[i++ % PREVIEW_TEXTS.length] ?? '';
      render();
    };
    show();
    timer = setInterval(show, 2500);
  } else {
    editor.value = PREVIEW_TEXTS[0] ?? '';
    editor.addEventListener('input', render);
    render();
  }
  return () => clearInterval(timer);
};

export default mount;
