// parse() wraps text in <p>; parseInline() returns only inline HTML
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { htmlPane, row } from '../../shared/panes.ts';

// The same Markdown string is dropped into three small places on a page.
const into = (html: string, small: boolean): string => {
  const framed = `<span style="outline:1px dashed var(--accent);outline-offset:1px">${html}</span>`;
  return (
    `<div style="margin:2px 0">Status: ${framed} since Monday.</div>` +
    `<div style="margin:6px 0"><button type="button" class="btn">${html}</button></div>` +
    (small ? '' : `<h3>${html}</h3><table><tbody><tr><td>${html}</td></tr></tbody></table>`)
  );
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a short label with **bold** or _italic_' });
  const marked = new Marked();
  const raw = [htmlPane(stage, 'parse() returned'), htmlPane(stage, 'parseInline() returned')];

  compareDemo(stage, {
    samples: [
      { label: 'Button label', text: '**Save** the _draft_' },
      { label: 'Order status', text: 'Order #12 *shipped*' },
    ],
    sides: [
      {
        label: 'marked.parse',
        render(md) {
          const out = marked.parse(md, { async: false });
          raw[0]!.show(out);
          return into(out, stage.preview);
        },
      },
      {
        label: 'marked.parseInline',
        render(md) {
          const out = marked.parseInline(md, { async: false });
          raw[1]!.show(out);
          return into(out, stage.preview);
        },
      },
    ],
    html: false,
    caption:
      'Dropped into a sentence, a button, a heading and a table cell: parse() adds a paragraph, a block that breaks the sentence and pads the others. parseInline() adds no wrapper, so the text sits inside the sentence like any other words.',
  });
  if (!stage.preview) row(stage.root, ...raw.map((r) => r.el));

  return () => stage.dispose();
};

export default mount;
