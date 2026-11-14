// A depth gauge whose tooltip rides up and down its right edge with the cursor
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const MAX_DEPTH = 4000;

function reading(depth: number): string {
  const zone = depth < 200 ? 'Sunlight zone' : depth < 1000 ? 'Twilight zone' : 'Midnight zone';
  return `${Math.round(depth / 10) * 10} m\n${zone}`;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 340, hint: 'Slide the mouse up and down the gauge.' });

  stage.root.classList.toggle('mini', stage.preview);
  const gauge = document.createElement('div');
  gauge.className = 'gauge';
  for (const label of ['0 m', '1000 m', '2000 m', '3000 m', '4000 m']) {
    const mark = document.createElement('span');
    mark.className = 'mark';
    mark.textContent = label;
    gauge.append(mark);
  }
  stage.root.append(gauge);

  const depthAt = (clientY: number): number => {
    const r = gauge.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientY - r.top) / r.height)) * MAX_DEPTH;
  };

  const tip = stage.own(
    tippy(gauge, {
      content: reading(0),
      // Only the up-and-down movement is followed: sideways the tip stays on the gauge's edge.
      followCursor: stage.preview ? false : 'vertical',
      plugins: [followCursor],
      placement: 'right',
      offset: [0, 10],
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    gauge.addEventListener('mousemove', (e) => tip.setContent(reading(depthAt(e.clientY))));
  } else {
    // Card: stand-in for the mouse. The reference is the gauge's width at the pointer's height.
    tip.setProps({
      getReferenceClientRect: () => {
        const g = gauge.getBoundingClientRect();
        return new DOMRect(g.left, stage.ghost.clientRect().y, g.width, 0);
      },
    });
    stage.ghost.track(() => {
      tip.setContent(reading(depthAt(stage.ghost.clientRect().y)));
      void tip.popperInstance?.update();
    });
    stage.play(async (wait) => {
      const box = stage.root.getBoundingClientRect();
      const g = gauge.getBoundingClientRect();
      const x = g.left - box.left + g.width / 2;
      const y = (f: number): { x: number; y: number } => ({ x, y: g.top - box.top + g.height * f });
      await stage.ghost.moveTo(y(0.05), 500);
      tip.show();
      for (const f of [0.35, 0.15, 0.7, 0.95, 0.5]) {
        await stage.ghost.moveTo(y(f), 800);
        await wait(200);
      }
      tip.hide();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
