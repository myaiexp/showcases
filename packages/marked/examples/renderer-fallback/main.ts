// Returning false from a renderer hands the token back to the built-in one
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const CONTACT = `Contact the bakery:

- Call [our shop](tel:+358401234567)
- Write to [the owner](mailto:hello@bakery.example)
- Read [today's menu](https://example.com/menu)
- Jump to the [opening hours](#hours)`;

const CARD = `Call [the shop](tel:+3584)
Mail [the owner](mailto:a@b.c)
See [the menu](https://x.y)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try [text](tel:123) or [text](mailto:you@example.com)' });

  // Only phone and e-mail links are customised; everything else returns false.
  const contact = new Marked({
    renderer: {
      link({ href, tokens }) {
        const icon = href.startsWith('tel:') ? '📞' : href.startsWith('mailto:') ? '✉️' : '';
        if (!icon) return false;
        return `<a class="contact" href="${esc(href)}"><span class="icon">${icon}</span>${this.parser.parseInline(tokens)}</a>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : CONTACT }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'returns false for the rest', render: (md) => render(contact, md) },
    ],
    caption:
      'Phone and e-mail links get an icon chip. The web and in-page links are handled by the override too, but it returns false, so Marked renders them with the built-in link renderer.',
  });

  return () => stage.dispose();
};

export default mount;
