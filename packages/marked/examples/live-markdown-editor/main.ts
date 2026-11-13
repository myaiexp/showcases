// Two-pane Markdown editor: marked.parse then DOMPurify then innerHTML
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { Mount } from '@/types.ts';
import './style.css';

const SAMPLE_MD = `# Marked + DOMPurify 📝

A **fast** Markdown parser with a *live* preview.

## GitHub-Flavored Markdown

- [x] Tables
- [x] Task lists
- [ ] ~~Procrastination~~

| Package    | Job                |
| ---------- | ------------------ |
| Marked     | Markdown → HTML    |
| DOMPurify  | Make the HTML safe |

> Marked doesn't sanitize, so we pipe its output through DOMPurify.

\`\`\`js
const html = marked.parse("# Hello");
document.body.innerHTML = DOMPurify.sanitize(html);
\`\`\`

Read more at [marked.js.org](https://marked.js.org).
`;

const pane = (label: string, child: HTMLElement): HTMLDivElement => {
  const box = document.createElement('div');
  const l = document.createElement('div');
  l.className = 'pane-label';
  l.textContent = label;
  box.append(l, child);
  return box;
};

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const output = document.createElement('div');
  output.className = preview ? 'md-preview compact' : 'md-preview';

  const render = (markdown: string): void => {
    const rawHtml = marked.parse(markdown, { async: false });
    output.innerHTML = DOMPurify.sanitize(rawHtml);
  };

  if (preview) {
    render(SAMPLE_MD);
    el.append(output);
    return () => {};
  }

  const input = document.createElement('textarea');
  input.className = 'md-input';
  input.spellcheck = false;
  input.value = SAMPLE_MD;
  const onInput = (): void => render(input.value);
  input.addEventListener('input', onInput);
  const grid = document.createElement('div');
  grid.className = 'editor-grid';
  grid.append(pane('Markdown', input), pane('Rendered preview', output));
  el.append(grid);
  render(SAMPLE_MD);

  return () => input.removeEventListener('input', onInput);
};

export default mount;
