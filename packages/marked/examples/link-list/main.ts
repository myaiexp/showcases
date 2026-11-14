// walkTokens numbers every link and lists where they go at the end
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc } from '../../shared/renderer-kit.ts';

const NEWS = `# Neighbourhood news

The [library](https://library.example) is open late on Fridays.
Join the [garden club](https://garden.example/join) or read the
[library](https://library.example) newsletter.

Questions? [Write to us](mailto:news@example.com).`;

const CARD = `The [library](https://l.fi)
is open late. Join the
[garden club](https://g.fi)
or ask the [library](https://l.fi).`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add a link; the same address keeps one number' });

  let refs: string[] = [];
  const m = new Marked({
    walkTokens(token) {
      if (token.type !== 'link') return;
      let n = refs.indexOf(token.href) + 1;
      if (!n) n = refs.push(token.href);
      // Add a small [n] marker as an extra child token of the link.
      token.tokens?.push({ type: 'html', raw: '', text: `<sup>[${n}]</sup>`, block: false, pre: false });
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NEWS }],
    output: 'Page + references',
    caption:
      'Each link gets a number and the addresses are gathered in a list at the bottom, like a printed page where nobody can click. The two library links share number 1.',
    render(md) {
      refs = [];
      const html = m.parse(md, { async: false });
      const items = refs.map((r) => `<li>${esc(r)}</li>`).join('');
      return `${html}<h4>Links</h4><ol>${items}</ol>`;
    },
  });

  return () => stage.dispose();
};

export default mount;
