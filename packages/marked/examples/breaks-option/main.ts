// breaks: true turns every single line break into a real one, as in chat messages
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

const SHOPPING = `Milk
Eggs
Bread
Jam`;

const ADDRESS = `Ada Lovelace
12 St James's Sq
London`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type lines without a blank line between them' });

  // Two instances, so neither setting leaks into the other (or into other examples).
  const standard = new Marked();
  const chatty = new Marked({ breaks: true });

  compareDemo(stage, {
    samples: [
      { label: 'Shopping list', text: SHOPPING },
      { label: 'Address', text: ADDRESS },
    ],
    sides: [
      { label: 'breaks: false', render: (md) => standard.parse(md, { async: false }) },
      { label: 'breaks: true', render: (md) => chatty.parse(md, { async: false }) },
    ],
    caption:
      'By default a single newline is just a space, so the lines run together. breaks: true adds a <br> at each one, like GitHub comments.',
  });

  return () => stage.dispose();
};

export default mount;
