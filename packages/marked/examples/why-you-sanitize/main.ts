// Shows raw marked output, DOMPurify output and the sanitized live render
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { Mount } from '@/types.ts';
import './style.css';

const SAMPLE_XSS = `# Looks innocent 👋

Normal **markdown** renders just fine.

<img src=x onerror="alert('xss')">
<a href="javascript:alert('clicked')">totally safe link</a>
<script>alert('pwned')</script>
`;

const el$ = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const column = (label: string, tone: 'danger' | 'safe', source: HTMLElement): HTMLDivElement => {
  const col = el$('div', 'san-col');
  const l = el$('div', 'pane-label');
  const t = el$('span', tone, label);
  l.append(t);
  col.append(l, source);
  return col;
};

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const live = el$('div', preview ? 'md-preview compact' : 'md-preview');
  const note = el$('div', 'stripped');
  const rawSource = el$('pre', 'html-source danger');
  const cleanSource = el$('pre', 'html-source safe');

  const run = (source: string): void => {
    const rawHtml = marked.parse(source, { async: false });
    const clean = DOMPurify.sanitize(rawHtml);
    rawSource.textContent = rawHtml.trim();
    cleanSource.textContent = clean.trim();
    live.innerHTML = clean;
    const removed = rawHtml.length - clean.length;
    note.textContent =
      removed > 0
        ? `DOMPurify stripped ${removed} characters of unsafe markup.`
        : 'Nothing needed removing: this input was already safe.';
  };

  if (preview) {
    run(SAMPLE_XSS);
    el.append(note, live);
    return () => {};
  }

  const label = el$('div', 'pane-label', 'Untrusted Markdown / HTML input');
  const input = el$('textarea', 'md-input');
  input.spellcheck = false;
  input.value = SAMPLE_XSS;
  const onInput = (): void => run(input.value);
  input.addEventListener('input', onInput);

  const rawNote = el$(
    'div',
    'live-note',
    'Shown as text, never inserted: the onerror / <script> would otherwise execute.',
  );
  const cols = el$('div', 'san-output');
  const rawCol = column('marked.parse() (unsafe)', 'danger', rawSource);
  rawCol.append(rawNote);
  const cleanCol = column('DOMPurify.sanitize() (safe)', 'safe', cleanSource);
  cleanCol.append(note);
  cols.append(rawCol, cleanCol);

  const liveBox = el$('div', 'live-box');
  liveBox.append(el$('div', 'pane-label', 'Live render of the sanitized HTML'), live);

  el.append(label, input, cols, liveBox);
  run(SAMPLE_XSS);

  return () => input.removeEventListener('input', onInput);
};

export default mount;
