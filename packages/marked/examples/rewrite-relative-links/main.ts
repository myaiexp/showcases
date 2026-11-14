// walkTokens prefixes a base address onto every relative link and image
import { Marked, type MarkedExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const PAGE = `# Release notes

Read the [install guide](guide/install.md) and the
[changelog](../changes.html).

Absolute links stay put: [homepage](https://app.example/),
[mail us](mailto:hi@app.example), [top](#top).

![Dashboard](img/dashboard.png)`;

const CARD = `[Install](guide/a.md)
[Changes](../c.html)
[Home](https://a.example)
[Top](#top)`;

const BASES = ['https://docs.example/v2/', 'https://cdn.example/files/'] as const;

const isRelative = (href: string): boolean => !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write [text](some/page.html) and pick a base address' });
  let base: string = BASES[0];

  // Both columns show the destination after each link, so the difference is visible.
  const showDestination: MarkedExtension = {
    renderer: {
      link({ href, tokens }) {
        return `<a href="${esc(href)}">${this.parser.parseInline(tokens)}</a> <small>→ ${esc(href)}</small>`;
      },
    },
  };
  const plain = new Marked(showDestination);
  const rebased = new Marked(showDestination, {
    walkTokens(token) {
      if ((token.type === 'link' || token.type === 'image') && isRelative(token.href)) {
        token.href = new URL(token.href, base).href;
      }
    },
  });

  const demo = compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PAGE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'walkTokens rebase', render: (md) => render(rebased, md) },
    ],
    caption:
      'Notes written with short relative paths still work when they are shown on another site: each relative link and image is resolved against a base address (the grey arrow shows where it points), and absolute, mail and in-page links are left alone.',
  });
  if (stage.bar) {
    select(stage.bar, 'Base address', BASES, (v) => {
      base = v;
      demo.refresh();
    });
  }
  if (stage.preview) base = 'https://d.fi/';

  return () => stage.dispose();
};

export default mount;
