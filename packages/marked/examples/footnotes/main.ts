// Extensions plus hooks: [^1] refs become numbered links to end notes
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `The museum opens at nine[^open] and the
queue is long[^queue] on Saturdays.

[^queue]: Book online to skip it.
[^open]: Last entry is at 16:30.
[^unused]: Never cited, so never listed.`;

const CARD = `Opens at nine[^a],
queue is long[^b].

[^b]: Book online.
[^a]: Last entry 16:30.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Cite with [^name], explain with "[^name]: text"' });

  // State for one parse; the preprocess hook clears it before each run.
  let defs = new Map<string, string>();
  let cited: string[] = [];
  const inner = new Marked(); // renders a note's own text without touching the state above

  const notes = new Marked({
    hooks: {
      preprocess(md) {
        defs = new Map();
        cited = [];
        return md;
      },
      // Footnotes go after the page, in the order they were first cited.
      postprocess(html) {
        if (!cited.length) return html;
        const items = cited
          .map((id, i) => `<li id="note-${i + 1}">${inner.parseInline(defs.get(id)!, { async: false })} <a href="#cite-${i + 1}">↩</a></li>`)
          .join('');
        return `${html}<hr><ol class="footnotes">${items}</ol>`;
      },
    },
    extensions: [
      {
        // Block level: "[^id]: text" is stored and prints nothing where it stands.
        name: 'footnoteDef',
        level: 'block',
        start: (src) => src.search(/^\[\^[\w-]+\]:/m),
        tokenizer(src) {
          const match = /^\[\^([\w-]+)\]:[ \t]*([^\n]*)(?:\n|$)/.exec(src);
          if (!match) return undefined;
          defs.set(match[1]!, match[2]!);
          return { type: 'footnoteDef', raw: match[0] };
        },
        renderer: () => '',
      },
      {
        // Inline level: "[^id]" becomes a small number linking to the note, if the note exists.
        name: 'footnoteRef',
        level: 'inline',
        start: (src) => src.indexOf('[^'),
        tokenizer(src) {
          const match = /^\[\^([\w-]+)\]/.exec(src);
          if (!match || !defs.has(match[1]!)) return undefined;
          return { type: 'footnoteRef', raw: match[0], id: match[1]! };
        },
        renderer(token) {
          const id = String(token.id);
          if (!cited.includes(id)) cited.push(id);
          const n = cited.indexOf(id) + 1;
          return `<sup class="cite" id="cite-${n}"><a href="#note-${n}" title="${esc(defs.get(id) ?? '')}">${n}</a></sup>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(notes, md),
    caption:
      'Each [^name] turns into a small number, and the numbered notes are collected under the page in the order they were cited, even though the definitions were written in a different order. A note nobody cites is left out. Click a number to jump to its note.',
  });

  return () => stage.dispose();
};

export default mount;
