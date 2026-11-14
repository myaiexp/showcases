// renderer.html prints raw HTML as visible text, as a comment box would
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const COMMENT = `Great recipe! I used <b>less</b> sugar.

<div style="color:red">BUY NOW</div>

<script>steal()</script>`;

const CARD = `Nice! <b>Loved</b> it

<div>BUY NOW</div>`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type some HTML into the comment' });

  const asText = new Marked({
    renderer: {
      // Both inline tags (<b>) and whole blocks (<div>...) arrive here.
      html({ text, block }) {
        const shown = `<code class="raw">${esc(text.trim())}</code>`;
        return block ? `<p>${shown}</p>\n` : shown;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : COMMENT }],
    sides: [
      { label: 'default: HTML runs', render: (md) => render(plain, md) },
      { label: 'html override: text', render: (md) => render(asText, md) },
    ],
    caption:
      'By default Marked passes HTML through, so the bold and the red text really happen. With an html renderer that escapes it, commenters see their tags as plain text.',
  });

  return () => stage.dispose();
};

export default mount;
