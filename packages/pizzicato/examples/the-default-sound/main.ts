// An empty constructor makes a sine at 440 Hz: the A that orchestras tune to
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { box } from '../../shared/box.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, keys, noteName, smallText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.4 });
  const readout = bigText(stage.visual, 22);
  const caption = smallText(stage.visual);
  const piano = keys(box(stage.visual, ctx.preview ? 54 : 90), 57, 81);

  // The nearest piano note to a frequency, as "A4 · 440 Hz".
  const describe = (hz: number, on: boolean): void => {
    const midi = Math.round(69 + 12 * Math.log2(hz / 440));
    readout.textContent = `${noteName(midi)} · ${Math.round(hz)} Hz`;
    for (let m = 57; m <= 81; m++) piano.set(m, on && m === midi);
  };
  describe(440, false);
  caption.textContent = 'new Pizzicato.Sound()';

  return stage.run({
    build: () => new Pizzicato.Sound(),
    play: (s, at) => {
      s.play();
      stage.show(() => {
        describe(s.frequency ?? 440, true);
        caption.textContent = 'no options: a sine wave, 440 Hz';
      });
      at(1.6, () => {
        s.stop();
        stage.show(() => {
          describe(s.frequency ?? 440, false);
          caption.textContent = 'the A orchestras tune to';
        });
      });
    },
    controls: (s, bar) =>
      slider(bar, 'frequency', 220, 880, 1, 440, (v) => {
        s.frequency = v;
        describe(v, s.playing);
      }, (v) => `${v} Hz`),
  });
};

export default mount;
