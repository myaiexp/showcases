// A postprocess hook wraps the finished HTML in a header and footer
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const UPDATE = `## Kitchen rota

- Mon: Sam cooks
- Tue: Priya cooks
- Wed: **takeaway**

Remember to *rinse* the pans.`;

const CARD = `## Rota
- Mon: Sam
- Tue: **Priya**`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove lines: the footer counts them' });

  const m = new Marked({
    hooks: {
      // Gets the HTML string Marked made and may return any other string.
      postprocess(html) {
        const items = (html.match(/<li>/g) ?? []).length;
        const words = html
          .replace(/<[^>]+>/g, ' ')
          .split(/\s+/)
          .filter(Boolean).length;
        const header = '<p><small>📌 <strong>House update</strong>, pinned on the fridge</small></p><hr>';
        const footer = `<hr><p><small>${words} words, ${items} list item${items === 1 ? '' : 's'}. Made with Marked.</small></p>`;
        return header + html + footer;
      },
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : UPDATE }],
    render: (md) => render(m, md),
    caption: 'Marked only wrote the middle part. The pinned header and the word count footer were added by postprocess, to every page the same way.',
  });
  return () => stage.dispose();
};

export default mount;
