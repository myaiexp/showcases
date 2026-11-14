// A processAllTokens hook sees the whole token list and can cut it
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { checkbox } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const NEWSLETTER = `# Garden club news

Seeds are in. Bring a pot.

---

## Members only

The shed code is changing to 4411.

Next meeting: bring your own chair.`;

const CARD = `# Club news

Seeds are in.

---

Shed code: 4411`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the preview on and off' });
  let preview = true;

  const m = new Marked({
    hooks: {
      // Runs once on the full token list, before walkTokens. walkTokens only sees one token at a time.
      processAllTokens(tokens) {
        if (!preview) return tokens;
        const cut = tokens.findIndex((t) => t.type === 'hr');
        if (cut < 0) return tokens;
        const kept: Token[] = tokens.slice(0, cut);
        kept.push({ type: 'paragraph', raw: '*Read more...*', text: '*Read more...*', tokens: [{ type: 'em', raw: '*Read more...*', text: 'Read more...', tokens: [{ type: 'text', raw: 'Read more...', text: 'Read more...' }] }] });
        return Object.assign(kept, { links: (tokens as { links?: object }).links ?? {} }) as typeof tokens;
      },
    },
  });

  const demo = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NEWSLETTER }],
    render: (md) => render(m, md),
    caption: 'In preview mode the hook drops every token after the first rule and adds a "Read more..." line, a cut no single walkTokens call could make.',
  });

  if (stage.bar) {
    checkbox(stage.bar, 'Preview only', true, (v) => {
      preview = v;
      demo.refresh();
    });
  } else {
    stage.every(2600, () => {
      preview = !preview;
      demo.refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;
