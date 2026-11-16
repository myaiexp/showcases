// Basics: top, left, right and bottom keep fixed gaps around an auto-layout Leafer
import { Leafer, Rect, ResizeEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, label, sizer, tween } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The canvas keeps a fixed gap on every side.' });
  const u = sizer(stage);
  const show = label(stage, '', true);
  const box = stage.view; // the engine fits this div: no width or height given

  const leafer = stage.own(
    new Leafer({
      view: box,
      top: stage.preview ? 14 : 50, // fixed gaps around the canvas
      left: stage.preview ? 36 : 100,
      right: stage.preview ? 36 : 100,
      bottom: stage.preview ? 10 : 30,
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
