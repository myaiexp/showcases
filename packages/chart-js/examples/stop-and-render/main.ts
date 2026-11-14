// Freeze an animation with stop(), resume with render(), wipe with clear()
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, MONTHS, alpha, numbers, seeded } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'press replay');
  const rand = seeded(44);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [{ label: 'Rides', data: numbers(12, 30, 100, rand), backgroundColor: alpha(C.cyan, 0.65), borderRadius: 2 }],
    },
    // A slow animation, so there is something to stop halfway.
    options: { maintainAspectRatio: false, animation: { duration: 3200 }, scales: { y: { min: 0, max: 110 } }, plugins: { legend: { display: false } } },
  });

  const say = (text: string): void => {
    note.textContent = text;
  };
  // api.md: reset() + update() replays the first animation; stop() pauses the frame loop;
  // render() starts it again; clear() blanks the canvas (the next frame draws it back).
  const replay = (): void => {
    chart.reset();
    chart.update();
    say('reset() + update(): animating…');
  };
  const stopIt = (): void => {
    chart.stop();
    say('stop(): frozen mid-animation');
  };
  const renderIt = (): void => {
    chart.render();
    say('render(): the animation carries on');
  };
  const clearIt = (): void => {
    chart.clear();
    say('clear(): canvas wiped');
  };

  if (bar) {
    button(bar, 'Replay', replay);
    button(bar, 'stop()', stopIt);
    button(bar, 'render()', renderIt);
    button(bar, 'clear()', clearIt);
  }
  replay();
  const steps = [stopIt, renderIt, clearIt, replay];
  const stop = ctx.preview ? cycle(steps, 1100, (s) => s()) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
