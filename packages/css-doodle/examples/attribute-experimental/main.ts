// experimental lifts the 64-per-axis grid limit
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(
    `
    @grid: 100 / 100%;
    background: hsl(@R(0, 360, 2), 70%, 60%);
    :doodle {
      animation: hue 6s linear infinite;
      @keyframes hue {
        to { filter: hue-rotate(360deg); }
      }
    }
  `,
    { attrs: { experimental: '' } },
  );
  if (stage.bar) {
    const show = readout(stage.bar);
    const report = (): void => show(`grid in use: ${doodle.grid.x} x ${doodle.grid.y}, ${doodle.grid.count} cells`);
    checkbox(stage.bar, 'experimental', true, (on) => {
      if (on) doodle.setAttribute('experimental', '');
      else doodle.removeAttribute('experimental');
      doodle.update();
    });
    doodle.addEventListener('render', report);
    report();
  }
  stage.say('Ten thousand cells, each its own element');
  return () => stage.dispose();
};

export default mount;
