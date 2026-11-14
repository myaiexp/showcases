// Three use({ walkTokens }) calls run in reverse order; a log shows it
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { checkbox } from '../../shared/controls.ts';
import { note, row, textPane } from '../../shared/panes.ts';

const SAMPLE = `# Packing list

Pack the tent.

## Food
Bring tea and rice.`;

const CARD = `# Packing
Bring the tent.
## Food
Bring tea.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three walkers each add their letter to every heading' });

  const log = textPane(stage, 'Calls per token, in order');
  let order: string[] = [];
  let reversed = false;
  const calls: { token: Token; who: string }[] = [];

  const walker = (who: string) => ({
    walkTokens(token: Token) {
      calls.push({ token, who });
      if (token.type === 'heading') token.tokens?.push({ type: 'text', raw: '', text: ` ${who}`, escaped: false });
    },
  });

  const show = (): void => {
    const lines: string[] = [];
    let last: Token | null = null;
    for (const { token, who } of calls) {
      if (token.type === 'space' || token.type === 'text') continue; // text children would only add noise
      if (token !== last) lines.push(`${String(lines.length + 1).padStart(2)}. ${token.type.padEnd(10)}${who}`);
      else lines[lines.length - 1] += ` -> ${who}`;
      last = token;
    }
    log.show(`use() order: ${order.join(', ')}\n\n${lines.join('\n')}`);
  };

  const demo = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    output: 'Headings get A, B, C',
    html: false,
    render(md) {
      calls.length = 0;
      order = reversed ? ['C', 'B', 'A'] : ['A', 'B', 'C'];
      const m = new Marked();
      for (const who of order) m.use(walker(who));
      const html = m.parse(md, { async: false });
      show();
      return html;
    },
  });
  if (!stage.preview) {
    row(stage.root, log.el);
    note(stage.root, 'Registered first runs last: use(A), use(B), use(C) calls C, then B, then A, so the heading ends up reading "... C B A". Tick the box to register them the other way round.');
    if (stage.bar) {
      checkbox(stage.bar, 'register C, B, A instead', false, (v) => {
        reversed = v;
        demo.refresh();
      });
    }
  }

  return () => stage.dispose();
};

export default mount;
