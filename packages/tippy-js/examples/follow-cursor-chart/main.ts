// A temperature chart whose tooltip slides along with the cursor, reading each day
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { DAYS, drawChart } from './chart.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Move the mouse across the chart.' });
  const chart = drawChart(stage.root);

  const readout = (clientX: number): string => {
    const r = chart.getBoundingClientRect();
    const i = Math.round(((clientX - r.left) / r.width) * (DAYS.length - 1));
    const day = DAYS[Math.max(0, Math.min(DAYS.length - 1, i))]!;
    return `${day.label}: ${day.temp} °C`;
  };

  const tip = stage.own(
    tippy(chart, {
      content: 'Mon',
      // 'horizontal': the tip tracks the cursor left and right, but stays on the chart's top edge.
      followCursor: stage.preview ? false : 'horizontal',
      plugins: [followCursor],
      // Popper moves the tip; this transition smooths the jumps between mouse events.
      moveTransition: 'transform 0.08s ease-out',
      placement: 'top',
      offset: [0, 4],
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    chart.addEventListener('mousemove', (e) => tip.setContent(readout(e.clientX)));
  } else {
    // Card: the real mouse would drag the tip around the whole page, so the drawn pointer
    // stands in for it: the tip is placed at the pointer, which is what followCursor does.
    tip.setProps({
      getReferenceClientRect: () => {
        const c = chart.getBoundingClientRect();
        const p = stage.ghost.clientRect();
        return new DOMRect(p.x, c.top, 0, c.height);
      },
    });
    stage.ghost.track(() => {
      tip.setContent(readout(stage.ghost.clientRect().x));
      void tip.popperInstance?.update();
    });
    stage.play(async (wait) => {
      const box = stage.root.getBoundingClientRect();
      const c = chart.getBoundingClientRect();
      const y = c.top - box.top + c.height * 0.6;
      await stage.ghost.moveTo({ x: c.left - box.left + 8, y }, 600);
      tip.show();
      await stage.ghost.moveTo({ x: c.right - box.left - 8, y }, 3200);
      await wait(500);
      tip.hide();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
