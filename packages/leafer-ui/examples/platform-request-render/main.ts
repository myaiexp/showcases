// Platform.requestRender: a hand-made animation loop on the engine's frame clock
import { Ellipse, Leafer, Platform, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The loop re-requests itself each frame. Stop and start it with the button.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const cx = stage.width / 2;
  const cy = stage.height / 2;
  const r = Math.min(cx, cy) * 0.6;
  leafer.add(new Ellipse({ x: cx - r, y: cy - r, width: r * 2, height: r * 2, stroke: 'rgba(0,0,0,0.15)', strokeWidth: 2 }));
  const dot = new Rect({ width: 24, height: 24, around: 'center', cornerRadius: 6, fill: GREEN });
  leafer.add(dot);
  const say = label(stage, '', true);

  let frames = 0;
  let running = true;
  let t0 = performance.now();
  const animate = (): void => {
    if (!running || stage.disposed) return;
    const t = (performance.now() - t0) / 1000;
    dot.set({ x: cx + Math.cos(t * 2) * r, y: cy + Math.sin(t * 2) * r, rotation: t * 90 });
    say(`frames ${++frames}`);
    Platform.requestRender!(animate); // ask for the next frame
  };
  animate();
  stage.onDispose(() => (running = false));
  if (stage.bar) {
    const b = button(stage.bar, 'stop', () => {
      running = !running;
      b.textContent = running ? 'stop' : 'start';
      if (running) {
        t0 = performance.now();
        animate();
      }
    });
  }
  return stage.dispose;
};

export default mount;
