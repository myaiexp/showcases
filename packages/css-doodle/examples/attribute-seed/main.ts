// A doodle with a seed attribute stays put; one without redraws on every update
import type { Mount } from '@/types.ts';
import { button, readout, textInput } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
  @grid: 6 / 100% _1px;
  background: @p(#e6437d, #fff);
  scale: @r(.45, 1);
  border-radius: @p(0, 50%);
  transition: .5s;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const fixed = stage.doodle(code, { attrs: { seed: '2025' }, label: 'seed="2025"' });
  const loose = stage.doodle(code, { label: 'no seed', editor: false });
  if (stage.preview) stage.every(2400, () => loose.update());
  else if (stage.bar) {
    const bar = stage.bar;
    const shown = readout(bar);
    const report = (): void => shown(`seed of the left doodle: ${fixed.seed} / right: ${loose.seed}`);
    button(bar, 'update() both', () => {
      fixed.update();
      loose.update();
    });
    // The seed property writes the seed attribute, so a seed you liked comes back later.
    textInput(bar, 'doodle.seed =', '2025', (v) => {
      fixed.seed = v;
    });
    loose.addEventListener('render', report);
    report();
  }
  stage.say('The same seed always draws the same picture');
  return () => stage.dispose();
};

export default mount;
