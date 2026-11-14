// walkTokens prefixes each heading with its outline number: 1, 1.1, 1.2, 2
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const RULES = `# House rules

## Kitchen
### Dishes
Wash up the same day.
### Bins
Out on Thursday.

## Quiet hours
### Weeknights
After 22:00.

# Guests
## Overnight
Tell the others.`;

const CARD = `# Rules
## Kitchen
### Dishes
### Bins
## Quiet
# Guests
## Overnight`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or move headings: the numbers follow the outline' });

  const m = new Marked();
  let counters: number[] = [];
  m.use({
    walkTokens(token) {
      if (token.type !== 'heading') return;
      // counters[0] counts h1s, counters[1] the h2s since the last h1, and so on.
      counters = counters.slice(0, token.depth);
      while (counters.length < token.depth) counters.push(0);
      counters[token.depth - 1]!++;
      const number = counters.join('.');
      token.tokens?.unshift({ type: 'text', raw: '', text: `${number} `, escaped: false });
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : RULES }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      {
        label: 'walkTokens numbering',
        render: (md) => {
          counters = [];
          return render(m, md);
        },
      },
    ],
    caption:
      'Walking the tokens in document order is what makes the counting work: each heading bumps its own level and resets the levels below, so "Guests" starts again at 2 and its section at 2.1.',
  });

  return () => stage.dispose();
};

export default mount;
