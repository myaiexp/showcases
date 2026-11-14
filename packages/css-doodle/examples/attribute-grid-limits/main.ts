// The grid attribute is clamped to 64 per axis; type a value and read the result
import type { Mount } from '@/types.ts';
import { readout, textInput } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rerollAll } from '../../shared/a-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try 1x35, 100, 1x4000 or 64x64; larger values are clamped.' });
  const doodle = stage.doodle(
    `
    :doodle {
      @size: 100%;
    }
    @gap: 1px;
    background: #e6437d;
    transition: width .2s ease @r(.5s);
    width: @r(5%, 100%);
  `,
    { attrs: { grid: '1x35' } },
  );
  rerollAll(stage, [doodle]);
  if (stage.bar) {
    const show = readout(stage.bar);
    const report = (): void => {
      const g = doodle.grid;
      show(`grid in use: ${g.x} x ${g.y}, ${g.count} cells`);
    };
    textInput(stage.bar, 'grid=', '1x35', (v) => {
      doodle.setAttribute('grid', v);
    });
    doodle.addEventListener('render', report);
    report();
  } else stage.say('grid="1x35": one column of thirty-five cells');
  return () => stage.dispose();
};

export default mount;
