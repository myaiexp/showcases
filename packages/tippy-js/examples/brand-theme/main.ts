// A custom "tomato" theme applied to a brand's call-to-action buttons
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CTAS = [
  { label: 'Start trial', tip: 'Free for 14 days, no card', placement: 'top' },
  { label: 'Book demo', tip: 'A 20-minute call with us', placement: 'top' },
  { label: 'Pricing', tip: 'Plans from $9 a month', placement: 'bottom' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the three buttons.' });

  const brand = document.createElement('div');
  brand.className = 'brand';
  brand.textContent = '🍅 Tomato & Co.';
  const row = document.createElement('div');
  row.className = 'row';
  const buttons = CTAS.map((cta) => {
    const b = document.createElement('button');
    b.className = 'cta';
    b.textContent = cta.label;
    row.append(b);
    return b;
  });
  stage.root.append(brand, row);

  // theme: 'tomato' only names the look; the colours live in style.css
  // under .tippy-box[data-theme~='tomato'].
  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: CTAS[i]!.tip,
        placement: CTAS[i]!.placement,
        theme: 'tomato',
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 600);
        await wait(1200);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
