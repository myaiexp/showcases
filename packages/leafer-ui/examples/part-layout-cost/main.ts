// Advanced: comparing layout cost with partial layout on and off
import { Leafer, Rect, LayoutEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle usePartLayout and read the average layout time.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      usePartLayout: true, // the default
      fill: '#333',
    }),
  );
  const list: Rect[] = [];
  const count = stage.preview ? 300 : 1500;
  for (let i = 0; i < count; i++) {
    const rect = new Rect({ x: (i % 50) * u(12) + u(10), y: Math.floor(i / 50) * u(12) + u(10), width: u(8), height: u(8), fill: `hsl(${(i * 7) % 360}, 70%, 55%)` });
    list.push(rect);
    leafer.add(rect);
  }
  const say = label(stage, '', true);
  let usePart = true;
  let began = 0;
  const times: number[] = [];
  leafer.on(LayoutEvent.BEFORE, () => (began = performance.now()));
  leafer.on(LayoutEvent.AFTER, () => {
    times.push(performance.now() - began);
    if (times.length > 40) times.shift();
  });

  stage.loop((_dt, t) => {
    list.forEach((r, i) => (r.rotation = Math.sin(t * 2 + i) * 20)); // everything is dynamic
    if (times.length) say(`usePartLayout: ${usePart}   layout ${(times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)} ms`);
  });
  const setPart = (on: boolean): void => {
    usePart = on;
    leafer.config.usePartLayout = on; // takes effect while running
    times.length = 0;
  };

  if (stage.preview) {
    let on = true;
    stage.every(3000, () => setPart((on = !on)));
  } else checkbox(stage.bar!, 'usePartLayout', true, setPart);

  return stage.dispose;
};

export default mount;
