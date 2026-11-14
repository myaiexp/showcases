// this.block tells a hook whether it runs for parse() or for parseInline()
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

const SAMPLES = [
  { label: 'Title', text: '# Weekend plan\n\nSee *Anna* at **noon**' },
  { label: 'Short line', text: 'Lunch with *Anna* at **noon**' },
];

const CARD = [{ text: '# Plan\n\nSee *Anna*\nat **noon**' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both sides run the same hook on the same text' });

  const m = new Marked({
    hooks: {
      // The hook is the same for both calls. this.block is true for parse() and false for parseInline().
      postprocess(html) {
        return `<code>this.block = ${String(this.block)}</code>\n${html}`;
      },
    },
  });

  compareDemo(stage, {
    samples: stage.preview ? CARD : SAMPLES,
    sides: [
      { label: 'm.parse()', render: (md) => m.parse(md, { async: false }) },
      { label: 'm.parseInline()', render: (md) => m.parseInline(md, { async: false }) },
    ],
    caption:
      'parse() treats the text as whole blocks (headings, paragraphs); parseInline() reads only bold, italic and links, so a # stays a #. The hook can tell the two apart through this.block.',
  });
  return () => stage.dispose();
};

export default mount;
