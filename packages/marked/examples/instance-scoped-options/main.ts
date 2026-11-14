// Each new Marked() keeps its own options; the global marked is untouched
import { Marked, marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the note: three renderers read it' });

  // Instance 1: line breaks kept, bold drawn with a highlighter.
  const shopping = new Marked({
    breaks: true,
    renderer: {
      strong({ tokens }) {
        return `<mark>${this.parser.parseInline(tokens)}</mark>`;
      },
    },
  });
  // Instance 2: italics drawn underlined. Nothing from instance 1 leaks in.
  const notes = new Marked({
    renderer: {
      em({ tokens }) {
        return `<u>${this.parser.parseInline(tokens)}</u>`;
      },
    },
  });

  compareDemo(stage, {
    samples: [
      { label: 'Shopping', text: 'Milk\n**Eggs**\n_Bread_' },
      { label: 'Reminder', text: 'Call **Gran**\nSunday _lunch_' },
    ],
    sides: [
      { label: 'instance A', render: (md) => shopping.parse(md, { async: false }) },
      { label: 'instance B', render: (md) => notes.parse(md, { async: false }) },
      // The imported `marked` is the shared global instance: no use() was ever called on it.
      { label: 'global marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption:
      'Same text, three results. A highlights bold and keeps line breaks, B underlines italics, and the global marked (which every other example shares) stays plain.',
  });

  return () => stage.dispose();
};

export default mount;
