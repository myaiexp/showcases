// A sine wave worked out by hand: a phase that advances a little each sample
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';
import { dial } from './dial.ts';

/** The dial runs this many times slower than the sound, so a turn is visible. */
const SLOWDOWN = 400;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.2 });
  const title = bigText(stage.visual, 15);
  const note = smallText(stage.visual);
  const picture = dial(stage.visual, ctx.preview ? 64 : 110);
  const tone = { frequency: 440 };
  let shown = tone.frequency;
  const describe = (f: number): void => {
    shown = f;
    title.textContent = `sin(phase) · ${f} Hz`;
    note.textContent = `+${((2 * Math.PI * f) / 44100).toFixed(3)} rad/sample · dial ÷${SLOWDOWN}`;
  };
  describe(tone.frequency);

  let phase = 0;
  let last = 0;
  return stage.run({
    build: () => {
      let running = 0; // radians: where on the circle the wave is now
      return new Pizzicato.Sound({
        source: 'script',
        options: {
          volume: 0.4,
          audioFunction: (e) => {
            const out = e.outputBuffer.getChannelData(0);
            const step = (2 * Math.PI * tone.frequency) / e.outputBuffer.sampleRate;
            for (let i = 0; i < out.length; i++) {
              out[i] = Math.sin(running);
              running += step;
            }
            running %= 2 * Math.PI;
          },
        },
      });
    },
    play: (sound, at) => {
      const f = tone.frequency;
      stage.show(() => describe(f));
      sound.play();
      at(1.8, () => sound.stop());
    },
    variants: [220, 440, 880].map((f) => ({ label: `${f} Hz`, apply: () => (tone.frequency = f) })),
    controls: (_s, bar) =>
      slider(bar, 'frequency', 110, 880, 1, tone.frequency, (v) => {
        tone.frequency = v;
        describe(v);
      }, (v) => `${v} Hz`),
    frame: (time) => {
      phase += time < last ? 0 : ((time - last) * 2 * Math.PI * shown) / SLOWDOWN;
      last = time;
      picture.draw(phase);
    },
  });
};

export default mount;
