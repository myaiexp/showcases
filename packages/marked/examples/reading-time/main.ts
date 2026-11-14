// walkTokens counts the words in every text token and prints a "N sec read" badge
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const POST = `# Our new opening hours

From next week the café opens at **7:30** instead of 9:00, so commuters can grab a coffee and a fresh roll on their way to work.

We stay open until 18:00 on weekdays. On Saturdays the kitchen closes at 15:00, but the bar keeps serving until the last guest leaves.

- Mon-Fri: 7:30-18:00
- Sat: 9:00-22:00
- Sun: closed`;

const CARD = `# New hours

We open at **7:30**
from next week.

- Mon-Fri: 7:30
- Sat: 9:00`;

const WORDS_PER_SECOND = 3.3; // about 200 words a minute

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add sentences and the badge counts up' });

  let words = 0;
  const m = new Marked({
    walkTokens(token) {
      // Leaf text tokens only: a block-level "text" token also holds the same words as its children.
      if (token.type === 'text' && !('tokens' in token && token.tokens)) {
        words += token.text.trim().split(/\s+/).filter(Boolean).length;
      }
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : POST }],
    output: 'Page + badge',
    caption:
      'The badge is computed from the same tokens that were being turned into HTML. Words inside bold, links and list items count too, because walkTokens visits every nested token.',
    render(md) {
      words = 0;
      const html = m.parse(md, { async: false });
      const secs = Math.max(1, Math.round(words / WORDS_PER_SECOND));
      const label = secs >= 90 ? `${Math.round(secs / 60)} min read` : `${secs} sec read`;
      return `<p><mark>${words} word${words === 1 ? '' : 's'} · ${label}</mark></p>${html}`;
    },
  });

  return () => stage.dispose();
};

export default mount;
