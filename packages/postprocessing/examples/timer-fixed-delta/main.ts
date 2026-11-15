// Timer.useFixedDelta: every update() reports the same step instead of the measured one
import { Timer } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { chartPanel, drawLabel } from '../../shared/utilities.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const panel = chartPanel(el, ctx);
  const real = new Timer();
  const fixed = new Timer();
  fixed.useFixedDelta = true;
  fixed.fixedDelta = 1 / 30;
  let running = true;
  if (panel.bar) checkbox(panel.bar, 'running', true, (v) => (running = v));

  const paint = (): void => {
    const { ctx: g, width, height } = panel;
    g.fillStyle = '#10131a';
    g.fillRect(0, 0, width, height);
    const rows: [string, Timer, string][] = [
      ['measured timer', real, '#52d68a'],
      ['useFixedDelta = true, fixedDelta = 1/30', fixed, '#ffc93f'],
    ];
    rows.forEach(([name, timer, color], i) => {
      const y = 36 + i * 74;
      drawLabel(panel, name, 16, y, color);
      drawLabel(panel, `getDelta()   ${(timer.getDelta() * 1000).toFixed(4)} ms`, 16, y + 20);
      drawLabel(panel, `getElapsed() ${timer.getElapsed().toFixed(4)} s`, 16, y + 38);
    });
    drawLabel(panel, `the fixed step was set to ${(fixed.fixedDelta * 1000).toFixed(2)} ms; in 6.39.6 update() reuses it unconverted,`, 16, height - 28, '#9aa3b5');
    drawLabel(panel, 'so the reported delta is 1000 times too small (see the milliseconds above)', 16, height - 12, '#9aa3b5');
  };
  panel.draw(paint);
  panel.run(() => {
    if (running) {
      real.update();
      fixed.update();
    }
    paint();
  });
  return () => {
    real.dispose();
    fixed.dispose();
    panel.dispose();
  };
};

export default mount;
