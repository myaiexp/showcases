// pedantic: true follows the original markdown.pl rules
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try the three samples, then your own' });

  const modern = new Marked({ pedantic: false });
  const original = new Marked({ pedantic: true });

  compareDemo(stage, {
    samples: [
      { label: 'Heading without a space', text: '#Packing list\nPassport' },
      { label: 'Mixed bullets', text: '* Tent\n+ Stove\n- Lamp' },
      { label: 'Fenced block', text: 'Run this:\n```\nnpm start\n```\nthen wait' },
    ],
    sides: [
      { label: 'pedantic: false', render: (md) => modern.parse(md, { async: false }) },
      { label: 'pedantic: true', render: (md) => original.parse(md, { async: false }) },
    ],
    caption:
      'Pedantic mode keeps the original 2004 quirks: #Heading needs no space, the three bullet characters make one list, and ``` fences are not recognised (the text between becomes inline code).',
  });

  return () => stage.dispose();
};

export default mount;
