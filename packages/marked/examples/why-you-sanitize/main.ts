// Marked passes raw HTML through; DOMPurify strips the dangerous parts before display
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, putHtml, row, sourcePane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';
import { dangerPane } from './danger.ts';
import './style.css';

// Comments a stranger might post. Each hides HTML that would run code on a reader's page.
const SAMPLES = [
  { label: 'Image with onerror', text: `Nice post!\n\n<img src="x" onerror="alert('not happening')">` },
  { label: 'Script tag', text: `**Great** read.\n<script>steal(document.cookie)</script>` },
  { label: 'javascript: link', text: `[Click for a prize](javascript:alert(1))` },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try your own HTML in the comment box' });
  const src = sourcePane(stage, stage.preview ? '' : SAMPLES[0]!.text, 'Comment');
  const raw = dangerPane(stage, 'marked.parse() output');
  const safe = docPane(stage, 'After DOMPurify');
  if (stage.preview) {
    src.el.classList.add('mk-pane-src-top');
    stage.root.append(src.el);
    row(stage.root, raw.el, safe.el);
  } else {
    row(stage.root, src.el, raw.el, safe.el);
    note(stage.root, 'Marked does not sanitize: the HTML in red reaches its output untouched. Only the cleaned HTML is put on the page.');
  }

  const run = (markdown: string): void => {
    // Marked converts the Markdown and keeps the inline HTML exactly as written...
    const html = marked.parse(markdown, { async: false });
    raw.show(html);
    // ...so the docs' recommendation is to sanitize the *output* before display.
    putHtml(safe.body, DOMPurify.sanitize(html));
  };

  if (stage.preview) {
    typeLoop(stage, SAMPLES, (text) => {
      src.set(text);
      run(text);
    });
  } else {
    src.onInput(run);
    run(SAMPLES[0]!.text);
  }
  return () => stage.dispose();
};

export default mount;
