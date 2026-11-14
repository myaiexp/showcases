// parseInline() turns each short line into inline HTML, with no <p> around it
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const TASKS = `Call **Sam** about the \`invoice\`
Buy _oat_ milk
~~Book dentist~~ done
Email [Priya](#mail) the plan`;

const SHOPPING = `**Milk** (2 litres)
_Fresh_ bread
\`Eggs\` x12
Jam from [the market](#shop)`;

const BOX = 'display:inline-block;width:0.9em;height:0.9em;border:1px solid currentColor;border-radius:3px;margin-right:0.5em;vertical-align:-0.1em';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One title per line. Each line goes through marked.parseInline()' });
  const marked = new Marked();

  liveDemo(stage, {
    samples: [
      { label: 'To-do titles', text: TASKS },
      { label: 'Shopping items', text: SHOPPING },
    ],
    output: 'Each line as a title',
    render(md) {
      const lines = md.split('\n').filter((l) => l.trim());
      // parseInline never wraps in <p>, so each result can sit inside a row next to a box.
      return lines
        .map((l) => `<div style="margin:4px 0"><span style="${BOX}"></span>${marked.parseInline(l, { async: false })}</div>`)
        .join('');
    },
    caption:
      'Every line is one short title. parseInline() keeps the bold, italics, code and links but adds no paragraph, so each title stays on its row beside its box.',
  });

  return () => stage.dispose();
};

export default mount;
