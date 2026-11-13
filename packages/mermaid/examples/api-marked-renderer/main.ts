// A marked Renderer whose code() emits <pre class="mermaid"> for mermaid fences, then mermaid.run draws them
import { Marked, Renderer } from 'marked';
import type { Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { mermaid } from '../../shared/setup.ts';
import { statusLine } from '../../shared/playground.ts';
import './style.css';

const SOURCES = [
  `# Release notes

Plain code stays code:

\`\`\`js
const answer = 42;
\`\`\`

And a mermaid fence becomes a diagram:

\`\`\`mermaid
flowchart LR
    Commit --> Build --> Deploy
\`\`\``,
  `# Incident review

\`\`\`sh
kubectl rollout undo deploy/web
\`\`\`

\`\`\`mermaid
sequenceDiagram
    Pager->>Engineer: Alert
    Engineer->>Cluster: Roll back
    Cluster-->>Engineer: Healthy
\`\`\``,
];

const escapeHtml = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The docs' renderer: code() returns <pre class="mermaid"> for diagram languages and a normal
// <pre><code> otherwise. marked 18 passes a token object instead of (code, language), and the
// text is HTML-escaped here because it goes into innerHTML (Mermaid reads it back as textContent).
function makeMarked(): Marked {
  const renderer = new Renderer();
  renderer.code = ({ text, lang }: Tokens.Code): string =>
    lang === 'mermaid'
      ? `<pre class="mermaid md-mermaid">${escapeHtml(text)}</pre>`
      : `<pre><code>${escapeHtml(text)}</code></pre>`;
  // Raw HTML typed into the editor is shown as text, never inserted as markup.
  renderer.html = ({ text }: Tokens.HTML | Tokens.Tag): string => escapeHtml(text);
  return new Marked({ renderer });
}

const mount: Mount = (el, { preview, signal }) => {
  const md = makeMarked();
  const doc = document.createElement('div');
  doc.className = preview ? 'md-doc md-card' : 'md-doc';
  let busy = false;
  let dirty = false;
  let timer = 0;
  let which = 0;

  const draw = async (source: string, report?: (t: string, e?: boolean) => void): Promise<void> => {
    if (busy) {
      dirty = true;
      return;
    }
    busy = true;
    try {
      // Markdown in, HTML out; only the mermaid fences become .md-mermaid blocks.
      doc.innerHTML = md.parse(source, { async: false });
      // The selector starts at this example's own wrapper so no other .mermaid element is touched.
      await mermaid.run({ querySelector: '.md-doc .md-mermaid', suppressErrors: !report });
      if (!signal.aborted) report?.(`${doc.querySelectorAll('.md-mermaid svg').length} diagram(s) drawn from the Markdown`);
    } catch (err) {
      if (!signal.aborted) report?.(err instanceof Error ? err.message : String(err), true);
    }
    busy = false;
    if (dirty && !signal.aborted) {
      dirty = false;
      void draw(source, report);
    }
  };

  el.append(doc);
  if (preview) {
    void draw(SOURCES[0]!);
    timer = window.setInterval(() => void draw(SOURCES[++which % SOURCES.length]!), 3500);
    return () => clearInterval(timer);
  }
  const editor = document.createElement('textarea');
  editor.className = 'mm-editor';
  editor.spellcheck = false;
  editor.value = SOURCES[0]!;
  editor.setAttribute('aria-label', 'Markdown source');
  const report = statusLine(el);
  el.insertBefore(editor, doc);
  const onInput = (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => void draw(editor.value, report), 350);
  };
  editor.addEventListener('input', onInput);
  void draw(editor.value, report);
  return () => {
    clearTimeout(timer);
    editor.removeEventListener('input', onInput);
  };
};

export default mount;
