// A sound computed sample by sample in your own function: white noise
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, smallText } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2 });
  bigText(stage.visual).textContent = 'output[i] = random';
  smallText(stage.visual, 'one random number per sample: hiss');

  return stage.run({
    build: () =>
      new Pizzicato.Sound({
        source: 'script',
        options: {
          audioFunction: (e) => {
            const output = e.outputBuffer.getChannelData(0);
            // Random values from -1 to 1: the README's Math.random() alone is never negative.
            for (let i = 0; i < e.outputBuffer.length; i++) output[i] = Math.random() * 2 - 1;
          },
          volume: 0.3,
        },
      }),
    play: (noise, at) => {
      noise.play();
      at(1.2, () => noise.stop());
    },
    controls: (noise, bar) => slider(bar, 'volume', 0, 1, 0.05, noise.volume, (v) => (noise.volume = v)),
  });
};

export default mount;
