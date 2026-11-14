// silent: true turns a parse error into an HTML message, not a throw
import { Marked, type MarkedExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

// A tiny extension for {{weather}} placeholders whose data source is "down".
const weatherWidget: MarkedExtension = {
  extensions: [
    {
      name: 'widget',
      level: 'inline',
      start: (src) => src.indexOf('{{'),
      tokenizer(src) {
        const m = /^\{\{(\w+)\}\}/.exec(src);
        if (m) return { type: 'widget', raw: m[0], name: m[1] };
      },
      renderer(token) {
        throw new Error(`The ${String(token.name)} service is down`);
      },
    },
  ],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Delete the {{weather}} widget and the error disappears' });

  const loud = new Marked({ silent: false }, weatherWidget);
  const quiet = new Marked({ silent: true }, weatherWidget);

  compareDemo(stage, {
    samples: [{ text: 'Today: {{weather}}\n\nPack a coat.' }],
    sides: [
      // This one throws; compareDemo catches it and paints the message red.
      { label: 'silent: false', render: (md) => loud.parse(md, { async: false }) },
      { label: 'silent: true', render: (md) => quiet.parse(md, { async: false }) },
    ],
    caption:
      'The widget fails while the page is built. silent: false lets the error escape (red, nothing rendered); silent: true returns "An error occurred" as HTML so something still shows.',
  });

  return () => stage.dispose();
};

export default mount;
