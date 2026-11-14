// renderer.hr swaps the plain line for a decorated divider
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const STORY = `Day 1: we reached the coast.

---

Day 2: rain all morning.

***

Day 3: back home.`;

const CARD = `Day 1: arrived

---

Day 2: rain

---

Day 3: home`;

const ORNAMENTS = { stars: '✦ ✦ ✦', 'cut here': '✂ - - - - - - -', wave: '～～～～～' } as const;
type Ornament = keyof typeof ORNAMENTS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type --- on its own line to start a new section' });
  let style: Ornament = 'stars';

  const fancy = new Marked({
    renderer: {
      hr() {
        return `<div class="divider" role="separator">${ORNAMENTS[style]}</div>\n`;
      },
    },
  });
  const plain = new Marked();

  const demo = compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : STORY }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'hr override', render: (md) => render(fancy, md) },
    ],
    caption: 'Three dashes (or three stars) on a line mean a break between sections. The renderer decides how that break looks.',
  });
  if (stage.bar) {
    select(stage.bar, 'Divider', Object.keys(ORNAMENTS) as Ornament[], (v) => {
      style = v;
      demo.refresh();
    });
  }

  return () => stage.dispose();
};

export default mount;
