// renderer.tablecell shades numeric cells from amber to red by value
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const BUSY = `How full is the café (%)?

| Day | Morning | Noon | Evening |
| --- | ---: | ---: | ---: |
| Mon | 20 | 55 | 35 |
| Tue | 25 | 60 | 30 |
| Wed | 30 | 85 | 45 |
| Thu | 35 | 90 | 70 |
| Fri | 40 | 95 | 100 |`;

const CARD = `| Day | AM | PM |
| --- | ---: | ---: |
| Mon | 20 | 55 |
| Wed | 30 | 85 |
| Fri | 40 | 100 |`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a number (0 to 100) and watch its colour' });

  const heat = new Marked({
    renderer: {
      tablecell(token) {
        const value = Number(token.text.trim());
        // Headers and words (Mon, Tue...) keep the built-in cell.
        if (token.header || token.text.trim() === '' || Number.isNaN(value)) return false;
        const v = Math.max(0, Math.min(100, value));
        const hue = 55 - v * 0.55; // 55 = amber, 0 = red
        const align = token.align ? ` align="${token.align}"` : '';
        return `<td${align} style="background:hsl(${hue} 70% 50% / ${0.2 + v / 150})">${this.parser.parseInline(token.tokens)}</td>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : BUSY }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'tablecell override', render: (md) => render(heat, md) },
    ],
    caption: 'Each number cell is tinted from amber to red by its value, so the busy times stand out without reading the digits.',
  });

  return () => stage.dispose();
};

export default mount;
