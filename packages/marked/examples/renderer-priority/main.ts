// Two use() calls override one renderer: last wins, false falls through
import { Marked, type MarkedExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo, type Side } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const OUTLINE = `# Weekend plan
## Saturday
## Sunday
### Evening`;

const CARD = `# Weekend plan
## Saturday
## Sunday`;

// First setup: every heading gets a pin.
const pinned: MarkedExtension = {
  renderer: {
    heading({ tokens, depth }) {
      return `<h${depth}>📌 ${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
  },
};

// Second setup, added later: only the top heading, as a banner. It returns false for the rest.
const bannerFalls: MarkedExtension = {
  renderer: {
    heading({ tokens, depth }) {
      if (depth > 1) return false;
      return `<h1 class="banner">${this.parser.parseInline(tokens)}</h1>\n`;
    },
  },
};

// Same, but it returns nothing for the rest: no fallback happens, so those headings vanish.
const bannerForgets: MarkedExtension = {
  renderer: {
    heading({ tokens, depth }) {
      if (depth === 1) return `<h1 class="banner">${this.parser.parseInline(tokens)}</h1>\n`;
      // Falling off the end returns undefined. The types ask for string | false, hence the cast.
      return undefined as never;
    },
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the headings; the three setups differ only in the second use()' });

  // Each instance stacks its setups in the order given, like successive use() calls.
  const one = new Marked(pinned);
  const falls = new Marked(pinned, bannerFalls);
  const forgets = new Marked(pinned, bannerForgets);

  const sides: Side[] = [
    ...(stage.preview ? [] : [{ label: 'first only: all pinned', render: (md: string) => render(one, md) }]),
    { label: stage.preview ? '2nd returns false' : 'second returns false for h2+', render: (md) => render(falls, md) },
    { label: stage.preview ? '2nd returns nothing' : 'second returns nothing for h2+', render: (md) => render(forgets, md) },
  ];

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : OUTLINE }],
    sides,
    caption:
      'The later heading override wins for the top heading. Where it returns false, the earlier one (the pin) takes over; where it returns nothing, nothing is rendered and the headings disappear.',
  });

  return () => stage.dispose();
};

export default mount;
