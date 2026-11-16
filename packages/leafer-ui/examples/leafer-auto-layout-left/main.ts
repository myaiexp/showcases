// Basics: left: 100 keeps a fixed gap on one side of an auto-layout Leafer
import { Leafer, Rect, ResizeEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, label, sizer, tween } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The canvas is inset 100 px from the left of its div; the paper shows through.' });
  const u = sizer(stage);
  const show = label(stage, '', true);
  const box = stage.view; // the engine fits this div: no width or height given

  const leafer = stage.own(
    new Leafer({
      view: box,
      left: stage.preview ? 50 : 100, // same as { top: 0, right: 0, bottom: 0, left: 100 }
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(100), u(60), u(100), u(100)));
  const report = (): void => show(`canvas ${Math.round(leafer.width ?? 0)} × ${Math.round(leafer.height ?? 0)}`);
  leafer.on(ResizeEvent.RESIZE, report);
  report();

  // Shrink and restore the pane: the canvas follows its size (and keeps its padding).
  const full = { w: stage.width, h: stage.height };
  script(stage, async () => {
    await stage.wait(900);
    await tween(stage, 900, (k) => resize(full.w * (1 - 0.35 * k), full.h * (1 - 0.3 * k)));
    await stage.wait(900);
    await tween(stage, 900, (k) => resize(full.w * (0.65 + 0.35 * k), full.h * (0.7 + 0.3 * k)));
  });
  function resize(w: number, h: number): void {
    box.style.width = `${w}px`;
    box.style.height = `${h}px`;
    report();
  }

  return stage.dispose;
};

export default mount;
