// renderer.link marks links that leave the site with ↗ and opens them in a new tab
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const PAGE = `Planning the trip: read our [packing list](#packing) first,
then check the [train times](https://example.com/trains "Opens another site")
and the [weather](https://example.org/weather).

Questions? See the [FAQ](/faq).`;

const CARD = `See the [list](#packing)
and the [trains](https://example.com).`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Links that start with https:// are external' });

  const external = new Marked({
    renderer: {
      link({ href, title, tokens }) {
        // Links inside the site (#anchor, /path) keep the built-in output.
        if (!/^https?:\/\//i.test(href)) return false;
        const tip = title ? ` title="${esc(title)}"` : '';
        return `<a class="external" href="${esc(href)}"${tip} target="_blank" rel="noopener noreferrer">${this.parser.parseInline(tokens)}<span class="arrow"> ↗</span></a>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : PAGE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'link override', render: (md) => render(external, md) },
    ],
    caption:
      'Links to other sites get a ↗, target="_blank" and rel="noopener noreferrer" (see the HTML below; DOMPurify drops target on the page). The # and / links are untouched.',
  });

  return () => stage.dispose();
};

export default mount;
